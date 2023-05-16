import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';

const useUpdateIndividualEditing = () => {
	const [{ loading }, trigger] = useRequestAir(
		{
			url    : '/air-coe/document-copy/update',
			method : 'POST',
			// authKey : 'post_air_coe_documents_create_manifest',
		},
	);

	const updateIndividualEditing = async (payload) => {
		try {
			await trigger({
				data: payload,
			});
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
