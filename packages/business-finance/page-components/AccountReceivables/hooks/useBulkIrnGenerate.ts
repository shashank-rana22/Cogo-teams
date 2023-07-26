import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';

interface Props {
	getOrganizationInvoices?:Function,
	checkedRows?:string[],
	setCheckedRows?:Function,
	setIsHeaderChecked?:Function,
	entityCode?:string,
}

const useBulkIrnGenerate = (
	{ entityCode, getOrganizationInvoices, checkedRows, setCheckedRows, setIsHeaderChecked }:Props,
) => {
	const irnLabel = GLOBAL_CONSTANTS.cogoport_entities[entityCode].labels.irn_label;
	const [
		{ loading:bulkIrnLoading },
		bulkIrnTrigger,
	] = useRequestBf(
		{
			url     : '/sales/invoice/bulk-irn-generate',
			method  : 'post',
			authKey : 'post_sales_invoice_bulk_irn_generate',
		},
		{ manual: true },
	);

	const bulkIrnGenerate = async () => {
		try {
			const resp = await bulkIrnTrigger({
				data: {
					invoiceIds: checkedRows,
				},
			});
			if (resp.status === 200) {
				Toast.success(
					`Request sent! ${irnLabel} status awaited...`,
				);
				getOrganizationInvoices(); // refetching the list
				setCheckedRows([]);
				setIsHeaderChecked(false);
			}
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		bulkIrnGenerate,
		bulkIrnLoading,
	};
};

export default useBulkIrnGenerate;
