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
			console.log(err);
		}
	};

	return { data, listAirport, loading };
};

export default GetLocation;
