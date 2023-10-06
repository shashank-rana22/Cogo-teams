import { Toast } from '@cogoport/components';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useBulkIrnGenerate = (
	{ entityCode = '', getOrganizationInvoices, checkedRows, setCheckedRows, setIsHeaderChecked },
) => {
	const { user_profile: userProfile = {} } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const { user = {} } = userProfile;

	const { id: userId = '' } = user;

	const irnLabel = ENTITY_FEATURE_MAPPING[entityCode]?.labels?.irn_label;
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
