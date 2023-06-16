import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCreateSearch = () => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'post',
		url    : '/create_spot_search',
	}, { manual: true });

	const createSearch = async ({ action, values }) => {
		try {
			let payload = {};

			if (action === 'default') {
				const { default_payload, organisation_branch_id, organisation_id, service_type, user_id } = values;

				payload = {
					...default_payload,
					importer_exporter_branch_id : organisation_branch_id,
					importer_exporter_id        : organisation_id,
					source                      : 'platform',
					search_type                 : service_type,
					user_id,
				};
			}

			await trigger({ data: payload });

			Toast.success(data?.id);
		} catch (err) {
			if (err.response?.data) {
				Toast.error(getApiErrorString(err.response?.data));
			}
		}
	};

	return {
		createSearch,
		data,
		loading,
	};
};
export default useCreateSearch;
