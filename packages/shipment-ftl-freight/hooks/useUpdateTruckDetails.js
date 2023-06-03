import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useUpdateTruckDetails = ({ refetchServices = () => {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/bulk_update_shipment_services',
		method : 'POST',
	});

	const updateTruckDetails = async (val) => {
		try {
			const formatedValue = {
				service      : 'ftl_freight',
				service_data : val.service_data.map((element) => {
					let driver_details = {};
					if (element?.driver_name || element?.contact_number) {
						driver_details = {
							name    : element?.driver_name,
							contact : element?.contact_number,
						};
					}
					return {
						service_id : element?.service_id,
						data       : {
							truck_number        : element?.truck_number,
							estimated_arrival   : element?.estimated_arrival,
							estimated_departure : element?.estimated_departure,
							driver_details:
								Object.keys(driver_details)?.length > 0
									? driver_details
									: undefined,
						},
					};
				}),
			};

			await trigger({
				data: { ...formatedValue },
			});

			Toast.success('successfully updated');
			refetchServices();
		} catch (e) {
			toastApiError(e);
		}
	};

	return {
		loading,
		data: data || [],
		updateTruckDetails,
	};
};

export default useUpdateTruckDetails;
