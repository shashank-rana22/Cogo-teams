import { useRequestBf } from "@cogoport/request";
import OVERHEAD_APIS from "../../api";
import { Toast } from "@cogoport/components";

const useCreateVendor = () =>{

    const {apiMethod = '', apiUrl = '', apiAuthKey = ''} = OVERHEAD_APIS.CREATE_VENDORS

    const [{ data, loading = false, error },trigger] = useRequestBf(
        {
            url: apiUrl,
            method: apiMethod,
            authKey: apiAuthKey,
        },
        { autoCancel: false }
    );

    const createApi = async (filters) => {
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
        createApi,
        loading, 
        data
    }
}

export default useCreateVendor;