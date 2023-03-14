import React, { useState, useEffect } from 'react';
import useFormCogo from '@cogoport/front/hooks/useFormCogo';
import UpdateCargo from './UpdateCargo';
import fieldControls from './UpdateCargo/controls';
import useUpdatePendingTask from './hooks/useUpdatePendingTask';

function UpdateCargoAir({
	task,
	services,
	primary_service,
	onCancel,
	refetch,
	timeLineRefetch,
	shipment_data,
}) {
	let noOfStops1 = 0;
	const [disabledTrue, setDisabledTrue] = useState(false);
	const mainService = services.filter(
		(service) => service.service_type === 'air_freight_service',
	);
	const controls = fieldControls(
		primary_service,
		mainService,
		disabledTrue,
		noOfStops1,
	);

	const {
		fields,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
		setValues,
		clearErrors,
	} = useFormCogo(controls);

	noOfStops1 = watch('no_of_stops1');

	const { handleUpdate, loading } = useUpdatePendingTask({
		task,
		services,
		onCancel,
		refetch,
		timeLineRefetch,
		primary_service,
		shipment_data,
		noOfStops1,
	});

	if (noOfStops1 > 0) {
		fields.flight_number = {};
	}

	useEffect(() => {
		if (noOfStops1 > 0) {
			clearErrors('flight_number');
		}
	}, [noOfStops1]);

	if (noOfStops1 < 1) {
		fields.origin_airport_id = {};
		fields.destination_airport_id = {};
	}

	if (!disabledTrue) {
		fields.movement = {
			...fields.movement,
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
			fields={fields}
			errors={errors}
			noOfStops1={noOfStops1}
			handleSubmit={handleSubmit}
			watch={watch}
			controls={controls}
			setValue={setValue}
			setValues={setValues}
			primary_service={primary_service}
			disabledTrue={disabledTrue}
			setDisabledTrue={setDisabledTrue}
		/>
	);
}

export default UpdateCargoAir;
