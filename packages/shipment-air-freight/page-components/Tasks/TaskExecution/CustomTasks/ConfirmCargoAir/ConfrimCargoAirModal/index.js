/* eslint-disable react-hooks/exhaustive-deps */
import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useEffect } from 'react';

import fieldControls from './controls';
import styles from './styles.module.css';

const MIDDLE_KEYS1 = ['cargo_ready_date', 'airline', 'no_of_stops'];

const LOWER_KEYS = ['flight_departure', 'flight_arrival', 'flight_number'];
const ZERO_STOPS = 0;
const FOR_LOOP_INCREMENT_VALUE = 1;
function ConfirmCargoAirModal({
	task = {},
	handleUpdate = () => {},
	loading = false,
	primary_service = {},
	onCancel = () => {},
	services = {},
}) {
	const controls = fieldControls(primary_service, services);
	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
		clearErrors,
	} = useForm({ controls });

	const agent = watch('contact_with_agent');
	const noOfStops = Number(watch('no_of_stops'));

	const flightNumberControlIndex = controls.findIndex((ctrl) => ctrl.name === 'flight_number');
	if (noOfStops > ZERO_STOPS) {
		controls[flightNumberControlIndex] = {};
	} else {
		controls[flightNumberControlIndex].value = {
			...controls[flightNumberControlIndex],
		};
	}

	const STOP_CONTROLS = [];
	const MIDDLE_CONTROLS = [];
	const LOWER_CONTROLS = [];
	const RADIO_CONTROLS = [];

	controls.forEach((ctr) => {
		if (ctr.type === 'fieldArray' && ctr.name === 'movement') {
			STOP_CONTROLS.push(ctr);
		} else if (MIDDLE_KEYS1.includes(ctr.name)) {
			MIDDLE_CONTROLS.push(ctr);
		} else if (LOWER_KEYS.includes(ctr.name)) {
			LOWER_CONTROLS.push(ctr);
		} else if (ctr.type === 'radio') {
			RADIO_CONTROLS.push(ctr);
		}
	});

	const onSubmit = (data) => {
		handleUpdate(data);
	};

	useEffect(() => {
		if (noOfStops > ZERO_STOPS) {
			clearErrors('flight_number');
		}
	}, [noOfStops]);

	useEffect(() => {
		let newStopsValue = [];
		if (task.task === 'update_flight_details') {
			if (noOfStops === ZERO_STOPS) {
				newStopsValue = [];
			} else if (noOfStops) {
				for (let i = 0; i <= noOfStops; i += FOR_LOOP_INCREMENT_VALUE) {
					newStopsValue.push({
						from_airport_id:
							i === GLOBAL_CONSTANTS.zeroth_index
								? services?.[GLOBAL_CONSTANTS.zeroth_index]?.origin_airport_id
								|| primary_service?.origin_airport_id
								: '',
						schedule_departure:
							i === GLOBAL_CONSTANTS.zeroth_index
								? new Date(services?.[GLOBAL_CONSTANTS.zeroth_index]?.schedule_departure
								|| primary_service?.schedule_departure
								|| primary_service?.selected_schedule_departure)
								: '',
						schedule_arrival:
							i === noOfStops
								? new Date(services?.[GLOBAL_CONSTANTS.zeroth_index]?.schedule_arrival
								|| primary_service?.schedule_arrival
								|| primary_service?.selected_schedule_arrival)
								: '',
						to_airport_id:
							i === noOfStops
								? services?.[GLOBAL_CONSTANTS.zeroth_index]?.destination_airport_id
								|| primary_service?.destination_airport_id
								: '',
						flight_number_stop: '',
					});
				}
			}
		}
		setValue('movement', newStopsValue);
	}, noOfStops);

	const render = () => {
		if (agent === 'true') {
			return (
				<div>
					<div>
						<Layout
							fields={MIDDLE_CONTROLS}
							control={control}
							errors={errors}
						/>
					</div>
					<div>
						<div className={styles.heading_div}>Flight Details</div>
						<div>
							<Layout
								fields={LOWER_CONTROLS}
								control={control}
								errors={errors}
							/>
						</div>
					</div>
					<div>
						<div className={styles.layout_div}>
							<Layout
								fields={STOP_CONTROLS}
								control={control}
								errors={errors}
							/>
						</div>
					</div>
				</div>
			);
		}
		return null;
	};

	return (
		<div className={styles.container}>
			<div>
				{agent !== 'true' && (
					<div className={styles.upper_radio}>
						<div>
							<Layout
								fields={RADIO_CONTROLS}
								control={control}
								errors={errors}
							/>
						</div>
					</div>
				)}

				{render()}
				<div className={styles.button_div}>
					<div className={styles.div1}>
						<Button className="secondary md" onClick={() => onCancel()}>
							Cancel
						</Button>
					</div>
					{task?.task === 'update_flight_departure_and_flight_arrival' ? (
						<div className={styles.div_middle}>
							<Button className="secondary md">Edit</Button>
						</div>
					) : null}
					<div>
						<Button onClick={handleSubmit(onSubmit)}>
							{loading ? 'Submitting...' : 'Submit'}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ConfirmCargoAirModal;
