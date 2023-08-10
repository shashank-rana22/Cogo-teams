import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useCreateShipmentCreditNote = ({
	refetch = () => {},
	successMessage = 'Credit Note Created Successfully!!',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_credit_note',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			await trigger({ data: val });

			Toast.success(successMessage);

			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		loading,
	};
};
export default useCreateShipmentCreditNote;
