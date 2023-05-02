import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useListInvoiceWrapper = ({ registerationNumber = '' }) => {
	const [
		{ data, loading },
		trigger,
	] = useRequest(
		{
			url    : 'list_invoice_wrapper',
			method : 'GET',
		},
		{ manual: true, autoCancel: false },
	);

	const getInvoicesList = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						// jobNumber               : '144294',
						jobType                 : 'SHIPMENT',
						jobSource               : 'LOGISTICS',
						buyerRegistrationNumber : registerationNumber,
					},
				});
			} catch (err) {
				Toast.error(err?.message);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		getInvoicesList();
	}, [getInvoicesList]);

	return {
		data,
		loading,
	};
};

export default useListInvoiceWrapper;
