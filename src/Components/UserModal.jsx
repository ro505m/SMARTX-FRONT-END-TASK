import toast from "react-hot-toast";

export default function UserModal({
    setIsUpdateModalOpen,
    userData,
    updatePerson,
    createUser,
    setUserData,
    setFlage
    }) {
    function handleUserDataChange(e) {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (userData.id !== null) {
            try {
                await updatePerson(userData.id, userData);
                setFlage(prev => !prev);
                setIsUpdateModalOpen(false);
                toast.success("Person updated successfully");
            } catch (err) {
                console.error(err);
                toast.error("Failed to update person.");
            }
        } else {
            try {
                await createUser(userData);
                setFlage(prev => !prev);
                setIsUpdateModalOpen(false);
                toast.success("Person created successfully");
            } catch (err) {
                console.error(err);
                toast.error("Failed to create person.");
            }
        }
    }

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
                <h2 className="text-xl font-semibold text-white">
                    {userData ? "Edit User" : "Create New User"}
                </h2>
                <button 
                onClick={() => setIsUpdateModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            
            <form className="p-6 space-y-4"
                onSubmit={(e) => handleSubmit(e)}
                >
                <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                <input 
                    placeholder="e.g. John Doe"
                    type="text" 
                    value={userData.name}
                    name="name"
                    onChange={(e) => handleUserDataChange(e)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Status</label>
                    <select 
                    name="is_married"
                    value={userData.is_married}
                    onChange={(e) => handleUserDataChange(e)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                    >
                    <option value={"true"}>Married</option>
                    <option value={"false"}>Single</option>
                    </select>
                </div>

                <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Birth Date</label>
                <input 
                    type="date"
                    name="birth_date"
                    value={userData.birth_date}
                    onChange={(e) => handleUserDataChange(e)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
                </div>

                <div className="flex gap-3 mt-6">
                <button 
                    type="button"
                    onClick={() => setIsUpdateModalOpen(false)}
                    className="flex-1 cursor-pointer px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all font-medium"
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    className="flex-1 cursor-pointer px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all font-medium shadow-lg shadow-blue-500/20"
                >
                    Save Changes
                </button>
                </div>
            </form>
            </div>
        </div>
        )}