import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useRouter } from 'next/router';

const useUpdateEmployee = ({ handleModal = () => {}, getEmployeeDetails }) => {
	const { query } = useRouter();
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_employee_directory',
	}, { manual: true });

	const { profile } = useSelector((state) => state);

	let id_user = profile?.user?.id;

	if (!isEmpty(query?.employee_id)) {
		id_user = query.employee_id;
	}
	console.log('id:use', id_user, profile?.user?.id);

	const updateEmployeeDetails = async (payload) => {
		console.log(payload, 'payload-check');
		try {
			await trigger({
				data: { ...payload, user_id: id_user },
			});
			getEmployeeDetails();
			handleModal();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		updateEmployeeDetails,
	};
};

export default useUpdateEmployee;
