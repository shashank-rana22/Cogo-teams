import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useUpdateAccountTagging = ({ item = {} }) => {
	const [{ loading }, trigger] = useRequestBf({

		url     : 'payments/outstanding/update-account-taggings',
		method  : 'put',
		authKey : 'update_payments_outstanding_account_tagging',
	}, { manual: true });
	const apiTrigger = async (val, refetch) => {
		try {
			const resp = await trigger({
				data: {
					taggedState    : val,
					entityCode     : item?.entityCode,
					organizationId : item?.organizationId,
				},
			});
			Toast.success(resp?.data?.message || 'Updated Successfully');
			refetch();
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Update Failed');
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useUpdateAccountTagging;
