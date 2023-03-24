import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

interface Props {
	edit?: boolean | string;
	setGenerate?:Function;
	setEdit?:Function;
	activeCategory?: String;
	setHawbDetails?: Function;
}

const useCreateShipmentDocument = ({
	edit = false,
	setGenerate = () => {},
	setEdit = () => {},
	activeCategory = '',
	setHawbDetails = () => {},
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
				if (activeCategory === 'mawb') {
					setGenerate(false);
					setEdit(false);
				} else {
					setHawbDetails({ id: new Date().getTime(), isNew: true });
				}
			});
		} catch (error) {
			Toast.error(error?.response?.data?.message || error?.message || 'Failed to save Document');
		}
	};

	return {
		upload,
		loading,
	};
};

export default useCreateShipmentDocument;
