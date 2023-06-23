// import axios from "axios";
// import { useState, useEffect } from "react";

// const useListServiceLanes = () => {
//     const [data, setData] = useState(null);
//     const makeRequest = async () => {
//         const res = axios.get(
//             "http://10.10.15.174:8000/location/list_service_lanes?filters=%7B%7D&page_limit=10&page=1&pagination_data_required=true&sort_by=updated_at&sort_type=desc"
//         );
//         return res;
//     };

//     useEffect(() => {
//         makeRequest().then((res) => {
//             setData(res);
//         });
//     }, []);
//     return {
//         data: data?.data?.list,
//     };
// };

// export default useListServiceLanes;

import { useEffect } from "react";
import { useRequest } from "@cogoport/request";

const useListServiceLanes = ({ filter }) => {
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
                filter,
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
    }, [filter]);
    return {
        data: data?.list,
        loading,
    };
};
export default useListServiceLanes;
