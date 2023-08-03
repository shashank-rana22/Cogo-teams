import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useContext } from 'react';

import { getDate } from '../../../utils/getDate';
import controls from '../EditSchedule/controls';

export default function useEditServiceSchedule({
	setShow = () => {},
	timelineData = [],
	defaultEditable = false,
}) {
	const { servicesList, primary_service, refetch: shipmentRefetch = () => {} } = useContext(ShipmentDetailContext);

	const [departureDate, setDepartureDate] = useState(getDate(primary_service?.schedule_departure));

	const [{ loading }, updateShipmentService] = useRequest({
		url    : 'update_shipment_service',
		method : 'POST',
	}, { manual: true });

	const { finalControls, defaultValues } = controls({
		primary_service,
		departureDate,
		timelineData,
		defaultEditable,
	});

	const { handleSubmit: formSubmit, formState: { errors }, watch, reset, control } = useForm({ defaultValues });

	const formValues = watch();

	useEffect(() => {
		const { schedule_departure } = formValues || {};

		if (schedule_departure && schedule_departure?.toDateString() !== departureDate?.toDateString()) {
			setDepartureDate(schedule_departure);

			const NEW_DEFAULT_VALUES = {};

			finalControls.forEach(({ name }) => {
				NEW_DEFAULT_VALUES[name] = (name === 'schedule_arrival'
					? formValues?.[name] < schedule_departure
					: formValues?.[name] > schedule_departure)
					? null : formValues?.[name];
			});

			reset(NEW_DEFAULT_VALUES);
		}
	}, [formValues, departureDate, reset, finalControls]);

	const updateData = async (values) => {
		const mainServiceIds = (servicesList || [])
			?.filter((item) => item?.service_type === primary_service?.service_type)
			?.map((service) => service?.id);

		const payloadForUpdateShipment = {
			ids                 : mainServiceIds,
			performed_by_org_id : primary_service?.service_provider?.id,
			data                : ['vessel_arrived'].includes(primary_service?.state)
				? { schedule_arrival: values?.schedule_arrival }
				: { ...values },
			service_type: primary_service?.service_type,
		};

		try {
			await updateShipmentService({ data: payloadForUpdateShipment });

			Toast.success('Booking Note Updated Successfully !');
			setShow(false);
			shipmentRefetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		updateData,
		finalControls,
		formSubmit,
		errors,
		control,
	};
}
