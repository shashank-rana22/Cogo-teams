import { useEffect, useState } from "react";
import { useRequest } from "@cogoport/request";

const INITIAL_PAGE = 1;

const useListServiceLanes = ({ routeId }) => {
    const [page, setPage] = useState(INITIAL_PAGE);
    const [{ data, loading }, trigger] = useRequest(
        {
            url: "/list_service_lanes",
            method: "GET",
        },
        { manual: true }
    );

    const makeRequest = async () => {
        try {
            const payload = {
                filters: {
                    id: routeId,
                },
                page_limit: 10,
                page,
                pagination_data_required: true,
                sort_by: "updated_at",
                sort_type: "desc",
            };
            await trigger({
                params: payload,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        makeRequest();
    }, [routeId, page]);

    return {
        data: data?.list,
        loading,
        totalItems: data?.total_count,
        currentPage: page,
        setPage,
    };
};

export default useListServiceLanes;
