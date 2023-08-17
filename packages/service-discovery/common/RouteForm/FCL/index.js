import LocationControl from '../common/LocationControl';
import ToggleLocation from '../common/ToggleLocation';
import getControls from '../getControls';

import controls from './fcl-route-controls';
import styles from './styles.module.css';

function FCLRouteForm({ mode = '', setFormValues = () => {}, formValues = {} }) {
	const [originControls, destinationControls] = getControls(controls, mode);

	return (
		<div className={styles.container}>
			<LocationControl
				formValues={formValues}
				setFormValues={setFormValues}
				controlItem={originControls}
			/>

			<ToggleLocation
				setFormValues={setFormValues}
				formValues={formValues}
			/>

			<LocationControl
				formValues={formValues}
				setFormValues={setFormValues}
				controlItem={destinationControls}
			/>
		</div>
	);
}

export default FCLRouteForm;
