import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { isEmpty } from '@cogoport/utils';

import formatCreditNoteData from '../common/SalesInvoice/CreditNote/helpers/format-credit-note-data';

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
