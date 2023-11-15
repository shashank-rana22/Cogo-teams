import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateBankDetails = ({ handleModal = () => {}, getEmployeePaymentDetails }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_bank_account_details',
	}, { manual: true });

	const updateBankDetails = async ({ payload }) => {
		try {
			await trigger({
				data: { ...payload },
			});
			getEmployeePaymentDetails();
			handleModal();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		updateBankDetails,
	};
};

export default useUpdateBankDetails;
