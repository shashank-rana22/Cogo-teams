import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useCreateShipmentCreditNote = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_shipment_credit_note',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			const res = await trigger({ data: val });

			if (!res.hasError) {
				Toast.success('Credit Note Created Successfully!!');

				refetch();
			}
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
