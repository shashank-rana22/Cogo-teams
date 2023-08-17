import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useHarbourRequest } from '@cogoport/request';

const useCreateGroupDetails = ({ configurationName }) => {
	const router = useRouter();

	const [{ btnloading, data }, trigger] = useHarbourRequest({
		url    : 'create_employee_device_reimbursement_group',
		method : 'POST',
	}, { manual: true });

	const createConfigurationGroup = async () => {
		try {
			const payload = {
				name: configurationName,
			};

			const res = await trigger({
				data: payload,
			});

			const id = res?.data?.id;

			router.push(`/byod/admin-dashboard/configuration?id=${id}`);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		btnloading,
		data,
		createConfigurationGroup,
	};
};

export default useCreateGroupDetails;
