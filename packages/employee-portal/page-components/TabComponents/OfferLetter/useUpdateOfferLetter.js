import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateOfferLetter = ({ document_url, id, getEmployeeDetails }) => {
	const [{ loading = false }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_employee_offer_letter',
	}, { manual: true });

	const updateData = async ({ status }) => {
		try {
			await trigger({
				data: {
					id,
					document_url,
					status,

				},
			});
			getEmployeeDetails();
			Toast.success(`Offer Letter ${status} successfully`);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return { updateData, loading };
};

export default useUpdateOfferLetter;
