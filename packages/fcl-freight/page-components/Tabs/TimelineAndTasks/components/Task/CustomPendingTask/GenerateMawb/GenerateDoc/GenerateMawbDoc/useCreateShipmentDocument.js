import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components';

const useCreateShipmentDocument = ({
	completeTask = () => {},
	isAmended = false,
}) => {
	const {
		general: { scope },
	} = useSelector((state) => state);
	let api = 'create_shipment_document';
	if (isAmended) api = 'update_shipment_document';
	const { trigger, loading } = useRequest('post', false, scope)(`${api}`);

	const upload = async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			}).then(() => {
				toast.success('Document saved successfully');
			});
			completeTask();
		} catch (error) {
			toast.error(error);
		}
	};

	return {
		upload,
		loading,
	};
};

export default useCreateShipmentDocument;
