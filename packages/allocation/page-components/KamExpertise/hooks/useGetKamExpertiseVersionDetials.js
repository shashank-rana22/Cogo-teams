import { Toast } from '@cogoport/components';
import { useAllocationRequest } from '@cogoport/request';

const useGetKamExpertiseVersionDetials = () => {
	const params = {
		filters: {
			action_type    : 'choose_published_version',
			version_number : 1,
		},
	};

	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_version_configurations',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_version_configurations',
		params,
	}, { manual: true });

	const getVersion = async () => {
		try {
			const res = await trigger();

			if (!res.hasError) {
				Toast.success('Version Selected');
				console.log(res);
			}
		} catch (error) {
			Toast.error(error);
		}
	};

	console.log('data::', data);

	return {
		loading,
		getVersion,
	};
};

export default useGetKamExpertiseVersionDetials;
