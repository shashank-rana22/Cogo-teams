import { useEffect, useState } from 'react'
import { useRequestBf } from '@cogoport/request';
import { Toast } from '@cogoport/components';
import getFormattedData from '../utils/getFormattedData';
import { GenericObject } from '../../commons/Interfaces';

interface Params{
    query?: GenericObject
}

const useGetShipmentCostSheet = ({query}:Params) => {

    const{shipment_id,jobNumber,jobSource,jobType}=query||{}
    
    const [{ data:postTaxData , loading:postTaxLoading}, postTaxFetch] = useRequestBf(
            {
                url     : `/common/job/post-tax/profit`,
                method  : 'get',
                params:{ jobType,jobSource,jobNumber}
            },
            { manual: true },
        );
        const [{ data:preTaxData , loading:preTaxLoading}, preTaxFetch] = useRequestBf(
            {
                url     : `/common/job/pre-tax/profit`,
                method  : 'get',
                params:{ jobType,jobSource,jobNumber}
            },
            { manual: true },
        );
        const [{ data:sellData, loading:sellLoading}, sellTrigger] = useRequestBf(
            {
                url     : `/common/job/list-service-charges`,
                method  : 'get',
                params:{ jobType,jobSource,jobNumber,chargeType:'sell' }
            },
            { manual: true },
        );
        const [{ data:buyData, loading:buyLoading}, buyTrigger] = useRequestBf(
            {
                url     : `/common/job/list-service-charges`,
                method  : 'get',
                params:{ jobType,jobSource,jobNumber,chargeType:'buy' }
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
            postTaxFetch();
            preTaxFetch();
        }, [shipment_id]);
        const {formattedBuyData,sellQuotationData}=getFormattedData({sell_quotation:sellData,buy_quotation:buyData})

        return {
            selldata:sellQuotationData,
            buydata:formattedBuyData,
            sellData,
            buyData,
            apiloading:sellLoading||buyLoading,
            postTaxData,
            preTaxData,
            preTaxLoading,
            postTaxLoading,
        };
}

export default useGetShipmentCostSheet