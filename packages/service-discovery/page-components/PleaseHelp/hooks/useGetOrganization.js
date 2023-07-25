import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useGetOrganization = ({ importer_exporter_id }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_organization',
		params : { id: importer_exporter_id },
	}, { manual: !importer_exporter_id });

	const getOrganization = async () => {
		try {
			await trigger({ params: { id: importer_exporter_id } });
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		data,
		loading,
		getOrganization,
	};
};

export default useGetOrganization;
