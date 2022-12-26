import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';


const getShipmentQuotation = ({shipmentData = {}}) => {
	

    const[{ data:listQuotationData }, trigger] = useRequest('/get_shipment_quotation', {manual: true});


	const getQuotation=async (shipment_id)=>{
		try{
			await trigger({
			params:{
				shipment_id
			}
			})
		}catch(err){
			console.log(err)
		}
	}


	//const service_charges = getSellServiceCharges?.data?.service_charges || [];

	return {
		getQuotation
	};
};

export default getShipmentQuotation;