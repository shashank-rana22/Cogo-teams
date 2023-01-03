import getChoosenPrefrences from '../../utils/revenueDeskUtils/getChoosePreference';

import getExistingRates from './getExistingRates';
import getFlashRates from './getFlashRates';
import getPrefrencesUpdatedStats from './getPreferencesUpdatedStats';
import getSystemRates from './getSystemRates';
import useCreateFlashBookingRate from './useUpdateFlashStatus';
import useUpdateRatesPrefrences from './useUpdateRatePreferences';

const useListBookingOptions = ({
	currentShipmentData,
	setShow = () => {},
	existingRatePrefrences,
	setShowBookingOption = () => {},
	supplierPayload,
	refetch = () => {},
	service,
}) => {
	const { statsLoading, data } = getPrefrencesUpdatedStats({
		shipment_id: currentShipmentData?.id,
		service,
	});

	const { existingData, existingDataLoading } = getExistingRates({
		currentShipmentData,
		api     : '',
		choosen : data?.list?.length,
	});

	const CurrentRates = getFlashRates({
		api     : 'current',
		currentShipmentData,
		choosen : data?.list?.length,
		service,
	});
	const PreviousRates = getFlashRates({
		api     : 'previous',
		currentShipmentData,
		choosen : data?.list?.length,
		service,
	});

	const SystemRates = getSystemRates({
		shipment_data : currentShipmentData,
		choosen       : data?.list?.length,
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
		flashRatesPrefrences : supplierPayload,
		shipment_id          : currentShipmentData?.id,
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
