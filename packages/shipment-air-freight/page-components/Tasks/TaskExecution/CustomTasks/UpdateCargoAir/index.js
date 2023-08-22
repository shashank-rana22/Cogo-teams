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
	const [disabled, setDisabled] = useState(false);
	const mainService = services.filter(
		(service) => service.service_type === 'air_freight_service',
	);

	const controls = fieldControls(
		primary_service,
		mainService,
		disabled,
		noOfStops,
	);

	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
		clearErrors = () => {},
	} = useForm({ controls });

	noOfStops = Number(watch('no_of_stops'));

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

	if (!disabled) {
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
			noOfStops={noOfStops}
			handleSubmit={handleSubmit}
			watch={watch}
			controls={controls}
			setValue={setValue}
			primary_service={primary_service}
			setDisabled={setDisabled}
			control={control}
		/>
	);
}

export default UpdateCargoAir;
