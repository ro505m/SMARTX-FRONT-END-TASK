import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function UsersTable({
    filteredUsers,
    sortType,
    setSortType,
    deleteUser,
    setUserData,
    setIsUpdateModalOpen,
    openMenuId,
    setOpenMenuId,
    page,
    totalPage,
    setPage,
    searchName,
    setSearchName,
    age,
    handleAgeChange,
    date,
    handleDateChange,
    isMarried,
    setIsMarried,
    setFlage,
    setAge,
    setDate,
}) {
    
return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-8">
    <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-end">
        <div>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
            <p className="text-slate-400 text-sm">
            Monitor and filter user records
            </p>
        </div>

        <div className="flex items-center gap-4">
            <button
            onClick={() => {
                setUserData({
                id: null,
                name: "",
                birth_date: "",
                is_married: "",
                });
                setIsUpdateModalOpen(true);
            }}
            className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all shadow-lg shadow-blue-500/20 font-medium text-sm"
            >
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
                />
            </svg>
            Create User
            </button>

            <div className="text-sm font-medium bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700 shadow-sm">
            Total Results:{" "}
            <span className="text-blue-400 font-mono">
                {filteredUsers.length}
            </span>
            </div>
        </div>
        </div>

        <div className="relative rounded-2xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm shadow-xl pb-10">
        <Table className="w-full border-collapse">
            <TableHeader>
            <TableRow className="bg-slate-800/80 border-b border-slate-700">
                <TableHead className="py-4 text-slate-100 font-semibold text-center rounded-tl-2xl">
                Name
                </TableHead>
                <TableHead
                className="py-4 text-slate-100 font-semibold text-center cursor-pointer hover:bg-slate-700 transition-colors group"
                onClick={() =>
                    setSortType(sortType === "asc" ? "desc" : "asc")
                }
                >
                Age{" "}
                <span className="text-blue-400 ml-1 transition-transform inline-block group-hover:scale-125">
                    {sortType === "asc" ? "↑" : "↓"}
                </span>
                </TableHead>
                <TableHead className="py-4 text-slate-100 font-semibold text-center">
                Birth Date
                </TableHead>
                <TableHead className="py-4 text-slate-100 font-semibold text-center">
                Status
                </TableHead>
                <TableHead className="py-4 text-slate-100 font-semibold text-center">
                Avatar
                </TableHead>
                <TableHead className="py-4 text-slate-100 font-semibold text-center rounded-tr-2xl">
                Controls
                </TableHead>
            </TableRow>

            <TableRow className="bg-slate-900/40">
                <TableHead className="p-2">
                <input
                    type="text"
                    placeholder="Filter by name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="w-full text-white px-3 py-1.5 text-sm rounded-md bg-slate-950 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-center placeholder:text-slate-600"
                />
                </TableHead>

                <TableHead className="p-2">
                <div className="flex items-center gap-1">
                    <input
                    type="number"
                    placeholder="Min"
                    name="min_age"
                    value={age.min_age}
                    onChange={(e) => handleAgeChange(e)}
                    className="w-1/2 text-white px-2 py-1.5 text-sm rounded-md bg-slate-950 border border-slate-700 outline-none focus:border-blue-500 text-center"
                    />
                    <input
                    type="number"
                    placeholder="Max"
                    name="max_age"
                    value={age.max_age}
                    onChange={(e) => handleAgeChange(e)}
                    className="w-1/2 text-white px-2 py-1.5 text-sm rounded-md bg-slate-950 border border-slate-700 outline-none focus:border-blue-500 text-center"
                    />
                </div>
                </TableHead>

                <TableHead className="p-2">
                <div className="flex items-center gap-1">
                    <input
                    type="date"
                    name="start_date"
                    value={date.start_date}
                    onChange={(e) => handleDateChange(e)}
                    className="w-full px-1 py-1.5 text-[10px] rounded-md bg-slate-950 border border-slate-700 outline-none focus:border-blue-500 text-white uppercase"
                    />
                    <input
                    type="date"
                    name="end_date"
                    value={date.end_date}
                    onChange={(e) => handleDateChange(e)}
                    className="w-full px-1 py-1.5 text-[10px] rounded-md bg-slate-950 border border-slate-700 outline-none focus:border-blue-500 text-white uppercase"
                    />
                </div>
                </TableHead>

                <TableHead className="p-2">
                <select
                    value={isMarried}
                    onChange={(e) => setIsMarried(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm rounded-md bg-slate-950 border border-slate-700 outline-none focus:border-blue-500 appearance-none text-center cursor-pointer text-slate-300"
                >
                    <option value="">All Status</option>
                    <option value="true">Married</option>
                    <option value="false">Single</option>
                </select>
                </TableHead>

                <TableHead className="p-2"></TableHead>

                <TableHead className="p-2">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-center gap-2">
                    <button
                        className="p-1 px-2 text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors disabled:opacity-20"
                        onClick={() => page > 1 && setPage((p) => p - 1)}
                        disabled={page === 1}
                    >
                        {"<"}
                    </button>
                    <span className="text-[10px] font-mono text-slate-400">
                        {page} / {totalPage}
                    </span>
                    <button
                        className="p-1 px-2 text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors disabled:opacity-20"
                        onClick={() =>
                        page < totalPage && setPage((p) => p + 1)
                        }
                        disabled={page === totalPage}
                    >
                        {">"}
                    </button>
                    </div>
                    <button
                    onClick={() => {
                        setSearchName("");
                        setAge({ min_age: "", max_age: "" });
                        setDate({ start_date: "", end_date: "" });
                        setSortType("asc");
                        setFlage((prev) => !prev);
                        setIsMarried("");
                    }}
                    className="text-[9px] uppercase tracking-tighter font-bold py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-md hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                    Reset Filters
                    </button>
                </div>
                </TableHead>
            </TableRow>
            </TableHeader>

            <TableBody>
            {filteredUsers.length > 0 ? (
                filteredUsers.map((item, index) => (
                <TableRow
                    key={index}
                    className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all group"
                >
                    <TableCell className="py-4 text-center font-medium text-slate-200">
                    {item.name}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                    <span className="px-2 py-1 rounded bg-slate-800 text-slate-400 text-xs font-mono">
                        {item.age} Yrs
                    </span>
                    </TableCell>
                    <TableCell className="py-4 text-center text-slate-400 text-sm font-mono">
                    {item.birth_date}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                    <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.is_married ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-slate-700/50 text-slate-400 border border-slate-600/30"}`}
                    >
                        {item.is_married ? "Married" : "Single"}
                    </span>
                    </TableCell>
                    <TableCell className="py-4">
                    <div className="flex justify-center">
                        <img
                        src={item.photo}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-700 group-hover:ring-blue-500 transition-all duration-300 shadow-lg"
                        />
                    </div>
                    </TableCell>

                    <TableCell className="py-4 text-center">
                    <div className="relative inline-block text-left">
                        <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(
                            openMenuId === item.id ? null : item.id,
                            );
                        }}
                        className="text-slate-500 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-slate-800"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                        </svg>
                        </button>
                        {openMenuId === item.id && (
                        <>
                            <div
                            className="fixed inset-0 z-40"
                            onClick={() => setOpenMenuId(null)}
                            ></div>
                            <div className="absolute right-0 bottom-full mb-2 w-32 origin-bottom-right bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-md animate-in fade-in zoom-in duration-200">
                            <button
                                onClick={() => {
                                setUserData({
                                    id: item.id,
                                    name: item.name,
                                    birth_date: item.birth_date,
                                    is_married: item.is_married,
                                });
                                setIsUpdateModalOpen(true);
                                setOpenMenuId(null);
                                }}
                                className="flex items-center w-full px-4 py-2.5 text-xs text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 transition-colors border-b border-slate-800"
                            >
                                <svg
                                className="w-3.5 h-3.5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                                </svg>
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                deleteUser(item.id);
                                setOpenMenuId(null);
                                }}
                                className="flex items-center w-full px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                                <svg
                                className="w-3.5 h-3.5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                                </svg>
                                Delete
                            </button>
                            </div>
                        </>
                        )}
                    </div>
                    </TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={6} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-2">
                    <span className="text-slate-600 italic text-lg">
                        No matching records found
                    </span>
                    <button
                        onClick={() => setSearchName("")}
                        className="text-blue-400 text-sm hover:underline"
                    >
                        Clear search and try again
                    </button>
                    </div>
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        </div>
    </div>
    </div>
);
}
