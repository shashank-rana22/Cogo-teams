import useCreateFlashBookingRate from './useUpdateFlashStatus.js';
import getChoosenPrefrences from '../../utils/revenueDeskUtils/getChoosePreference.js';
import getPrefrencesUpdatedStats from './getPreferencesUpdatedStats';
import getExistingRates from './getExistingRates';
import getFlashRates from './getFlashRates';
import getSystemRates from './getSystemRates';
import useUpdateRatesPrefrences from './useUpdateRatePreferences';

const useListBookingOptions = ({
	currentShipmentData,
	setShow = () => {},
	existingRatePrefrences,
	setShowBookingOption = () => {},
	supplierPayload,
	refetch = () => {},
	shipment_type = 'fcl_freight',
	service,
}) => {
	const { statsLoading, data } = getPrefrencesUpdatedStats({
		shipment_id: currentShipmentData?.id,
		service,
	});
	
	const { existingData, existingDataLoading } = getExistingRates({
		currentShipmentData,
		api: '',
		statsLoading,
		choosen: data?.list?.length,
		shipment_type,
		service,
	});
	
	const CurrentRates = getFlashRates({
		api: 'current',
		currentShipmentData,
		statsLoading,
		shipment_type,
		choosen: data?.list?.length,
		service,
	});
	console.log(CurrentRates, 'rates');
	const PreviousRates = getFlashRates({
		api: 'previous',
		currentShipmentData,
		statsLoading,
		shipment_type,
		choosen: data?.list?.length,
		service,
	});
	 
	const SystemRates = getSystemRates({
		shipment_data: currentShipmentData,
		statsLoading,
		shipment_type,
		choosen: data?.list?.length,
		service,
	});

	const { handleFlashDirect, flashDirectLoading } = useCreateFlashBookingRate({
		data: currentShipmentData,
		setShowBookingOption,
		refetch,
	});

	const flashParams = {
		CurrentRates,
		PreviousRates,
		SystemRates,
	};

	const { upateTrigger, loading } = useUpdateRatesPrefrences({
		setShow,
		existingRatePrefrences,
		setShowBookingOption,
		flashRatesPrefrences: supplierPayload,
		shipment_id: currentShipmentData?.id,
		refetch,
		service,
	});

	const { bnSalvage, flash } = getChoosenPrefrences({ data: data?.list });

	return {
		bnSalvage,
		statsLoading,
		existingDataLoading,
		existingData,
		data,
		flashParams,
		flash,
		flashDirectLoading,
		loading,
		handleFlashDirect,
		upateTrigger,
	};
};
export default useListBookingOptions;