import { Select, InputNumber } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcATruck } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import LocationControl from '../../common/LocationControl';
import getControls from '../../getControls';
import locationControls from '../ftl-route-controls';
import TouchPoint from '../TouchPoint';

import controls from './controls';
import styles from './styles.module.css';

const CONTROLS_FIRST_INDEX = 1;

function ErrorMessage({ errors = {}, name = '' }) {
	if (!errors[name]) {
		return null;
	}

	return <span className={styles.error_message}>{errors[name]?.message || 'This is Required'}</span>;
}

function ReturnJourney({
	location = {},
	roundTouchPoints = [],
	setFtlFormData = () => {},
	errors = {},
	ftlFormData = {},
}) {
	const [haltData, setHaltData] = useState(ftlFormData?.haltTime || {});

	const [originControls, destinationControls] = getControls(locationControls, 'ftl_freight');

	const defaultValues = {
		origin      : location?.destination,
		destination : location?.origin,
	};

	useEffect(() => {
		if (isEmpty(haltData)) {
			return;
		}

		setFtlFormData((prev) => ({
			...prev,
			haltTime: haltData,
		}));
	}, [haltData, setFtlFormData]);

	return (
		<div className={styles.container}>
			<span className={styles.heading}>Return Journey</span>

			<div className={styles.flex}>
				<LocationControl
					formValues={defaultValues}
					controlItem={originControls}
					prefix={<IcATruck width={30} height={30} />}
					disabled
				/>

				<TouchPoint
					location={location}
					setFtlFormData={setFtlFormData}
					touchPoints={roundTouchPoints}
					type="round"
				/>

				<LocationControl
					formValues={defaultValues}
					controlItem={destinationControls}
					prefix={<IcATruck width={30} height={30} />}
					disabled
				/>

				<div>
					<span>Halt Time</span>

					<div className={styles.form}>
						<div className={styles.form_item}>
							<InputNumber
								{...controls[GLOBAL_CONSTANTS.zeroth_index]}
								value={haltData.halt_time_value}
								onChange={(val) => setHaltData((prev) => ({
									...prev,
									halt_time_value: val,
								}))}
							/>
							<ErrorMessage errors={errors} name={controls[GLOBAL_CONSTANTS.zeroth_index].name} />
						</div>

						<div className={styles.form_item}>
							<Select
								{...controls[CONTROLS_FIRST_INDEX]}
								value={haltData.halt_time_unit}
								onChange={(val) => setHaltData((prev) => ({
									...prev,
									halt_time_unit: val,
								}))}
							/>
							<ErrorMessage errors={errors} name={controls[CONTROLS_FIRST_INDEX].name} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ReturnJourney;
