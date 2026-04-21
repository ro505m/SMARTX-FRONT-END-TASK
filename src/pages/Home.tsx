import UserModal from "../Components/UserModal.jsx";
import { usePeople } from "../hooks/usePeople.js";
import { useState, } from "react";
import { columns } from "../Components/table/columns.js"
import { DataTable } from "../Components/table/data-table.js"
import {
    createPerson,
    updatePerson,
} from "../api/people.js";
import { person } from "../Components/table/columns.js";

export default function Home(){
    // STATES
    const [Flage, setFlage] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const [userData, setUserData] = useState<person>({
        id: -1,
        name: "",
        age: 0,
        birth_date: "",
        is_married: false,
        photo: "",
    });


    // CUSTOM HOOK FOR FETCHING USERS
    const { users, totalPage } = usePeople({page: page, setPage: setPage, filters: filters, refresh: Flage });



    const handleEdit = (personData: person) => {
        setUserData(personData.id === userData.id ? {
            id: -1,
            name: "",
            age: 0,
            birth_date: "",
            is_married: false,
            photo: "",
        } : personData);
        setOpenMenu(true);
    };


    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 p-8">
            <DataTable columns={columns(handleEdit, setFlage)} data={users} filters={filters} setFilters={setFilters} 
            config={{
                pagination: {
                enabled: true,
                page,
                totalPages: totalPage,
                setPage,
                },
            }}/>
            {openMenu &&
            <UserModal
                setIsUpdateModalOpen={setOpenMenu}
                userData={userData}
                setUserData={setUserData}
                updatePerson={updatePerson}
                createUser={createPerson}
                setFlage={setFlage}
            />
            }
        </div>
    )
}