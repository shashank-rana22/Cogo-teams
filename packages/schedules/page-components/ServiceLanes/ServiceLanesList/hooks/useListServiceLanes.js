import { useEffect } from "react";
import { useRequest } from "@cogoport/request";

const useListServiceLanes = ({ routeId }) => {
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
                page: 1,
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
    }, [routeId]);
    return {
        data: data?.list,
        loading,
    };
};

export default useListServiceLanes;
