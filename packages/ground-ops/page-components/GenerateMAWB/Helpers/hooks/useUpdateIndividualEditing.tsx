import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';

interface Props {
	setGenerate?:Function;
	setEdit?:Function;
}

const useUpdateIndividualEditing = ({
	setGenerate = () => {},
	setEdit = () => {},
}:Props) => {
	const [{ loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/document-copy',
			method  : 'PUT',
			authKey : 'get_air_coe_document_copy_update',
		},
	);

	const updateIndividualEditing = async (payload) => {
		try {
			await trigger({
				data: payload,
			});
			setGenerate(false);
			setEdit(false);
		} catch (err) {
			Toast.error(err?.message || 'Failed to Create');
		}
	};

	return {
		updateIndividualEditing,
		loading,
	};
};
export default useUpdateIndividualEditing;
