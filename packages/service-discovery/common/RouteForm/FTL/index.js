import { Toggle, Toast } from '@cogoport/components';
import { IcATruck } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import LocationControl from '../common/LocationControl';
import getControls from '../getControls';

import controls from './ftl-route-controls';
import ReturnJourney from './ReturnJourney';
import styles from './styles.module.css';
import TouchPoint from './TouchPoint';

function FTLRouteForm({
	mode = '',
	setFormValues = () => {},
	formValues = {},
	organization = {},
	ftlFormData = {},
	setFtlFormData = () => {},
	errors = {},
	...restProps
}) {
	const [error, setError] = useState(() => {
		if (!formValues?.origin || !formValues?.destination) {
			return true;
		}
		return false;
	});

	const [originControls, destinationControls] = getControls(controls, mode);

	const { typeOfJourney = '', touchPoints = {} } = ftlFormData || {};

	const { one_way:oneWayTouchPoints = [], round:roundTouchPoints = [] } = touchPoints || {};

	const handleToggle = async () => {
		if (error) {
			Toast.error('Please fill all required fields!');

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
		setError(() => {
			if (!formValues?.origin || !formValues?.destination) {
				return true;
			}
			return false;
		});
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
