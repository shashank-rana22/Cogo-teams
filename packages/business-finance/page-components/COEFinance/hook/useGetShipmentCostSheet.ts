import { useEffect } from 'react'
import { useRequestBf } from '@cogoport/request';
import { Toast } from '@cogoport/components';

interface Params{
    shipment_id?: string|string[]|undefined;
}

const useGetShipmentCostSheet = ({shipment_id}:Params) => {
        const [{ data,loading}, trigger] = useRequestBf(
            {
                url     : `/get_shipment_cost_sheet`,
                method  : 'get',
            },
            { manual: true },
        );
    
        const getdataFromApi = async () => {
            try {
                const res = await trigger({ params: { shipment_id } });
                if (res.status!==200) {
                    Toast.error('Something went wrong!');
                }
            } catch (err) {
                console.log(err);
            }
        };
    
        useEffect(() => {
                getdataFromApi();
        }, [shipment_id]);

        return { data,loading};
}

export default useGetShipmentCostSheet