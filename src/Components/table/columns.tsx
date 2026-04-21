import { ColumnDef } from "@tanstack/react-table"
import * as peopleApi from "@/api/people";
import toast from "react-hot-toast";

export type person = {
    id: number
    name: string
    birth_date: string
    age: number
    is_married: boolean
    photo: string
}

export const columns = (
    handleEdit: (person: person) => void , setFlage: (value: boolean | ((prevState: boolean) => boolean)) => void
): ColumnDef<person>[] => [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const name = row.getValue("name") as string;
            return (
            <span className="text-sm font-medium text-white text-center">
                {name}
            </span>
            );
        },
        meta: {
            filterType: "text",
        },
    },
    {
        accessorKey: "age",
        header: "Age",
        cell: ({ row }) => {
            const age = row.getValue("age") as number;
            return (
            <span className={`px-2 py-1 text-center rounded-full text-xs font-medium ${age < 30 ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {age}
            </span>
            );
        },
        meta: {
            filterType: "range-number",
        },
    },
    {
        accessorKey: "is_married",
        header: "Marital Status",
        cell: ({ row }) => {
            const isMarried = row.getValue("is_married") as boolean;
            return (
            <span className={`px-2 py-1 text-center rounded-full text-xs font-medium ${isMarried ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {isMarried ? 'Married' : 'Single'}
            </span>
            );
        },
        meta: {
            filterType: "boolean",
        },
    },
    {
        accessorKey: "birth_date",
        header: "Date",
        cell: ({ row }) => {
            const birthDate = row.getValue("birth_date") as string;
            const date = new Date(birthDate);
            return (
            <span className="text-sm text-center text-white">
                {date.toLocaleDateString()}
            </span>
            );
        },
        meta: {
            filterType: "range-date",
        },
    },
    {
        accessorKey: "photo",
        header: "Photo",
        cell: ({ row }) => {
            const photo = row.getValue("photo") as string;
            return (
            <img src={photo} alt="photo" 
            className="w-10 h-10 text-center rounded-full object-cover ring-2 ring-slate-700 group-hover:ring-blue-500 transition-all duration-300 shadow-lg"
            />
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const person = row.original;
            return (
            <div className="flex items-center gap-2">
                <button
                onClick={() => {
                    handleEdit(person);
                }}
                className="px-2 py-1 text-xs rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                Edit
                </button>

                <button
                onClick={async () => {
                    // const confirmDelete = window.confirm("Are you sure?");
                    // if (!confirmDelete) return;
                    try {
                        await peopleApi.deletePerson(person.id);
                        setFlage(prev => !prev);
                        toast.success("Person deleted successfully");
                    } catch (err) {
                        toast.error("Failed to delete person");
                    }
                }}
                className="px-2 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                >
                Delete
                </button>
            </div>
            );
        },
    },
]