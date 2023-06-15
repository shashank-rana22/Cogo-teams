import { useRequest } from "@cogoport/request";
import { useEffect } from "react";
import { useSelector, getState } from "@cogoport/store";

const useListSailingSchedulePortPairs = ({ filters, currentPage }) => {
    const { scope } = useSelector(({ general }) => ({ scope: general.scope }));
    const [{ data }, trigger] = useRequest(
        {
            method: "get",
            url: `/list_sailing_schedule_port_pairs`,
            scope,
        },
        { manual: true }
    );

    const getListSailingSchedulePortPairData = () => {
        return trigger({
            params: {
                filters:
                    filters?.origin_port && filters?.destination_port
                        ? {
                              origin_port_id: filters.origin_port,
                              destination_port_id: filters.destination_port,
                          }
                        : null,
                page: currentPage,
            },
        });
    };

    useEffect(() => {
        getListSailingSchedulePortPairData();
    }, [JSON.stringify(filters), currentPage]);

    return {
        data: data?.list,
        getListSailingSchedulePortPairData,
        totalCount: data?.total_count,
    };
};

export default useListSailingSchedulePortPairs;
