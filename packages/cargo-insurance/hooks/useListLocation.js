import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

const useListLocation = () => {
	const { query } = useRouter();
	const formValues = JSON.parse(query?.data);

	const { origin_point, destination_point } = formValues || {};

	const [{ loading, data }] = useRequest({
		method : 'get',
		url    : 'list_locations',
		params : {
			filters: {
				id: [origin_point, destination_point],
			},
			includes: {
				country                 : true,
				default_params_required : true,
			},
		},
	}, { manual: false });

	return { data: data?.list || [], loading };
};

export default useListLocation;
