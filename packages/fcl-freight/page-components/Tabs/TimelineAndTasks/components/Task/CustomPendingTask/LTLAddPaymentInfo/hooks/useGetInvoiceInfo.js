import { useRequest, useScope } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components/admin';
import { getApiErrorString } from '@cogoport/front/utils';
import { useEffect } from 'react';

const useGetInvoiceInfo = ({ shipment_data }) => {
	const { scope } = useScope();

	const { loading, data, trigger } = useRequest(
		'get',
		false,
		scope,
	)('/get_shipment_invoice_preference');

	const { id = '' } = shipment_data;

	const getInvoiceInfo = async () => {
		const payload = {
			shipment_id: id,
		};

		try {
			await trigger({ params: payload });
		} catch (error) {
			toast.error(getApiErrorString(error?.data));
		}
	};

	useEffect(() => {
		getInvoiceInfo();
	}, []);

	return { loading, data: data || {}, getInvoiceInfo };
};

export default useGetInvoiceInfo;
