import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';


const getShipmentQuotation = (shipment_id) => {
	
    const[{ data:listQuotationData, loading: loading }, trigger] = useRequest('/get_shipment_quotation', {manual: true});
	
	const getQuotation= async () => { 
	
		try{ 
			const res = await trigger({
			params:{
				shipment_id : shipment_id
			}
			})

		}catch(err){ 
			console.log(err)
		}
		return res;
	}

	useEffect(()=> { 
		getQuotation()
	}, [shipment_id])

	return {
		service_charges: listQuotationData?.service_charges, 
		loading
	};
};

export default getShipmentQuotation;