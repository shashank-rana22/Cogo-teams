import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const usePostBulkUpdateAccount = ({ setShowBulkPostModal = () => {}, refetch = () => {} }) => {
	const { id = '' } = useSelector((state) => state?.profile?.user);

	const [{ loading }, trigger] = useRequestBf({
		url     : '/payments/outstanding/bulk-update-account-taggings',
		method  : 'put',
		authKey : 'put_payments_outstanding_bulk_update_account_taggings',
	}, { manual: true });

	const onSubmit = async (formValues) => {
		try {
			await trigger({
				data: {
					url               : formValues?.bulk_update_excel?.finalUrl || undefined,
					performedByUserId : id || undefined,
				},
			});

			setShowBulkPostModal(false);

			refetch();

			Toast.success('Successfully Updated Account Tagging');
		} catch (err) {
			Toast.error(err?.response?.data?.message);
		}
	};

	return {
		onSubmit,
		loading,
	};
};

export default usePostBulkUpdateAccount;
