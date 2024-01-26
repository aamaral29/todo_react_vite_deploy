/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useQuery() {

    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);

}
