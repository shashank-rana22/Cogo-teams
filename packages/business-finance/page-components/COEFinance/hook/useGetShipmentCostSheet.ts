import { useEffect, useState } from 'react'
import { useRequestBf } from '@cogoport/request';
import { Toast } from '@cogoport/components';
import getFormattedData from '../utils/getFormattedData';

interface Params{
    shipment_id?: string|string[]|undefined;
}

const useGetShipmentCostSheet = ({shipment_id}:Params) => {
    const[loadingState,setLoadingState]=useState(true)
    const[selldata,setSelldata]=useState<any[]>([])
    const[buydata,setBuydata]=useState<any[]>([])
    const [{ data}, trigger] = useRequestBf(
            {
                url     : `/get_shipment_cost_sheet`,
                method  : 'get',
            },
            { manual: true },
        );

        // useEffect(()=>{
        //     const {formattedBuyData,sellQuotationData}=getFormattedData(data,setLoadingState )
        //    },[data])
    
        const getdataFromApi = async () => {
            try {
                const res = await trigger({ params: { shipment_id } });
                const {formattedBuyData,sellQuotationData}=getFormattedData(res.data )
                setSelldata(sellQuotationData);
                setBuydata(formattedBuyData);
                setLoadingState(false)
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

        return {data, selldata,buydata,apiloading:(loadingState)};
}

export default useGetShipmentCostSheet