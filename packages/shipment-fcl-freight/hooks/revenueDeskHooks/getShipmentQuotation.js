import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';


const getShipmentQuotation = ({shipmentData = {}}) => {
	

    const[{ data:listQuotationData }, trigger] = useRequest({url :'/get_shipment_quotation', params: {shipment_id: shipmentData.id}}, {manual: true});

	const getQuotation = async() => {
		try {
			await trigger({});
		} catch (err) {
        console.log(err);
		}
	};

	useEffect(() => {
		getQuotation();
	}, []);

	//const service_charges = getSellServiceCharges?.data?.service_charges || [];

	return {

		//service_charges,
		//loading: getSellServiceCharges?.loading,
	};
};

export default getShipmentQuotation;