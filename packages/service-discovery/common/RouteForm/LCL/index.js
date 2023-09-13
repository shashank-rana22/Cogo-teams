import { IcAShipAmber } from '@cogoport/icons-react';

import LocationControl from '../common/LocationControl';
import ToggleLocation from '../common/ToggleLocation';
import getControls from '../getControls';

import controls from './lcl-route-controls';
import styles from './styles.module.css';

function LCLRouteForm({ mode = '', setFormValues = () => {}, formValues = {} }) {
	const [originControls, destinationControls] = getControls(controls, mode);

	return (
		<div className={styles.container}>
			<LocationControl
				formValues={formValues}
				setFormValues={setFormValues}
				controlItem={originControls}
				prefix={<IcAShipAmber width={26} height={26} />}
			/>

			<ToggleLocation
				setFormValues={setFormValues}
				formValues={formValues}
			/>

			<LocationControl
				formValues={formValues}
				setFormValues={setFormValues}
				controlItem={destinationControls}
				prefix={<IcAShipAmber width={26} height={26} />}
			/>
		</div>
	);
}

export default LCLRouteForm;
