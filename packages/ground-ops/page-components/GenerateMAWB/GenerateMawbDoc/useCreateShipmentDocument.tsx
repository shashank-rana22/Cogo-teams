import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

interface Props {
	edit?: boolean;
	setGenerate?:any;
}

const useCreateShipmentDocument = ({
	edit = false,
	setGenerate = () => {},
}:Props) => {
	let api = 'create_shipment_document';
	if (edit) api = 'update_shipment_document';

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
				setGenerate(false);
			});
		} catch (error) {
			Toast.error('Failed to save Document');
		}
	};

	return {
		upload,
		loading,
	};
};

export default useCreateShipmentDocument;
