import { Toast } from '@cogoport/components';
import { getApiError } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import formatCreditNoteData from '../common/SalesInvoice/CreditNote/helpers/format-credit-note-data';

const EMPTY_LINE_ITEMS_LENGTH = 0;
const useCreateShipmentCreditNote = ({
	refetch = () => {},
	successMessage = 'Credit Note Created Successfully!!',
	servicesIDs = [],
	invoice = {},
	invoiceData = {},
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
			Toast.error(getApiError(err?.response?.data));
		}
	};

	const onCreate = async (data) => {
		const { submit_data, checkError } = formatCreditNoteData({
			data,
			servicesIDs,
			invoice,
			invoiceData,
		});

		if (submit_data?.line_items?.length === EMPTY_LINE_ITEMS_LENGTH) {
			Toast.error('Line Items is required');
		}
		let isError = false;
		Object.keys(checkError).forEach((key) => {
			checkError[key].forEach((t) => {
				if (!isEmpty(t)) {
					isError = true;
				}
			});
		});

		if (isError === false) {
			await apiTrigger(submit_data);
		}
	};

	return {
		onCreate,
		loading,
	};
};
export default useCreateShipmentCreditNote;
