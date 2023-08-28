import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useSyncShipmentInvoices = ({
	refetch = () => {},
	successMessage = 'Reload Successfully!',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/sync_shipment_invoices',
		method : 'POST',
	});

	const syncShipmentInvoices = async ({ payload }) => {
		try {
			const res = await trigger({ data: payload });

			Toast.success(successMessage);

			refetch();

			return res;
		} catch (err) {
			toastApiError(err);
			return err;
		}
	};

	return {
		loading, syncShipmentInvoices,
	};
};

export default useSyncShipmentInvoices;
