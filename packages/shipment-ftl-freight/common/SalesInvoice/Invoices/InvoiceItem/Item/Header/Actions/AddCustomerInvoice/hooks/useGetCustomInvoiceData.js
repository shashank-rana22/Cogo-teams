import { useRequest } from '@cogoport/request';

const useGetCustomInvoiceData = ({
	shipment_id = '',
	invoice_combination_id = '',
	shipper_registration_number = '',
}) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_shipment_fortigo_trip_detail',
		method : 'GET',
		params : {
			shipment_id,
			invoice_combination_id,
			shipper_registration_number,
		},
	});

	return {
		loading,
		data,
	};
};

export default useGetCustomInvoiceData;
