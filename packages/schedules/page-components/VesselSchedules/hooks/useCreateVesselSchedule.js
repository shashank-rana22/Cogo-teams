import { Toast } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import {
	asyncFieldsOperators, asyncFieldsLocations, asyncListServiceLanes, asyncListVessels,
}
	from '@cogoport/forms/utils/getAsyncFields';
import { useRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

import controls from '../CreateVesselSchedules/controls';

const useCreateVesselSchedules = ({
	makeRequest,
	watch,
	formValues,
	handleClose,
}) => {
	const [errors, setErrors] = useState({});
	const no_of_ports = watch('port_number');
	const createRefetch = () => {
		makeRequest();
	};
	const onError = (errs, e) => {
		e.preventDefault();
		setErrors({ ...errs });
	};
	const shippingLineOptions = useGetAsyncOptions(merge(
		asyncFieldsOperators(),
		{ params: { filters: { operator_type: 'shipping_line' } } },
	));
	const serviceLaneOptions = useGetAsyncOptions(
		asyncListServiceLanes(),
	);
	const vesselOptions = useGetAsyncOptions(
		asyncListVessels(),
	);
	const locationOptions = useGetAsyncOptions(merge(
		asyncFieldsLocations(),
		{ params: { filters: { type: 'seaport' } } },
	));
	const terminalOptions = useGetAsyncOptions(merge(
		asyncFieldsLocations(),
		{ params: { filters: { type: 'seaport_terminal' } } },
	));
	const fields = controls(
		no_of_ports,
		locationOptions,
		shippingLineOptions,
		terminalOptions,
		serviceLaneOptions,
		vesselOptions,
	);

	const [{ loading }, trigger] = useRequest({
		url    : '/create_vessel_schedule',
		method : 'POST',
	}, { manual: true });

	const createSchedule = async () => {
		try {
			const formattedFormValues = {
				chartered_operators : (formValues?.chartered_operators || []) || undefined,
				service_lane_id     : formValues?.service_lane_id || undefined,
				vessel_id           : formValues?.vessel_id || undefined,
				port_number         : formValues?.port_number,
				shipping_line_id    : formValues?.shipping_line_id,
				waypoint_locations  : formValues?.waypoint_locations.map((item) => ({
					terminal_id : item?.terminal_id || undefined,
					location_id : item?.location_id,
					eta         : item?.eta,
					etd         : item?.etd,
				})),
			};
			await trigger({ data: formattedFormValues });

			Toast.success('Successfully Created');
			createRefetch();
			handleClose();
		} catch (err) {
			Toast.error(err);
		}
	};
	return { loading, createSchedule, fields, onError, errors };
};
export default useCreateVesselSchedules;
