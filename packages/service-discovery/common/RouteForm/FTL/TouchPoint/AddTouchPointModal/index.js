import { Toast, Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import AsyncSelectController from '@cogoport/forms/page-components/Controlled/AsyncSelectController';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import CustomSelectOption from '../../../../CustomSelectOption';

import List from './List';
import styles from './styles.module.css';

const INCREMENT_VALUE_BY_ONE = 1;

const SUPPORTED_COUNTRY_IDS = GLOBAL_CONSTANTS.service_supported_countries.feature_supported_service.common
	.services.ftl_freight.default_country_ids;

const location_control = {
	name        : 'touch_point_location_id',
	type        : 'async-select',
	placeholder : 'Enter Location',
	asyncKey    : 'list_locations',
	initialCall : false,
	params      : {
		page_limit      : 20,
		recommendations : true,
		apply_sorting   : false,
		filters         : {
			status     : 'active',
			type       : ['pincode', 'seaport', 'airport', 'city'],
			country_id : SUPPORTED_COUNTRY_IDS,
		},
		includes: {
			city                    : true,
			country                 : true,
			default_params_required : true,
		},
	},
	isClearable : true,
	rules       : { required: 'Required' },
	renderLabel : (option) => <>{ CustomSelectOption({ data: option, key: 'locations' }) }</>,
};

function AddTouchPointModal({
	onClick = () => {},
	touchPointItems = [],
	setFtlFormData = () => {},
	typeOfJourney = '',
	location = {},
	type = 'one_way',
	show = false,
	setShow = () => {},
}) {
	const [value, setValue] = useState({
		id           : '',
		display_name : '',
		name         : '',
		trip_type    : typeOfJourney,
		error        : false,
	});

	const [touchPoints, setTouchPoints] = useState(touchPointItems);

	const handleObj = (_, obj = {}) => {
		const { display_name = '', name = '', id } = obj;

		if (id === location.origin?.id || id === location.destination?.id) {
			setValue((prev) => ({
				...prev,
				error: true,
			}));
			return;
		}

		setValue({
			id,
			display_name,
			name,
			trip_type : typeOfJourney,
			error     : false,
		});
	};

	const onSubmit = () => {
		if (value?.error) {
			return;
		}
		const currId = value?.id;

		for (let i = 0; i < touchPoints.length; i += INCREMENT_VALUE_BY_ONE) {
			if (touchPoints[i].id === currId) {
				Toast.error('Selected touch point already exists in route');
				return;
			}
		}

		setTouchPoints((previousState) => [...previousState, value]);
	};

	const onDeleteTouchPoint = (index) => {
		setTouchPoints([
			...touchPoints.slice(GLOBAL_CONSTANTS.zeroth_index, index),
			...touchPoints.slice(index + INCREMENT_VALUE_BY_ONE, touchPoints.length),
		]);
	};

	const {
		setValue: setLocationValue = () => {},
		formState:{ errors },
		handleSubmit,
		control,
	} = useForm();

	useEffect(() => {
		setLocationValue('touch_point_location_id', '');
		setValue({});
	}, [setLocationValue, touchPoints]);

	const handleSave = () => {
		setFtlFormData((prev) => ({
			...prev,
			touchPoints: { ...prev.touchPoints, [type]: touchPoints },
		}));
		onClick();
	};

	const onCancel = () => {
		setTouchPoints(touchPointItems);
		onClick();
	};

	return (
		<Modal
			show={show}
			onClose={() => setShow(false)}
		>
			<Modal.Header title="Add Touch Points" />

			<Modal.Body>
				<div className={styles.container}>
					<div className={styles.form} key={value.id}>
						<div className={styles.form_item}>
							<AsyncSelectController
								{...location_control}
								control={control}
								onChange={handleObj}
							/>

							{errors.touch_point_location_id ? (
								<div className={styles.error_message}>
									Location is required
								</div>
							) : null}

							{value?.error ? (
								<div className={styles.error_message}>
									Touchpoint must be diffrent from origin and destination!!
								</div>
							) : null}
						</div>

						<Button themeType="accent" onClick={handleSubmit(onSubmit)}>
							Add
						</Button>
					</div>

					<List
						touchPoints={touchPoints}
						onDeleteTouchPoint={onDeleteTouchPoint}
						setTouchPoints={setTouchPoints}
					/>

					<div className={styles.buttons_container}>
						<Button
							themeType="secondary"
							onClick={onCancel}
							style={{ marginRight: 12 }}
						>
							Cancel
						</Button>

						<Button
							themeType="accent"
							onClick={handleSave}
							disabled={isEmpty(touchPoints)}
						>
							Save
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default AddTouchPointModal;
