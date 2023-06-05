import useUpdateRatesPreferences from './useUpdateRatesPreferences';

const useListBookingOptions = ({}) => {
	const [sellRates, setSellRates] = useState({});

	const sellRateDetails = getSellRateDetailPayload({
		flashParams,
		service_providers: supplierPayload?.service_providers,
		sellRates,
	});

	const { updateTrigger, loading } = useUpdateRatesPreferences({
		supplierPayload,
		shipmentId: itemData?.id,
		existingRatePrefrences,
		itemData,
		remarks,
	});
};
