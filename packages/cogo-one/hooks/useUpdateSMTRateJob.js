import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const API_NAME = {
	fcl_freight : 'update_fcl_freight_rate_job',
	lcl_freight : 'update_lcl_freight_rate_job',
	lcl_customs : 'update_lcl_customs_rate_job',
	air_customs : 'update_air_customs_rate_job',
	trailer     : 'update_trailer_freight_rate_job',
	ltl_freight : 'update_ltl_freight_rate_job',
	air_freight : 'update_air_freight_rate_job',
	haulage     : 'update_haulage_freight_rate_job',
	fcl_customs : 'update_fcl_customs_rate_job',
	ftl_freight : 'update_ftl_freight_rate_job',
	fcl_cfs     : 'update_fcl_cfs_rate_job',
};

function useUpdateSMTRateJob({
	serviceType = '',
	setAssignData = () => {},
	fetchRateJobs = () => {},
}) {
	const [{ loading }, trigger] = useRequest({
		url    : `${API_NAME[serviceType]}`,
		method : 'post',
	}, { manual: true });

	const updateRateJob = async ({ assignUser = '', id = '' }) => {
		try {
			if (!API_NAME[serviceType]) {
				return;
			}

			await trigger({
				data: {
					user_id: assignUser,
					id,
				},
			});

			Toast.success('User update Successful');

			fetchRateJobs();

			setAssignData(() => ({
				assignUser : '',
				show       : false,
			}));
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		updateRateJob,
		loading,
	};
}

export default useUpdateSMTRateJob;
