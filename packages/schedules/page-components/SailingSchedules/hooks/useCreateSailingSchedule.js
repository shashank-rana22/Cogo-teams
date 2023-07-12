import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateVesselSchedules = ({
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_sailing_schedule',
		method : 'POST',
	}, { manual: true });

	const createSchedule = async (val) => {
		try {
			await trigger({ data: { ...val } });

			Toast.success('Successfully Created');
			refetch();
		} catch (err) {
			Toast.error(err);
		}
	};
	return { loading, createSchedule };
};
export default useCreateVesselSchedules;
