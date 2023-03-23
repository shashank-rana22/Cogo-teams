import { Toast } from '@cogoport/components';
import { useAllocationRequest } from '@cogoport/request';

const useGetKamExpertiseVersionDetials = () => {
	const params = {
		filters: {
			action_type    : 'choose_published_version',
			version_number : 1,
		},
	};

	const [{ loading }, trigger] = useAllocationRequest({
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
			}
		} catch (error) {
			Toast.error(error);
		}
	};

	return {
		loading,
		getVersion,
	};
};

export default useGetKamExpertiseVersionDetials;
