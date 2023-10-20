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
			console.log(err);
		}
	};

	return { data, listOrganization, loading };
};

export default GetOrganization;
