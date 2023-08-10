import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useState, useMemo } from 'react';

import { handleTruckServices, handleServiceIdForTruck } from '../utils/helperFunctions';
import { STEPS_MAPPINGS } from '../utils/stepsMappings';

import useBulkUpdate from './useBulkUpdate';
import useBulkUpdatePreference from './useBulkUpdatePreference';
import useEditQuote from './useEditQuote';
import useFtlFreightRateCards from './useFtlFreightRateCards';

const INIT_VALUE = 0;
const INCREAMENT_VALUE = 1;

const useStepsData = (propsData) => {
	const { services = [], shipment_data = {}, setStep = () => {} } = propsData || {};
	const [quotationHookData, setQuotationHookData] = useState([]);

	const {
		allTruckDetails,
		serviceProviderData,
		newRates,
		...rest
	} = useFtlFreightRateCards({ services, shipment_data });

	const { loading: bulkLoading, bulkUpdate, trigger: bulkTrigger } = useBulkUpdate();
	const { updateConfirmation } = useBulkUpdatePreference();

	const allTrucks = useMemo(() => handleTruckServices(allTruckDetails), [allTruckDetails]);

	const formatQuoteData = {
		...(propsData || {}),
		allTruckDetails,
		serviceProviderData,
		newServiceCharges : quotationHookData,
		shipmentData      : shipment_data,
	};

	const editQuoteData = useEditQuote(formatQuoteData);

	const handleNext = async () => {
		const totalTrucks = services.reduce((acc, item) => {
			if (item?.service_type !== 'subsidiary_service') {
				return acc + INCREAMENT_VALUE;
			}
			return acc;
		}, INIT_VALUE);

		if (allTrucks?.length !== totalTrucks) {
			Toast.error('Please select required number of trucks');
			return;
		}
		const newData = handleServiceIdForTruck(allTrucks, services);
		const SELECTED_PRIORITIES = {};

		newData.forEach((dataItem) => {
			const tempItem = dataItem;
			SELECTED_PRIORITIES[dataItem.service_id] = JSON.parse(
				JSON.stringify(dataItem),
			);
			delete tempItem.priority;
			delete tempItem.preference_id;
		});

		updateConfirmation({
			selectedPriorities : SELECTED_PRIORITIES,
			newRates,
			callback           : () => {
				setQuotationHookData(newData);
				setStep(STEPS_MAPPINGS.update_quotation.key);
			},
		});
	};

	const handleFinalSubmit = async () => {
		const { handleSubmit, onCreate } = editQuoteData;
		try {
			const payload = bulkUpdate(quotationHookData);
			await bulkTrigger({ data: payload });
			handleSubmit(onCreate)();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		quotationHookData,
		setQuotationHookData,
		allTruckDetails,
		allTrucks,
		handleNext,
		serviceProviderData,
		editQuoteData,
		handleFinalSubmit,
		bulkLoading,
		newRates,
		...rest,
	};
};

export default useStepsData;
