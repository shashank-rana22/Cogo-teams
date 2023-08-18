import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const TOAST_MESSAGE = {
	accept : 'Offer Letter accepted successfully',
	reject : 'Offer Letter rejected successfully',
};

const useUpdateOfferLetter = ({
	document_url = '',
	id = '',
	getEmployeeDetails = () => {},
	setInformationPage = () => {},
	setShowAcceptModal = () => {},
}) => {
	const [{ loading = false }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_employee_offer_letter',
	}, { manual: true });

	const updateData = async ({ status }) => {
		try {
			await trigger({
				data: {
					id,
					...((status !== 'accept') ? { document_url } : {}),
					status,

				},
			});

			getEmployeeDetails();
			Toast.success(TOAST_MESSAGE[status]);
			setInformationPage('');
			setShowAcceptModal(false);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
			getEmployeeDetails();
		}
	};

	return { updateData, loading };
};

export default useUpdateOfferLetter;
