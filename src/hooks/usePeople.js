import { useEffect, useState } from "react";
import { getPeople } from "../api/people";

export function usePeople({ page, setPage, filters, refresh }) {
    const [users, setUsers] = useState([]);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
        try {
            if (filters.name || filters.is_married || filters.age_min || filters.age_max || filters.birth_date_from || filters.birth_date_to)
            setTotalPage(1);

            const res = await getPeople({
            page,
            name: filters.name || undefined,
            is_married: filters.is_married || undefined,
            min_age: filters.age_min || undefined,
            max_age: filters.age_max || undefined,
            start_date: filters.birth_date_from || undefined,
            end_date: filters.birth_date_to || undefined,
            });
            setUsers(res.data.people);
            setTotalPage(res.data.total_pages);
            setPage(res.data.current_page);
        } catch (err) {
            console.error(err);
            setUsers([]);
            setTotalPage(1);
        }
        };

        fetchData();
    }, [page, setPage, filters, refresh]);

    return { users, totalPage };
}
