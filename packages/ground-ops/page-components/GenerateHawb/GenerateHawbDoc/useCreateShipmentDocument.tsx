import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateShipmentDocument = ({
	completeTask = () => {},
	isAmended = false,
}) => {
	let api = 'create_shipment_document';
	if (isAmended) api = 'update_shipment_document';

	const [{ loading }, trigger] = useRequest({
		url    : `${api}`,
		method : 'POST',
	});

	const upload = async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			}).then(() => {
				Toast.success('Document saved successfully');
			});
			completeTask();
		} catch (error) {
			Toast.error(error);
		}
	};

	return {
		upload,
		loading,
	};
};

export default useCreateShipmentDocument;
