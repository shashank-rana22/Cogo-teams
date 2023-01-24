import { useRequestBf } from "@cogoport/request";
import OVERHEAD_APIS from "../../api";
import { Toast } from "@cogoport/components";

const useListVendors = () =>{

    const {apiMethod = '', apiUrl = '', apiAuthKey = ''} = OVERHEAD_APIS.LIST_VENDORS

    const [{ data, loading = false, error },trigger] = useRequestBf(
        {
            url: apiUrl,
            method: apiMethod,
            authKey: apiAuthKey,
        },
        { autoCancel: false }
    );

    const listApi = async (filters) => {
        try {
            return await trigger({
                params: {
                    filters: filters,
                },
            });
        } catch (err) {
            // Toast.error(err);
        }
    };

    return {
        listApi,
        loading, 
        data
    }
}

export default useListVendors;