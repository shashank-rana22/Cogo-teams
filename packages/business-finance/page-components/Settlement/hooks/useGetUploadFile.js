import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useGetUploadFile = ({
	setShowUrlModal,
	refetch,
}) => {
	const { user_data:userData } = useSelector(({ profile }) => ({
		user_data: profile?.user || {},
	}));

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/payments/accounts/bulk-upload-payments',
			authKey : 'post_payments_accounts_ap_bulk_upload',
			method  : 'post',
		},
		{ manual: true },
	);

	const uploadFile = async (file) => {
		try {
			await trigger({
				data: {
					fileUrl    : file,
					uploadedBy : userData?.id,
				},
			});
			setShowUrlModal(true);
			Toast.success('File uploaded Successfully');
			refetch();
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		uploadFile,
		data,
		loading,
	};
};

export default useGetUploadFile;
