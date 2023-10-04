import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

interface Props {
	id?: string
}

const useInvoiceDetails = ({ id }: Props) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : `/sales/invoice/timeline/${id}`,
			method  : 'get',
			authKey : 'get_sales_invoice_timeline_by_id',
		},
		{ manual: true },
	);

	const getInvoiceDetailsApi = async () => {
		try {
			await trigger({});
		} catch (err) {
			Toast.error('INVOICE DETAILS DOES NOT EXIST');
		}
	};

	return {
		loading,
		data,
		getInvoiceDetailsApi,
	};
};
export default useInvoiceDetails;
