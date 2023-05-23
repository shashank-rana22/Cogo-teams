import dummyData from '../DummyData/list_shipment_services.json';

export default function useListShipmentServices() {
	const servicesLoading = false;
	const listServices = () => {};

	return {
		servicesLoading,
		refetchServices : listServices,
		servicesList    : dummyData?.list,
	};
}
