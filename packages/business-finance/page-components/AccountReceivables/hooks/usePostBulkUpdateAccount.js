import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function downloadFile(url, filename) {
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;

	link.click();
}

const usePostBulkUpdateAccount = ({ setShowBulkPostModal = () => {}, refetch = () => {} }) => {
	const { id = '' } = useSelector((state) => state?.profile?.user);

	const [{ data = {}, loading }, trigger] = useRequestBf({
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

			const { errorFile = '' } = data || {};

			downloadFile(errorFile, 'ErrorFile.xlsx');

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
