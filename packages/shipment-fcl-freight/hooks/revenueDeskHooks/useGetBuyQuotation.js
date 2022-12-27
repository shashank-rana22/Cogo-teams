import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';


const useGetBuyQuotation = (shipmentData) => {
	
	const allServices = [];
	const all_services = shipmentData?.services || [];
	all_services.forEach((service) => {
		allServices.push(...(shipmentData[`${service}s`] || []));
	});

	const allServiceIds = allServices.map((service) => service.id);

    const[{ data:listQuotationData, loading: loading }, trigger] =  

    useRequest('/get_shipment_services_quotation', {manual: true});

    console.log(shipmentData,'id');
    const getQuotation= async () => { 

            try{ 
                const res = await trigger({
                params:{
                    shipment_id : shipmentData?.id,
                    service_ids : allServiceIds
                }
                })
            }catch(err){ 
                console.log(err)
            }
            return res;
        }

        useEffect(()=> { 
            getQuotation()
        }, [shipmentData?.id])


	return {
		service_charges : listQuotationData?.service_charges,
		loading
	};
};
export default useGetBuyQuotation;
