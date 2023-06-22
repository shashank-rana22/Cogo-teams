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
				const { default_payload, organization_branch_id, organization_id, service_type, user_id } = values;

				payload = {
					...default_payload,
					importer_exporter_branch_id : organization_branch_id,
					importer_exporter_id        : organization_id,
					source                      : 'platform',
					search_type                 : service_type,
					user_id,
				};
			}

			const res = await trigger({ data: payload });

			return res?.data?.id;
		} catch (err) {
			if (err.response?.data) {
				Toast.error(getApiErrorString(err.response?.data));
			}

			return err;
		}
	};

	return {
		createSearch,
		data,
		loading,
	};
};
export default useCreateSearch;
