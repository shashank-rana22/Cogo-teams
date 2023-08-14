import { Toast } from '@cogoport/components';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

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
	const { user_profile: userProfile = {} } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const { user = {} } = userProfile;

	const { id: userId = '' } = user;

	const { irn_label:irnLabel } = ENTITY_FEATURE_MAPPING[entityCode].labels;
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
					invoiceIds : checkedRows,
					updatedBy  : userId,
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
