import React, { useEffect } from 'react';
import Button from '@cogoport/front/components/admin/Button';
import { IcMEdit as EditSvg } from '@cogoport/icons-react';
import {
	Container,
	Form,
	ButtonDiv,
	HeadingDiv,
	Div1,
	Div2,
	DivMiddle,
	LayoutDiv,
} from './styles';
import Layout from '../../../../../../commons/Layout';

const MIDDLE_KEYS2 = [
	'origin_airport_id',
	'destination_airport_id',
	'no_of_stops1',
];

const LOWER_KEYS = ['flight_departure', 'flight_arrival', 'flight_number'];

const UpdateCargo = ({
	task,
	fields,
	errors,
	handleSubmit,
	setValue,
	setValues,
	watch,
	handleUpdate,
	noOfStops1,
	loading,
	controls,
	onCancel,
	services,
	disabledTrue,
	setDisabledTrue,
}) => {
	const stopControl = [];
	const middleControls = [];
	const lowerControls = [];

	controls.forEach((control) => {
		if (control.type === 'fieldArray' && control.name === 'movement') {
			stopControl.push(control);
		} else if (MIDDLE_KEYS2.includes(control.name)) {
			middleControls.push(control);
		} else if (LOWER_KEYS.includes(control.name)) {
			lowerControls.push(control);
		}
	});

	const middleValues2 = {};
	MIDDLE_KEYS2.forEach((field) => {
		middleValues2[field] = fields[field];
	});

	const lowerValues = {};
	LOWER_KEYS.forEach((field) => {
		lowerValues[field] = fields[field];
	});

	const onSubmit = (data) => {
		handleUpdate(data);
	};

	useEffect(() => {
		const stopArrayValue = watch('movement');
		let newStopsValue = [];
		const stopDetail = {
			from_airport_id: '',
			to_airport_id: '',
			schedule_departure: '',
			schedule_arrival: '',
			flight_number_stop: '',
		};
		if (task.task === 'update_flight_departure_and_flight_arrival') {
			if (!noOfStops1) {
				newStopsValue = [];
			} else if (noOfStops1) {
				for (let i = 0; i <= noOfStops1; i += 1) {
					if (services?.[0]?.movement_details) {
						newStopsValue.push({
							...stopDetail,
							from_airport_id:
								services?.[0]?.movement_details[i]?.from_airport_id || null,
							schedule_departure:
								services?.[0]?.movement_details[i]?.schedule_departure || null,
							schedule_arrival:
								services?.[0]?.movement_details[i]?.schedule_arrival || null,
							to_airport_id:
								services?.[0]?.movement_details[i]?.to_airport_id || null,
							flight_number_stop:
								services?.[0]?.movement_details[i]?.flight_number || null,
						});
					} else {
						newStopsValue.push({
							...stopDetail,
						});
					}
				}
			} else {
				newStopsValue = stopArrayValue?.slice(0, noOfStops1 + 1);
			}
			setValue('movement', newStopsValue);
		}
	}, [JSON.stringify(noOfStops1)]);

	useEffect(() => {
		if (services?.[0]?.number_of_stops) {
			setValues({
				no_of_stops1: services?.[0]?.number_of_stops || 0,
			});
		} else {
			setValues({
				no_of_stops1: 0,
			});
		}
	}, []);

	const render = () => {
		if (task.task === 'update_flight_departure_and_flight_arrival') {
			return (
				<>
					<div>
						<Layout
							fields={middleValues2}
							controls={middleControls}
							errors={errors}
							themeType="admin"
						/>
					</div>
					<div>
						<HeadingDiv>Flight Details</HeadingDiv>
						<div>
							<Layout
								fields={lowerValues}
								controls={lowerControls}
								errors={errors}
								themeType="admin"
							/>
						</div>
					</div>
					<div>
						<LayoutDiv>
							<Layout
								fields={{ movement: fields.movement }}
								controls={stopControl}
								errors={errors}
								themeType="admin"
							/>
						</LayoutDiv>
					</div>
				</>
			);
		}
		return null;
	};

	return (
		<Container className={`${!disabledTrue && 'notDisabled'}`}>
			<Form>
				{render()}
				<ButtonDiv>
					<Div1>
						<Button className="secondary md" onClick={() => onCancel()}>
							Cancel
						</Button>
					</Div1>
					<DivMiddle>
						<Button
							className="secondary md"
							onClick={() => setDisabledTrue((prev) => !prev)}
						>
							<EditSvg style={{ marginRight: '8px' }} />
							Edit
						</Button>
					</DivMiddle>
					<Div2>
						<Button onClick={handleSubmit(onSubmit)}>
							{loading ? 'Submiting...' : 'Submit'}
						</Button>
					</Div2>
				</ButtonDiv>
			</Form>
		</Container>
	);
};

export default UpdateCargo;
