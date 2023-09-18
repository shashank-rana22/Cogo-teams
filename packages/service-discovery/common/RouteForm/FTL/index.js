import { IcATruck } from '@cogoport/icons-react';

import LocationControl from '../common/LocationControl';
import ToggleLocation from '../common/ToggleLocation';
import getControls from '../getControls';

import controls from './ftl-route-controls';
import styles from './styles.module.css';

function FTLRouteForm({
	mode = '',
	setFormValues = () => {},
	formValues = {},
	organization = {},
	// typeOfJourney = '',
	// setTypeOfJourney = () => {},
	...restProps
}) {
	const [originControls, destinationControls] = getControls(controls, mode);

	return (
		<div className={styles.container}>
			<LocationControl
				formValues={formValues}
				setFormValues={setFormValues}
				controlItem={originControls}
				prefix={<IcATruck width={26} height={26} />}
				service_type="ftl_freight"
				organization={organization}
				{...restProps}
			/>

			<ToggleLocation
				setFormValues={setFormValues}
				formValues={formValues}
			/>

			<LocationControl
				formValues={formValues}
				setFormValues={setFormValues}
				controlItem={destinationControls}
				prefix={<IcATruck width={26} height={26} />}
				service_type="ftl_freight"
				organization={organization}
				{...restProps}
			/>
		</div>
	);
}

export default FTLRouteForm;
