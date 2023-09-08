import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdateSageOrganizationIdMapping = ({ refetchList = () => {} }) => {
	const [{ loading }, trigger] = useRequest(
		{
			method : 'POST',
			url    : '/update_sage_organization_id_mapping',
		},
		{ manual: true },
	);

	const onSubmit = async ({ data = {} }) => {
		try {
			await trigger({ data });
			refetchList();
			Toast.success('Mapping deleted successfully!');
		} catch (err) {
			toastApiError(err);
		}
	};

	return { loading, onSubmit };
};
export default useUpdateSageOrganizationIdMapping;
