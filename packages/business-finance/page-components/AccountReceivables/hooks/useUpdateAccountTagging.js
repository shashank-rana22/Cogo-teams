import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateAccountTagging = ({ item = {} }) => {
	const { id = '' } = useSelector((state) => state?.profile?.user);

	const [{ loading }, trigger] = useRequestBf({
		url     : 'payments/outstanding/update-account-taggings',
		method  : 'put',
		authKey : 'put_payments_outstanding_update_account_taggings',
	}, { manual: true });

	const apiTrigger = async ({ formValues = {}, currentStatus: val, refetch, setChangeStatus = () => {} }) => {
		try {
			const resp = await trigger({
				data: {
					taggedState         : val,
					registrationNumber  : item?.registrationNumber || undefined,
					taggedPartnerUserId : formValues?.tagged_person || undefined,
					performedById       : id || undefined,
				},
			});

			setChangeStatus(false);

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
