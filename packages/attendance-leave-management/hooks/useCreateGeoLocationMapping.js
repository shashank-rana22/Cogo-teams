// import { Toast } from '@cogoport/components';
import { useHarbourRequest } from '@cogoport/request';

const useCreateGeoLocationMapping = () => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/create_geo_location_mapping',
	}, { manual: true });

	const createGeoLocationMapping = async () => {
		await trigger({
			data: {},
		});
	};

	return { loading, createGeoLocationMapping };
};

export default useCreateGeoLocationMapping;
