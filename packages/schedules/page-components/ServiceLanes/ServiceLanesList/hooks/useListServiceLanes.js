import axios from "axios";
import { useState, useEffect } from "react";

const useListServiceLanes = () => {
    const [data, setData] = useState(null);
    const makeRequest = async () => {
        const res = axios.get(
            "http://10.10.12.171:8000/location/list_service_lanes?filters=%7B%7D&page_limit=10&page=1&pagination_data_required=true&sort_by=updated_at&sort_type=desc"
        );
        return res;
    };

    useEffect(() => {
        makeRequest().then((res) => {
            setData(res);
        });
    }, []);
    return {
        data: data?.data?.list,
    };
};

export default useListServiceLanes;
