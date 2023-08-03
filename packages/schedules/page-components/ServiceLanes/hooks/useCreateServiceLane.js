import { Toast } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import {
	asyncFieldsOperators, asyncFieldsLocations,
}
	from '@cogoport/forms/utils/getAsyncFields';
import { useRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';

import controls from '../CreateServiceLane/controls';

const useCreateServiceLane = ({
	makeRequest,
	formValues,
	setShowModal,
	watch,
}) => {
	const no_of_ports = watch('port_number');

	const createRefetch = () => {
		makeRequest();
	};
	const shippingLineOptions = useGetAsyncOptions(merge(
		asyncFieldsOperators(),
		{ params: { filters: { operator_type: 'shipping_line' } } },
	));
	const locationOptions = useGetAsyncOptions(merge(
		asyncFieldsLocations(),
		{ params: { filters: { type: 'seaport' } } },
	));
	const fields = controls(no_of_ports, shippingLineOptions, locationOptions);
	const [{ loading }, trigger] = useRequest({
		url    : '/create_service_lane',
		method : 'POST',
	}, { manual: true });

	const createServiceLane = async () => {
		try {
			const formattedFormValues = {
				shipping_line_id   : formValues?.shipping_line_id,
				trade_lane         : formValues?.trade_lane,
				name               : formValues?.name || undefined,
				frequency          : formValues?.frequency,
				day_of_week        : formValues?.day_of_week || undefined,
				week_of_month      : formValues?.week_of_month || undefined,
				month_of_year      : formValues?.month_of_year || undefined,
				waypoint_locations : formValues?.waypoint_locations.map((item) => ({
					location_id   : item?.location_id,
					eta_day_count : item?.eta_day_count,
					etd_day_count : item?.etd_day_count,
					eta_day       : item?.eta_day || undefined,
					etd_day       : item?.etd_day || undefined,
				})),
			};
			await trigger({ data: formattedFormValues });

			Toast.success('Successfully Created');
			createRefetch();
		} catch (err) {
			Toast.error(err);
		}
		setShowModal(false);
	};
	return {
		loading,
		createServiceLane,
		fields,
	};
};
export default useCreateServiceLane;
