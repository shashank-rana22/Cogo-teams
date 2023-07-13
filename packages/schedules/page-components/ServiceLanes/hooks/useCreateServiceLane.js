import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateServiceLane = ({
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_service_lane',
		method : 'POST',
	}, { manual: true });

	const createServiceLane = async (val) => {
		try {
			await trigger({ data: { ...val } });

			Toast.success('Successfully Created');
			refetch();
		} catch (err) {
			Toast.error(err);
		}
	};
	return { loading, createServiceLane };
};
export default useCreateServiceLane;
