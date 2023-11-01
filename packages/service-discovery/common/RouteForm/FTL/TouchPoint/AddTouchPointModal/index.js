import { Toast, Button, Modal, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import AsyncSelectController from '@cogoport/forms/page-components/Controlled/AsyncSelectController';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useEffect } from 'react';

import CustomSelectOption from '../../../../CustomSelectOption';

import List from './List';
import styles from './styles.module.css';

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
	isMobile = false,
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

		for (let i = 0; i < touchPoints.length; i += GLOBAL_CONSTANTS.one) {
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
			...touchPoints.slice(index + GLOBAL_CONSTANTS.one, touchPoints.length),
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
			className={styles.modal}
			placement={isMobile ? 'bottom' : 'center'}
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
								<div className={cl`${styles.error_message} ${styles.default}`}>
									Touchpoint must be different from origin and destination
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
							className={styles.button}
						>
							Cancel
						</Button>

						<Button
							themeType="accent"
							onClick={handleSave}
							className={styles.button}
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
