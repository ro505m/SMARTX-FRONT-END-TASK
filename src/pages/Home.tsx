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
import { UserPlus } from 'lucide-react';

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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-gray-100">
                <div>
                        <h1 className="text-2xl font-bold text-gray-400 tracking-tight">
                            User Management
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage your users efficiently with our intuitive interface. 
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setUserData({
                                id: -1,
                                name: "",
                                age: 0,
                                birth_date: "",
                                is_married: false,
                                photo: "",
                            });
                            setOpenMenu(true);
                        }}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-lg text-sm font-semibold shadow-sm shadow-indigo-200 transition-all duration-200 group"
                    >
                        <UserPlus size={18} className="group-hover:rotate-12 transition-transform" />
                        <span>Create New User</span>
                    </button>
            </div>
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