import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useListInvoiceWrapper = ({ serial_id = '', registerationNumber = '', page = 1 }) => {
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
						jobNumber               : serial_id || undefined,
						jobType                 : 'SHIPMENT',
						jobSource               : 'LOGISTICS',
						buyerRegistrationNumber : registerationNumber || undefined,
						page,
						pageLimit               : 10,
					},
				});
			} catch (err) {
				Toast.error(err?.message);
			}
		})();
	}, [trigger, serial_id, registerationNumber, page]);

	useEffect(() => {
		getInvoicesList();
	}, [getInvoicesList]);

	return {
		data,
		loading,
	};
};

export default useListInvoiceWrapper;
