import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError';

const useUpdateBillsTicketId = ({ setShowTicketModal = () => {}, refetch = () => {}, itemData = {} }) => {
	const [{ loading }, trigger] = useRequestBf({
		url     : '/purchase/bills/ticket-id',
		method  : 'PUT',
		authKey : 'put_purchase_bills_ticket_id',
	}, { manual: true });

	const updateBillsTicketId = async (response) => {
		try {
			await trigger({
				data: {
					billId   : itemData?.billId,
					ticketId : response?.data?.ID,
				},
			});
			setShowTicketModal(false);
			refetch();
			Toast.success('Success');
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		updateBillsTicketId,
		loading,
	};
};
export default useUpdateBillsTicketId;
