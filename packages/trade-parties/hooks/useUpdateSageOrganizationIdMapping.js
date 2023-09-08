import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateSageOrganizationIdMapping = () => {
	const [{ loading }, trigger] = useRequest(
		{
			method : 'POST',
			url    : '/update_sage_organization_id_mapping',
		},
		{ manual: true },
	);

	const onSubmit = async (obj) => {
		try {
			await trigger({ data: obj });
			Toast.success('Mapping deleted successfully!');
		} catch (err) {
			Toast.error('Error occured');
		}
	};

	return { loading, onSubmit };
};
export default useUpdateSageOrganizationIdMapping;
