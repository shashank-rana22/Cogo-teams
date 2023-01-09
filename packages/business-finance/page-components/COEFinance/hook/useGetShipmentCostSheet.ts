import { useEffect, useState } from 'react'
import { useRequestBf } from '@cogoport/request';
import { Toast } from '@cogoport/components';
import getFormattedData from '../utils/getFormattedData';

interface Params{
    shipment_id?: string|string[]|undefined;
}

const useGetShipmentCostSheet = ({shipment_id}:Params) => {
    const [{ data:sellData, loading:sellLoading}, sellTrigger] = useRequestBf(
            {
                url     : `/common/job/list-service-charges`,
                method  : 'get',
                params:{ jobId:"Vw7m",chargeType:'sell' }
            },
            { manual: true },
        );
        const [{ data:buyData, loading:buyLoading}, buyTrigger] = useRequestBf(
            {
                url     : `/common/job/list-service-charges`,
                method  : 'get',
                params:{ jobId:"Vw7m",chargeType:'buy' }
            },
            { manual: true },
        );

        const getbuydataFromApi = async () => {
            try {
                const res = await sellTrigger();
                if (res.status!==200) {
                    Toast.error('Something went wrong!');
                }
            } catch (err) {
                console.log(err);
            }
        };

        const getselldataFromApi = async () => {
            try {
                const resp = await buyTrigger();
                if (resp.status!==200) {
                    Toast.error('Something went wrong!');
                }
            } catch (err) {
                console.log(err);
            }
        };
    
        useEffect(() => {
            getbuydataFromApi();
            getselldataFromApi();
        }, [shipment_id]);
        const {formattedBuyData,sellQuotationData}=getFormattedData({sell_quotation:sellData,buy_quotation:buyData})

        return {data:sellData, selldata:sellQuotationData,buydata:formattedBuyData,apiloading:(sellLoading||buyLoading)};
}

export default useGetShipmentCostSheet