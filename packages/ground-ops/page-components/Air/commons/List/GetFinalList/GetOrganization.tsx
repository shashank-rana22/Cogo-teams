import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const GetOrganization = ({ importerExporterIds }) => {
	const [{ data = {}, loading }, trigger] = useRequest('/list_organizations', { manual: true });

	const listOrganization = async () => {
		try {
			await trigger({
				params: {
					filters: {
						id: importerExporterIds,
					},

				},
			});
		} catch (err) {
			if (err?.message !== 'canceled') {
				Toast.error(err?.message || 'Something went wrong');
			}
		}
	};

	return { data, listOrganization, loading };
};

export default GetOrganization;
