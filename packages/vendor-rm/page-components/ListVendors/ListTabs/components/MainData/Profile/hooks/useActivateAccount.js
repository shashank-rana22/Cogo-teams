import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useActivateAccount({
	setShowModal = () => {}, refetchVendorInfo = () => {},
}) {
	const [{ loading = false }, trigger] = useRequest({
		url    : '/update_vendor_bank_detail_status',
		method : 'PUT',
	}, { manual: true });

	const handleActivation = async ({ showModal, accountStatus }) => {
		try {
			await trigger({
				data: {
					vendor_bank_detail_id : showModal,
					status                : accountStatus === 'active' ? 'inactive' : 'active',
				},
			});

			refetchVendorInfo();
			setShowModal('');

			Toast.success('Updated successfully');
		} catch (e) {
			Toast.error(getApiErrorString(e.response?.data) || 'Something went wrong!');
		}
	};

	return {
		accountLoading: loading,
		handleActivation,
	};
}

export default useActivateAccount;
