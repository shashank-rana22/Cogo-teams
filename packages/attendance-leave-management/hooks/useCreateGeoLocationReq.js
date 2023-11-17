import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useCreateGeoLocationReq = ({ getListGeoLocationReq = () => {} }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/create_geo_location_request',
	}, { manual: true });

	const createGeoLocationReq = async (values) => {
		try {
			await trigger({
				data: {
					...values,
				},
			});
			Toast.success('Details updated successfully');
			getListGeoLocationReq();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, createGeoLocationReq };
};

export default useCreateGeoLocationReq;
