import { useEffect, useState } from "react";
import { getPeople } from "../api/people";

export function usePeople({ page, searchName, isMarried, refresh }) {
    const [users, setUsers] = useState([]);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
        try {
            setUsers([]);
            setTotalPage(1);
            const res = await getPeople({
            page,
            name: searchName || undefined,
            is_married: isMarried || undefined,
            });
            setUsers(res.data.people);
            setTotalPage(res.data.total_pages);
        } catch (err) {
            console.error(err);
            setUsers([]);
        }
        };

        fetchData();
    }, [page, searchName, isMarried, refresh]);

    return { users, setUsers, totalPage, setTotalPage };
}