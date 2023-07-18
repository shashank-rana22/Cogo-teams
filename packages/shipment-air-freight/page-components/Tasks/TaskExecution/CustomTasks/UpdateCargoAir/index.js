import { useForm } from '@cogoport/forms';
import React, { useState, useEffect } from 'react';

import useUpdatePendingTask from './hooks/useUpdatePendingTask';
import UpdateCargo from './UpdateCargo';
import fieldControls from './UpdateCargo/controls';

const ZERO_STOPS = 0;
const ONE_STOP = 1;

function UpdateCargoAir({
	task = {},
	services = {},
	primary_service = {},
	onCancel = () => {},
	refetch = () => {},
	timeLineRefetch = () => {},
	shipment_data = {},
}) {
	let noOfStops = 0;
	const [disabledTrue, setDisabledTrue] = useState(false);
	const mainService = services.filter(
		(service) => service.service_type === 'air_freight_service',
	);

	const controls = fieldControls(
		primary_service,
		mainService,
		disabledTrue,
		noOfStops,
	);

	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
		setValues,
		clearErrors = () => {},
	} = useForm({ controls });

	noOfStops = Number(watch('no_of_stops1'));

	const { handleUpdate, loading } = useUpdatePendingTask({
		task,
		services,
		onCancel,
		refetch,
		timeLineRefetch,
		primary_service,
		shipment_data,
		noOfStops,
	});

	if (noOfStops > ZERO_STOPS) {
		const flightNumberControlIndex = controls.findIndex((ctrl) => ctrl.name === 'flight_number');
		controls[flightNumberControlIndex] = {};
	}

	useEffect(() => {
		if (noOfStops > ZERO_STOPS) {
			clearErrors('flight_number');
		}
	}, [clearErrors, noOfStops]);

	if (noOfStops < ONE_STOP) {
		const originAiportControlIndex = controls.findIndex((ctrl) => ctrl.name === 'origin_airport_id');
		controls[originAiportControlIndex] = {};
		const destinationAirportControlIndex = controls.findIndex((ctrl) => ctrl.name === 'destination_airport_id');
		controls[destinationAirportControlIndex] = {};
	}

	if (!disabledTrue) {
		const movementControl = controls.find((ctrl) => ctrl.name === 'movement');
		movementControl.value = {
			...movementControl.value,
			disabled: true,
		};
	}

	return (
		<UpdateCargo
			task={task}
			handleUpdate={handleUpdate}
			onCancel={onCancel}
			loading={loading}
			services={mainService}
			errors={errors}
			noOfStops1={noOfStops}
			handleSubmit={handleSubmit}
			watch={watch}
			controls={controls}
			setValue={setValue}
			setValues={setValues}
			primary_service={primary_service}
			disabledTrue={disabledTrue}
			setDisabledTrue={setDisabledTrue}
			control={control}
		/>
	);
}

export default UpdateCargoAir;
