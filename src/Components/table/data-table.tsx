import {
ColumnDef,
ColumnFiltersState,
flexRender,
getCoreRowModel,
useReactTable,
} from "@tanstack/react-table"

import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/Components/ui/table"
import { getFilteredRowModel } from "@tanstack/react-table";
import { useState } from "react";
import { TableConfig } from "./pagination.js";
import Pagination from "./pagination.js";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    filters: any
    setFilters: any
}



export function DataTable<TData, TValue>({
columns,
data,
filters,
setFilters,
config,
}: DataTableProps<TData, TValue> & { config?: TableConfig }) {
const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
    columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
})

const renderFilter = (column: any, filters: any, setFilters: any) => {
    const filterType = column.columnDef.meta?.filterType;
    const key = column.id;

    if (!filterType) return null;

    switch (filterType) {
        case "text":
        return (
            <input
            value={filters[key] || ""}
            onChange={(e) =>
                setFilters((prev: any) => ({
                ...prev,
                [key]: e.target.value,
                }))
            }
            placeholder="Search..."
            className="w-full px-2 py-1 text-xs border rounded text-white"
            />
        );

        case "boolean":
        return (
            <select
            value={filters[key] || ""}
            onChange={(e) =>
                setFilters((prev: any) => ({
                ...prev,
                [key]: e.target.value,
                }))
            }
            className="w-full cursor-pointer px-2 py-1 text-xs border rounded bg-gray-950 text-white"
            >
            <option value="" className="cursor-pointer">All</option>
            <option value="true" className="cursor-pointer">Married</option>
            <option value="false" className="cursor-pointer">Single</option>
            </select>
        );

        case "range-number":
        return (
            <div className="flex gap-1 justify-center">
            <input
                type="number"
                placeholder="Min"
                value={filters[`${key}_min`] || ""}
                onChange={(e) =>
                setFilters((prev: any) => ({
                    ...prev,
                    [`${key}_min`]: e.target.value,
                }))
                }
                className="w-14 px-1 text-xs border rounded text-white"
            />

            <input
                type="number"
                placeholder="Max"
                value={filters[`${key}_max`] || ""}
                onChange={(e) =>
                setFilters((prev: any) => ({
                    ...prev,
                    [`${key}_max`]: e.target.value,
                }))
                }
                className="w-14 px-1 text-xs border rounded text-white"
            />
            </div>
        );

        case "range-date":
        return (
            <div className="flex gap-1 justify-center text-white">
            <input
                type="date"
                value={filters[`${key}_from`] || ""}
                onChange={(e) =>
                setFilters((prev: any) => ({
                    ...prev,
                    [`${key}_from`]: e.target.value,
                }))
                }
                className="px-1 cursor-pointer text-xs border rounded text-white"
            />

            <input
                type="date"
                value={filters[`${key}_to`] || ""}
                onChange={(e) =>
                setFilters((prev: any) => ({
                    ...prev,
                    [`${key}_to`]: e.target.value,
                }))
                }
                className="px-1 cursor-pointer text-xs border rounded text-white"
            />
            </div>
        );

        default:
        return null;
    }
};

return (
    <div className="overflow-hidden rounded-md border">
    <Table>
        <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
                return (
                <TableHead key={header.id} className="text-white text-center">
                    {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                        )}
                </TableHead>
                )
            })}
            </TableRow>
        ))}
        <TableRow>
            {table.getAllColumns().map((column) => (
                <TableHead key={column.id} className="text-center">
                {renderFilter(column, filters, setFilters)}
                </TableHead>
            ))}
        </TableRow>
        </TableHeader>
        <TableBody>
        {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
            <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
            >
                {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="text-white text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
                ))}
            </TableRow>
            ))
        ) : (
            <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
            </TableCell>
            </TableRow>
        )}
        </TableBody>
    </Table>
    <Pagination config={config} />
    </div>
)
}