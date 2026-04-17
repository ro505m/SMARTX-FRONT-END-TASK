import UsersTable from "../Components/UsersTable.jsx";
import UserModal from "../Components/UserModal.jsx";
import { usePeople } from "../hooks/usePeople.js";
import { useEffect, useState, useMemo, useCallback } from "react";
import toast from "react-hot-toast";

import {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson
} from "../api/people";

export default function Home(){
    // STATES
    const [Flage, setFlage] = useState(false);
    const [isMarried, setIsMarried] = useState("");
    const [searchName, setSearchName] = useState("");
    const [page, setPage] = useState(1);

    // FILTER STATES
    const [date, setDate] = useState({
        start_date: "",
        end_date: ""
    });
    const [age, setAge] = useState({
        min_age: "",
        max_age: ""
    });
    const [userData, setUserData] = useState({
        id: null,
        name: "",
        birth_date: "",
        is_married: "",
    });

    // const [users, setUsers] = useState([]);
    const [sortType, setSortType] = useState("asc");
    const [openMenuId, setOpenMenuId] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    // CUSTOM HOOK FOR FETCHING USERS
    const { users, setUsers, totalPage, setTotalPage } = usePeople({ page, searchName, isMarried, refresh: Flage });

    // SORTING USERS
    const filteredUsers = useMemo(() => {
        let data = [...users];
        data.sort((a, b) => sortType === "asc" ? a.age - b.age : b.age - a.age);
        return data;
    }, [users, sortType]);

    // SEARCH FOR USERS
    const handleSearch = useCallback(async () => {
        setUsers([]);
        setTotalPage(1);
        try{
            const res = await getPeople({ name: searchName });
            setUsers(res.data.people);
            setTotalPage(res.data.total_pages);
        }catch(err){
            console.log(err);
            setUsers([]);
        }
    }, [searchName, setUsers, setTotalPage]);

    // AGE FILTER
    const handleAgeFilter = useCallback(async (min, max) => {
        setUsers([]);
        setTotalPage(1);
        try{
            const res = await getPeople({ min_age: min, max_age: max });
            setUsers(res.data.people);
            setTotalPage(res.data.total_pages);
        }catch(err){
            console.error(err);
            setUsers([]);
        }
    }, [setUsers, setTotalPage]);

    // DATE FILTER
    const handleDateFilter = useCallback(async (min, max) => {
        setUsers([]);
        setTotalPage(1);
        try{
            const res = await getPeople({ start_date: min, end_date: max });
            setUsers(res.data.people);
            setTotalPage(res.data.total_pages);
        }catch(err){
            console.error(err);
            setUsers([]);
        }
    }, [setUsers, setTotalPage]);

    // INPUT CHANGE HANDLERS
    function handleAgeChange(e){
        setAge({...age,[e.target.name]: e.target.value})
    }
    // INPUT CHANGE HANDLERS
    function handleDateChange(e){
        setDate({...date,[e.target.name]: e.target.value})
    }
    // USER DATA CHANGE HANDLER
    function handleUserDataChange(e){
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    // ENTER FILTER
    useEffect(() => {
        const handleKeyDown = (event) => {
            const minVal = Number(age.min_age);
            const maxVal = Number(age.max_age);
            if (event.key === 'Enter') {
                if (searchName.trim() !== "") 
                    handleSearch();
                if (!isNaN(minVal) || !isNaN(maxVal)) {
                    handleAgeFilter(minVal || 0, maxVal || 150);
                }
                if (date.start_date || date.end_date) {
                    handleDateFilter(date.start_date, date.end_date);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [searchName, age, date, handleSearch, handleAgeFilter, handleDateFilter]);

    // MARRIED FILTER
    useEffect(()=>{
        if (isMarried === "true" || isMarried === "false") {
            (async function(){
                setUsers([]);
                setTotalPage(1);
                try{
                    const res = await getPeople({ is_married: isMarried });
                    setUsers(res.data.people);
                    setTotalPage(res.data.total_pages);
                }catch(err){
                    console.error(err);
                    setUsers([]);
                }
            })()
        }
    },[isMarried, setUsers, setTotalPage]);

    // DELETE USER
    async function deleteUser(userId){
        try{
            await deletePerson(userId);
            setFlage(prev => !prev);
        }catch(err){
            console.error(err);
        }
    }

    // UPDATE USER
    async function editUser(userId){
        try{
            await updatePerson(userId, {
                name: userData.name?.trim() || "",
                birth_date: userData.birth_date || null,
                is_married: userData.is_married === "true" || userData.is_married === true,
            });

            toast.success("User updated successfully ✅");
            setIsUpdateModalOpen(false);
            setFlage(prev => !prev);

        }catch(err){
            console.error(err);
        }
    }

    //  CREATE USER
    async function createUser(){
        try{
            await createPerson({
                name: userData.name?.trim() || "",
                birth_date: userData.birth_date || null,
                is_married: userData.is_married === "true" || userData.is_married === true,
            });

            toast.success("User created successfully 🎉");
            setIsUpdateModalOpen(false);
            setFlage(prev => !prev);

        }catch(err){
            console.error(err);
        }
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 p-8">
            <UsersTable
                filteredUsers={filteredUsers}
                sortType={sortType}
                setSortType={setSortType}

                deleteUser={deleteUser}
                setUserData={setUserData}
                setIsUpdateModalOpen={setIsUpdateModalOpen}

                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}

                page={page}
                totalPage={totalPage}
                setPage={setPage}

                searchName={searchName}
                setSearchName={setSearchName}

                age={age}
                handleAgeChange={handleAgeChange}
                setAge={setAge}

                date={date}
                handleDateChange={handleDateChange}
                setDate={setDate}

                isMarried={isMarried}
                setIsMarried={setIsMarried}

                setFlage={setFlage}
            />
            {isUpdateModalOpen &&
            <UserModal
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                userData={userData}
                handleUserDataChange={handleUserDataChange}
                editUser={editUser}
                createUser={createUser}
            />}
        </div>
    )
}