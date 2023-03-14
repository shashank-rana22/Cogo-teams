import React, { useEffect } from 'react';
import useFormCogo from '@cogoport/front/hooks/useFormCogo';
import Button from '@cogoport/front/components/admin/Button';
import getField from '@cogo/business-modules/form/components';
import fieldControls from './controls.js';
import {
	Container,
	Form,
	ButtonDiv,
	HeadingDiv,
	Div1,
	Div2,
	DivMiddle,
	LayoutDiv,
	UpperRadio,
	RadioLabel,
} from './styles';
import Layout from '../../../../../../commons/Layout';

const TOP_KEYS = ['contact_with_agent'];
const MIDDLE_KEYS1 = ['cargo_ready_date', 'airline', 'no_of_stops1'];

const LOWER_KEYS = ['flight_departure', 'flight_arrival', 'flight_number'];

const ConfirmCargoAirModal = ({
	task,
	handleUpdate,
	loading,
	primary_service,
	onCancel,
	services,
}) => {
	const controls = fieldControls(primary_service, services);
	const {
		fields,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
		clearErrors,
	} = useFormCogo(controls);

	const agent = watch('contact_with_agent');
	const noOfStops1 = watch('no_of_stops1');

	if (noOfStops1 > 0) {
		fields.flight_number = {};
	} else {
		fields.flight_number = {
			...fields.flight_number,
		};
	}

	useEffect(() => {
		if (noOfStops1 > 0) {
			clearErrors('flight_number');
		}
	}, [noOfStops1]);

	const stopControl = [];
	const middleControls = [];
	const lowerControls = [];

	controls.forEach((control) => {
		if (control.type === 'fieldArray' && control.name === 'movement') {
			stopControl.push(control);
		} else if (MIDDLE_KEYS1.includes(control.name)) {
			middleControls.push(control);
		} else if (LOWER_KEYS.includes(control.name)) {
			lowerControls.push(control);
		}
	});

	const upperValues = {};
	TOP_KEYS.forEach((field) => {
		upperValues[field] = fields[field];
	});

	const middleValues1 = {};
	MIDDLE_KEYS1.forEach((field) => {
		middleValues1[field] = fields[field];
	});

	const lowerValues = {};
	LOWER_KEYS.forEach((field) => {
		lowerValues[field] = fields[field];
	});

	const onSubmit = (data) => {
		handleUpdate(data);
	};

	useEffect(() => {
		let newStopsValue = [];
		if (task.task === 'update_flight_details') {
			if (!noOfStops1) {
				newStopsValue = [];
			} else if (noOfStops1) {
				for (let i = 0; i <= noOfStops1; i += 1) {
					newStopsValue.push({
						from_airport_id:
							i === 0
								? services?.[0]?.origin_airport_id ||
								  primary_service?.origin_airport_id
								: '',
						schedule_departure:
							i === 0
								? services?.[0]?.schedule_departure ||
								  primary_service?.schedule_departure ||
								  primary_service?.selected_schedule_departure
								: '',
						schedule_arrival:
							i === noOfStops1
								? services?.[0]?.schedule_arrival ||
								  primary_service?.schedule_arrival ||
								  primary_service?.selected_schedule_arrival
								: '',
						to_airport_id:
							i === noOfStops1
								? services?.[0]?.destination_airport_id ||
								  primary_service?.destination_airport_id
								: '',
						flight_number_stop: '',
					});
				}
			}
		}
		setValue('movement', newStopsValue);
	}, [JSON.stringify(noOfStops1)]);

	const RadioGroup = getField('radio');

	const render = () => {
		if (agent === 'true') {
			return (
				<div>
					<div>
						<Layout
							fields={middleValues1}
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
				</div>
			);
		}
		return null;
	};

	return (
		<Container>
			<Form>
				<UpperRadio>
					<RadioLabel>Contact With Agent</RadioLabel>
					<div>
						<RadioGroup {...fields.contact_with_agent} />
					</div>
				</UpperRadio>
				{render()}
				<ButtonDiv>
					<Div1>
						<Button className="secondary md" onClick={() => onCancel()}>
							Cancel
						</Button>
					</Div1>
					{task?.task === 'update_flight_departure_and_flight_arrival' ? (
						<DivMiddle>
							<Button className="secondary md">Edit</Button>
						</DivMiddle>
					) : null}
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

export default ConfirmCargoAirModal;
