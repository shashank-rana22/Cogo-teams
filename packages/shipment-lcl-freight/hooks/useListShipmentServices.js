import dummyData from '../DummyData/list_shipment_services.json';

const useListShipmentServices = ({ defaultParams = {}, defaultFilters = {} }) => {
	const servicesLoading = false;
	const listServices = () => {};

	return {
		servicesLoading,
		refetchServices : listServices,
		servicesList    : dummyData?.list,
	};
};

export default useListShipmentServices;
