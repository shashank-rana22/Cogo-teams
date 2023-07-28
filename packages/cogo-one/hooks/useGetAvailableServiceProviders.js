import { useRequest } from '@cogoport/request';

const getParams = ({ serviceType = '', portDetails = {} }) => {
	const { originDetails = {}, destinationDetails = {} } = portDetails;

	return {
		service : serviceType,
		data    : {
			origin_location_id: [
				originDetails.id,
				originDetails.country_id,
				originDetails.trade_id,
			],
			destination_location_id: [
				destinationDetails.id,
				destinationDetails.country_id,
				destinationDetails.trade_id,
			],
		},
	};
};

const useGetAvailableServiceProviders = ({
	setListServiceProviders = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/get_available_service_providers',
		method : 'get',
	}, { manual: true });

	const getServiceProviders = async ({ values, portDetails = {} }) => {
		const { service_type: serviceType = '' } = values;
		try {
			const response = await trigger({
				params: getParams({ serviceType, portDetails }),
			});
			setListServiceProviders(response?.data?.ids);
		} catch (error) {
			console.error(error);
		}
	};

	return {
		serviceProvidersloading: loading,
		getServiceProviders,
	};
};
export default useGetAvailableServiceProviders;
