import { Toggle, Toast } from '@cogoport/components';
import { IcATruck } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import LocationControl from '../common/LocationControl';
import getControls from '../getControls';

import controls from './ftl-route-controls';
import ReturnJourney from './ReturnJourney';
import styles from './styles.module.css';
import TouchPoint from './TouchPoint';

const hasErrors = (formValues = {}) => {
	let errorMessage = '';

	if (isEmpty(formValues?.origin) || isEmpty(formValues?.destination)) {
		errorMessage = 'Please fill all required fields!';
	}

	if (formValues?.origin?.id === formValues?.destination?.id) {
		errorMessage = 'Origin and Destination cannot be same';
	}
	return errorMessage;
};

function FTLRouteForm({
	mode = '',
	setFormValues = () => {},
	formValues = {},
	organization = {},
	ftlFormData = {},
	setFtlFormData = () => {},
	errors = {},
	isMobile = false,
	...restProps
}) {
	const [error, setError] = useState(hasErrors(formValues));

	const [originControls, destinationControls] = getControls(controls, mode);

	const { typeOfJourney = 'one_way', touchPoints = {} } = ftlFormData || {};

	const { one_way:oneWayTouchPoints = [], round:roundTouchPoints = [] } = touchPoints || {};

	const handleToggle = async () => {
		if (error) {
			Toast.error(error);

			return;
		}

		setFtlFormData((prev) => ({
			...prev,
			touchPoints: { ...prev.touchPoints, round: oneWayTouchPoints },
		}));

		if (typeOfJourney === 'round') {
			setFtlFormData((prev) => ({
				...prev,
				touchPoints: { ...prev.touchPoints, round: [] },
			}));
		}

		setFtlFormData((prev) => {
			if (typeOfJourney === 'one_way') {
				return { ...prev, typeOfJourney: 'round' };
			}
			return { ...prev, typeOfJourney: 'one_way' };
		});
	};

	useEffect(() => {
		setError(hasErrors(formValues));
	}, [formValues]);

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<LocationControl
					{...restProps}
					formValues={formValues}
					setFormValues={setFormValues}
					controlItem={originControls}
					prefix={<IcATruck width={30} height={30} />}
					service_type="ftl_freight"
					organization={organization}
				/>

				<TouchPoint
					typeOfJourney={typeOfJourney}
					location={formValues}
					setFtlFormData={setFtlFormData}
					touchPoints={oneWayTouchPoints}
					type="one_way"
					isMobile={isMobile}
				/>

				<LocationControl
					{...restProps}
					formValues={formValues}
					setFormValues={setFormValues}
					controlItem={destinationControls}
					prefix={<IcATruck width={30} height={30} />}
					service_type="ftl_freight"
					organization={organization}
				/>

				<Toggle
					name="typeOfJourney"
					size="sm"
					onLabel="Round Trip"
					offLabel="One Way"
					checked={typeOfJourney === 'round'}
					onChange={handleToggle}
					className={styles.toggle}
				/>
			</div>

			{typeOfJourney === 'round' ? (
				<ReturnJourney
					location={formValues}
					errors={errors}
					ftlFormData={ftlFormData}
					setFtlFormData={setFtlFormData}
					roundTouchPoints={roundTouchPoints}
					typeOfJourney={typeOfJourney}
				/>
			) : null}
		</div>
	);
}

export default FTLRouteForm;
