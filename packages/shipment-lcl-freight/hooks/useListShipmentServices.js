import dummyData from '../DummyData/list_shipment_services.json';

export default function useListShipmentServices(){
	const servicesLoading = false;
	const listServices = () => {};

	return {
		servicesGet: {
			servicesLoading,
			refetchServices : listServices,
			servicesList    : dummyData?.list,
		},
	};

}