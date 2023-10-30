import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useUpdateInvoice({
	setRemarksModal = () => {},
	refetch = () => {},
	itemData = {},
}) {
	const { id = '' } = itemData || {};

	const [{ loading }, releaseTrigger] = useRequestBf(
		{
			url     : `/purchase/bills/${id}/release`,
			method  : 'put',
			authKey : 'put_purchase_bills_by_id_release',
		},
		{ manual: true },
	);
	const [{ loading: disputeLoading }, disputeTrigger] = useRequestBf(
		{
			url     : `/purchase/bills/${id}/dispute`,
			method  : 'put',
			authKey : 'put_purchase_bills_by_id_dispute',
		},
		{ manual: true },
	);

	const [{ loading: pushLoading }, pushTrigger] = useRequestBf(
		{
			url     : `/purchase/bills/${id}/reject`,
			method  : 'put',
			authKey : 'put_purchase_bills_by_id_reject',
		},
		{ manual: true },
	);

	const { query = {} } = useSelector((state) => state?.general);

	const { user_profile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));
	const user = user_profile?.user || {};
	const { organization_id: organizationId } = query || {};

	const updateInvoice = async (val = '', actionType = '') => {
		const params = {
			remarks         : val,
			organization_id : organizationId,
			performedByName : user?.name,
			performedBy     : user?.id,
			performedType   : user_profile?.session_type,
			action          : actionType,
		};

		try {
			if (actionType === 'RELEASE') {
				await releaseTrigger({
					data: { ...params },
				});
			} else if (actionType === 'DISPUTE') {
				await disputeTrigger({
					data: { ...params },
				});
			} else {
				await pushTrigger({
					data: { ...params },
				});
			}
			setRemarksModal(false);
			Toast.success('Successfully Updated');
			refetch();
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Oops, Something Went Wrong');
		}
	};

	return {
		remarksLoading: loading || disputeLoading || pushLoading,
		updateInvoice,
	};
}

export default useUpdateInvoice;
