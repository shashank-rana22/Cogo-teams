import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateVesselSchedules = ({
	refetch = () => {}, formValues,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_sailing_schedule',
		method : 'POST',
	}, { manual: true });

	const createSchedule = async () => {
		// try {
		await trigger({ data: formValues });

		Toast.success('Successfully Created');
		refetch();
		// } catch (err) {
		// 	Toast.error(err);
		// }
	};
	return { loading, createSchedule };
};
export default useCreateVesselSchedules;
