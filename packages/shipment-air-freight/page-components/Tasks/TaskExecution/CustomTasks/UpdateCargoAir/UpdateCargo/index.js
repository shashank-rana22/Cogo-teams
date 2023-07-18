import Layout from '@cogoport/air-modules/components/Layout';
import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMEdit as EditSvg } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

import styles from './styles.module.css';

const ZERO_STOPS = 1;
const INCREMENT_STOPS_BY_ONE = 1;

const MIDDLE_KEYS2 = [
	'origin_airport_id',
	'destination_airport_id',
	'no_of_stops1',
];

const LOWER_KEYS = ['flight_departure', 'flight_arrival', 'flight_number'];

function UpdateCargo({
	task = {},
	handleUpdate = () => {},
	onCancel = () => {},
	loading = false,
	services = [],
	errors = {},
	noOfStops1 = '',
	handleSubmit = () => {},
	watch = () => {},
	controls = {},
	setValue = () => {},
	setValues = () => {},
	disabledTrue = false,
	setDisabledTrue = () => {},
	control = {},
}) {
	const STOP_CONTROLS = [];
	const MIDDLE_CONTROLS = [];
	const LOWER_CONTROLS = [];

	controls.forEach((ctrl) => {
		if (ctrl.type === 'fieldArray' && ctrl.name === 'movement') {
			STOP_CONTROLS.push(ctrl);
		} else if (MIDDLE_KEYS2.includes(ctrl.name)) {
			MIDDLE_CONTROLS.push(ctrl);
		} else if (LOWER_KEYS.includes(ctrl.name)) {
			LOWER_CONTROLS.push(ctrl);
		}
	});

	const onSubmit = (data) => {
		handleUpdate(data);
	};

	useEffect(() => {
		const stopArrayValue = watch('movement');
		let newStopsValue = [];
		const STOP_DETAIL = {
			from_airport_id    : '',
			to_airport_id      : '',
			schedule_departure : null,
			schedule_arrival   : null,
			flight_number_stop : '',
		};
		if (task.task === 'update_flight_departure_and_flight_arrival') {
			if (!noOfStops1) {
				newStopsValue = [];
			} else if (noOfStops1) {
				for (let i = 0; i <= noOfStops1; i += INCREMENT_STOPS_BY_ONE) {
					if (services?.[GLOBAL_CONSTANTS.zeroth_index]?.movement_details) {
						newStopsValue.push({
							...STOP_DETAIL,
							from_airport_id:
								services?.[GLOBAL_CONSTANTS.zeroth_index]?.movement_details[i]?.from_airport_id
                                || null,
							schedule_departure:
								new Date(services?.[GLOBAL_CONSTANTS.zeroth_index]
									?.movement_details[i]?.schedule_departure || new Date()),
							schedule_arrival:
							new Date(services?.[GLOBAL_CONSTANTS.zeroth_index]?.movement_details[i]?.schedule_arrival
                                || new Date()),
							to_airport_id:
								services?.[GLOBAL_CONSTANTS.zeroth_index]?.movement_details[i]?.to_airport_id || null,
							flight_number_stop:
								services?.[GLOBAL_CONSTANTS.zeroth_index]?.movement_details[i]?.flight_number || null,
						});
					} else {
						newStopsValue.push({
							...STOP_DETAIL,
						});
					}
				}
			} else {
				newStopsValue = stopArrayValue?.slice(ZERO_STOPS, noOfStops1 + INCREMENT_STOPS_BY_ONE);
			}
			setValue('movement', newStopsValue);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [noOfStops1]);

	useEffect(() => {
		if (services?.[GLOBAL_CONSTANTS.zeroth_index]?.number_of_stops) {
			setValues({
				no_of_stops1: services?.[GLOBAL_CONSTANTS.zeroth_index]?.number_of_stops || ZERO_STOPS,
			});
		} else {
			setValues({
				no_of_stops1: 0,
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const render = () => {
		if (task.task === 'update_flight_departure_and_flight_arrival') {
			return (
				<>
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
				</>
			);
		}
		return null;
	};

	return (
		<div className={cl`${styles.container} ${!disabledTrue && 'notDisabled'}`}>
			<div>
				{render()}
				<div className={styles.button_div}>
					<div className={styles.div1}>
						<Button className="secondary md" onClick={() => onCancel()}>
							Cancel
						</Button>
					</div>
					<div className={styles.div_middle}>
						<Button
							className="secondary md"
							onClick={() => setDisabledTrue((prev) => !prev)}
						>
							<EditSvg style={{ marginRight: '8px' }} />
							Edit
						</Button>
					</div>
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

export default UpdateCargo;
