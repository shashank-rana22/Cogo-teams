import toastApiError from '@cogoport/air-modules/utils/toastApiError';

const createAwbInventory = async (
	formValues,
	airline_id,
	shipment_id,
	service_provider_id,
	createAwbInventoryTrigger,
	setResponseError,
) => {
	let responseAwbInventory = {};
	try {
		const res = await createAwbInventoryTrigger({
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
		responseAwbInventory = res;
		setResponseError(false);
	} catch (error) {
		responseAwbInventory = error?.response?.data;
		setResponseError(true);
		toastApiError(error);
	}
	return responseAwbInventory;
};
export default createAwbInventory;
