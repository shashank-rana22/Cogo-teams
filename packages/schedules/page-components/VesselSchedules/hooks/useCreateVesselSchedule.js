import { Toast } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import {
	asyncFieldsOperators, asyncFieldsLocations,
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
	const locationOptions = useGetAsyncOptions(merge(
		asyncFieldsLocations(),
		{ params: { filters: { type: 'seaport' } } },
	));
	const terminalOptions = useGetAsyncOptions(merge(
		asyncFieldsLocations(),
		{ params: { filters: { type: 'seaport_terminal' } } },
	));
	const fields = controls(no_of_ports, locationOptions, shippingLineOptions, terminalOptions);

	const [{ loading }, trigger] = useRequest({
		url    : '/create_vessel_schedule',
		method : 'POST',
	}, { manual: true });

	const createSchedule = async () => {
		const res = await trigger({ data: formValues });

		Toast.success('Successfully Created');
		// createRefetch();

		// } catch (err) {
		// 	Toast.error(err);

		// 	console.log(err, 'error');
		// }
	};
	return { loading, createSchedule, fields, onError, errors };
};
export default useCreateVesselSchedules;
