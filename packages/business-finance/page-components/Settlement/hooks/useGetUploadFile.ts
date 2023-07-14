import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface UploadInterface {
	setShowUrlModal?: React.Dispatch<React.SetStateAction<boolean>>
	toggleValue?: string
	refetch?: () => void
}
const useGetUploadFile = ({
	setShowUrlModal,
	toggleValue,
	refetch,
}:UploadInterface) => {
	const { user_data:userData } = useSelector(({ profile }:{ profile?:{ user?:{ name?:string, id?:string } } }) => ({
		user_data: profile?.user || {},
	}));

	const [{ data: arData, loading:arLoading }, triggerAr] = useRequestBf(
		{
			url     : '/sales/accounts/bulk-upload',
			authKey : 'get_sales_accounts_bulk_upload',
			method  : 'get',
		},
		{ manual: true },
	);

	const [{ data: apData, loading:apLoading }, triggerAp] = useRequestBf(
		{
			url     : '/payments/accounts/ap-bulk-upload',
			authKey : 'post_payments_accounts_ap_bulk_upload',
			method  : 'post',
		},
		{ manual: true },
	);

	const getApi = toggleValue === 'AP' ? triggerAp : triggerAr;

	const getFilters = (file) => {
		if (toggleValue === 'AP') {
			return {
				data: {
					fileUrl    : file,
					uploadedBy : userData?.id,
				},
			};
		}
		return {
			params: {
				fileUrl    : file,
				uploadedBy : userData?.name,
			},
		};
	};

	const uploadFile = async (file) => {
		try {
			await getApi(getFilters(file));
			setShowUrlModal(true);
			Toast.success('File uploaded Successfully');
			refetch();
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	};

	const apiData = toggleValue === 'AP' ? apData : arData;
	const apiLoading = toggleValue === 'AP' ? apLoading : arLoading;

	return {
		uploadFile,
		data    : apiData,
		loading : apiLoading,
	};
};

export default useGetUploadFile;
