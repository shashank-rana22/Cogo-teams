import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const GetLocation = ({ airportIds }) => {
	const [{ data = {}, loading }, trigger] = useRequest('/list_locations', { manual: true });

	const listAirport = async () => {
		try {
			await trigger({
				params: {
					filters: {
						id: airportIds,
					},

				},
			});
		} catch (err) {
			if (err?.message !== 'canceled') {
				Toast.error(err?.message || 'Something went wrong');
			}
		}
	};

	return { data, listAirport, loading };
};

export default GetLocation;
