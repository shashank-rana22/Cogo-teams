import { Toast } from '@cogoport/components';
import { useHarbourRequest } from '@cogoport/request';

const useCreateGeoLocationMapping = ({ refetch, onClose }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/create_geo_location_mapping',
	}, { manual: true });

	const createGeoLocationMapping = async (values) => {
		try {
			await trigger({
				data: {
					...values,
				},
			});
			refetch();
			onClose();
			Toast.success('Details updated successfully');
		} catch (error) {
			Toast.error('Something went wrong');
		}
	};

	return { loading, createGeoLocationMapping };
};

export default useCreateGeoLocationMapping;
