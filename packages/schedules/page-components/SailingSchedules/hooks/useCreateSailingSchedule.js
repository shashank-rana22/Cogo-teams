import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import {
	asyncFieldsOperators, asyncFieldsLocations,
}
	from '@cogoport/forms/utils/getAsyncFields';
import { useRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

import controls from '../CreateSailingSchedule/controls';

const useCreateVesselSchedules = ({
	refetch = () => {},
	setShowModal = () => {},
}) => {
	const [errors, setErrors] = useState({});
	const onError = (errs, e) => {
		e.preventDefault();
		setErrors({ ...errs });
	};
	const { handleSubmit, control, watch } = useForm();
	const formValues = watch();
	const fields = controls;

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
	const newField = fields.map((field) => {
		const { name } = field;
		let newControl = { ...field };
		if (name === 'shipping_line_id') {
			newControl = { ...newControl, ...shippingLineOptions };
		} else if (['origin_port_id', 'destination_port_id'].includes(name)) {
			newControl = { ...newControl, ...locationOptions };
		} else if (['origin_terminal_name', 'destination_terminal_name'].includes(name)) {
			newControl = { ...newControl, ...terminalOptions };
		}
		return { ...newControl };
	});
	const [{ loading }, trigger] = useRequest({
		url    : '/create_sailing_schedule',
		method : 'POST',
	}, { manual: true });

	const createSchedule = async () => {
		try {
			const formattedFormValues = {
				origin_port_id      : formValues?.origin_port_id,
				destination_port_id : formValues?.destination_port_id || undefined,
				shipping_line_id    : formValues?.shipping_line_id,
				number_of_stops     : formValues?.number_of_stops,
				departure           : formValues?.departure,
				arrival             : formValues?.arrival,
				source              : 'manual',
				schedule_data       : {
					transit_time              : formValues?.transit_time || undefined,
					vessel_name               : formValues?.vessel_name || undefined,
					imo_number                : formValues?.imo_number || undefined,
					voyage_number             : formValues?.voyage_number || undefined,
					service_name              : formValues?.service_name || undefined,
					terminal_cutoff           : formValues?.terminal_cutoff || undefined,
					bk_cutoff                 : formValues?.bk_cutoff || undefined,
					si_cutoff                 : formValues?.si_cutoff || undefined,
					vgm_cutoff                : formValues?.vgm_cutoff || undefined,
					reefer_cutoff             : formValues?.reefer_cutoff || undefined,
					haz_bk_cutoff             : formValues?.haz_bk_cutoff || undefined,
					origin_terminal_name      : formValues?.origin_terminal_name || undefined,
					destination_terminal_name : formValues?.destination_terminal_name || undefined,
				} || undefined,
			};
			await trigger({ data: formattedFormValues });

			Toast.success('Successfully Created');
			refetch();
		} catch (err) {
			Toast.error(err);
		}
		setShowModal(false);
	};
	return { loading, createSchedule, handleSubmit, newField, control, onError, errors };
};
export default useCreateVesselSchedules;
