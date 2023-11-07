import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const usePostBulkUpdateAccount = ({ setShowBulkPostModal = () => {}, refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequestBf({
		url     : '/payments/bulk-update-account-taggings',
		method  : 'post',
		authKey : 'bulk_update_account_taggings',
	}, { manual: true });

	const onSubmit = async (formValues) => {
		try {
			await trigger({ data: { url: formValues?.bulk_update_excel?.finalUrl } });

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
