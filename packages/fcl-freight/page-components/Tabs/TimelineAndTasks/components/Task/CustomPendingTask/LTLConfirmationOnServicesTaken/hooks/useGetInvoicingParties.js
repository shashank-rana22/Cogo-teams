import { useEffect } from 'react';
import { useRequest, useScope } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components/admin';
import getApiErrorString from '@cogoport/front/utils/functions/getApiErrorString';

const useGetInvoicingParties = ({ shipment_id }) => {
	const { scope } = useScope();
	const { loading, data, trigger } = useRequest(
		'get',
		false,
		scope,
	)('/get_shipment_invoice_preference');

	const getInvoicingParties = async () => {
		try {
			await trigger({ params: { shipment_id } });
		} catch (e) {
			toast.error(getApiErrorString(e?.data) || 'something went wrong!!');
		}
	};

	useEffect(() => {
		getInvoicingParties();
	}, [shipment_id]);

	return {
		loading,
		data,
		getInvoicingParties,
	};
};

export default useGetInvoicingParties;
