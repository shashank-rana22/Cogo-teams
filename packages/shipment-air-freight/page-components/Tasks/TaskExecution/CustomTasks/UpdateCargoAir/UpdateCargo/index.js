import Layout from '@cogoport/air-modules/components/Layout';
import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMEdit as EditSvg } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

import styles from './styles.module.css';

const ZERO_STOPS = 0;
const INCREMENT_STOPS_BY_ONE = 1;

const AIRPORT_KEYS = [
	'origin_airport_id',
	'destination_airport_id',
	'no_of_stops',
];

const FLIGHT_KEYS = ['flight_departure', 'flight_arrival', 'flight_number'];

function UpdateCargo({
	task = {},
	handleUpdate = () => {},
	onCancel = () => {},
	loading = false,
	services = [],
	errors = {},
	noOfStops = '',
	handleSubmit = () => {},
	watch = () => {},
	controls = {},
	setValue = () => {},
	disabled = false,
	setDisabled = () => {},
	control = {},
}) {
	const MOVEMENT_CONTROLS = [];
	const AIRPORT_CONTROLS = [];
	const FLIGHT_CONTROLS = [];

	controls.forEach((ctrl) => {
		if (ctrl.type === 'fieldArray' && ctrl.name === 'movement') {
			MOVEMENT_CONTROLS.push(ctrl);
		} else if (AIRPORT_KEYS.includes(ctrl.name)) {
			AIRPORT_CONTROLS.push(ctrl);
		} else if (FLIGHT_KEYS.includes(ctrl.name)) {
			FLIGHT_CONTROLS.push(ctrl);
		}
	});

	const onSubmit = (data) => {
		handleUpdate(data);
	};

	useEffect(() => {
		const movementDetails = watch('movement');
		let movementValue = [];
		const STOP_DETAIL = {
			from_airport_id    : '',
			to_airport_id      : '',
			schedule_departure : null,
			schedule_arrival   : null,
			flight_number_stop : '',
		};
		if (task.task === 'update_flight_departure_and_flight_arrival') {
			if (!noOfStops) {
				movementValue = [];
			} else if (noOfStops) {
				for (let i = 0; i <= noOfStops; i += INCREMENT_STOPS_BY_ONE) {
					if (services?.[GLOBAL_CONSTANTS.zeroth_index]?.movement_details) {
						movementValue.push({
							...STOP_DETAIL,
							from_airport_id:
								services?.[GLOBAL_CONSTANTS.zeroth_index]?.movement_details[i]?.from_airport_id
                                || undefined,
							schedule_departure:
								new Date(services?.[GLOBAL_CONSTANTS.zeroth_index]
									?.movement_details[i]?.schedule_departure || new Date()),
							schedule_arrival:
							new Date(services?.[GLOBAL_CONSTANTS.zeroth_index]?.movement_details[i]?.schedule_arrival
                                || new Date()),
							to_airport_id:
								services?.[GLOBAL_CONSTANTS.zeroth_index]?.movement_details[i]?.to_airport_id
								|| undefined,
							flight_number_stop:
								services?.[GLOBAL_CONSTANTS.zeroth_index]?.movement_details[i]?.flight_number
								|| undefined,
						});
					} else {
						movementValue.push({
							...STOP_DETAIL,
						});
					}
				}
			} else {
				movementValue = movementDetails?.slice(ZERO_STOPS, noOfStops + INCREMENT_STOPS_BY_ONE);
			}
			setValue('movement', movementValue);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [noOfStops]);

	useEffect(() => {
		if (services?.[GLOBAL_CONSTANTS.zeroth_index]?.number_of_stops) {
			setValue('no_of_stops', services?.[GLOBAL_CONSTANTS.zeroth_index]?.number_of_stops || ZERO_STOPS);
		} else {
			setValue('no_of_stops', ZERO_STOPS);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const render = () => {
		if (task.task === 'update_flight_departure_and_flight_arrival') {
			return (
				<>
					<div>
						<Layout
							fields={AIRPORT_CONTROLS}
							control={control}
							errors={errors}
						/>
					</div>
					<div>
						<div className={styles.heading}>Flight Details</div>
						<div>
							<Layout
								fields={FLIGHT_CONTROLS}
								control={control}
								errors={errors}
							/>
						</div>
					</div>
					<div>
						<div className={styles.layout_div}>
							<Layout
								fields={MOVEMENT_CONTROLS}
								control={control}
								errors={errors}
							/>
						</div>
					</div>
				</>
			);
		}
		return null;
	};

	return (
		<div className={cl`${styles.container} ${!disabled && 'notDisabled'}`}>
			<div>
				{render()}
				<div className={styles.button}>
					<div style={{ margin: '0 10px 0 0' }}>
						<Button className="secondary md" onClick={() => onCancel()}>
							Cancel
						</Button>
					</div>
					<div style={{ margin: '0 16px 0 10px' }}>
						<Button
							className="secondary md"
							onClick={() => setDisabled((prev) => !prev)}
						>
							<EditSvg style={{ marginRight: '8px' }} />
							Edit
						</Button>
					</div>
					<div>
						<Button onClick={handleSubmit(onSubmit)} disabled={loading}>
							{loading ? 'Submitting...' : 'Submit'}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UpdateCargo;
