import toastApiError from '@cogoport/air-modules/utils/toastApiError';

const createAwbInventory = async (
	formValues,
	airline_id,
	shipment_id,
	service_provider_id,
	createAwbInventoryTrigger,
) => {
	let hasError = false;
	try {
		await createAwbInventoryTrigger({
			params: {
				shipment_id,
				first_awb_number      : formValues?.booking_reference_number,
				number_of_awb_alloted : 1,
				service_provider_id,
				airline_id,
				status                : 'used',
				procured_date         : new Date(),
			},
		});
	} catch (error) {
		hasError = true;
		toastApiError(error);
	}
	return hasError;
};
export default createAwbInventory;
