import { IcATruck } from '@cogoport/icons-react';

import LocationControl from '../common/LocationControl';
import ToggleLocation from '../common/ToggleLocation';
import getControls from '../getControls';

import controls from './ltl-route-controls';
import styles from './styles.module.css';

function LTLRouteForm({ mode = '', setFormValues = () => {}, formValues = {}, organization = {}, ...rest }) {
	const [originControls, destinationControls] = getControls(controls, mode);

	return (
		<div className={styles.container}>
			<LocationControl
				{...rest}
				formValues={formValues}
				setFormValues={setFormValues}
				controlItem={originControls}
				service_type="ltl_freight"
				organization={organization}
				prefix={<IcATruck width={30} height={30} />}
			/>

			<ToggleLocation
				setFormValues={setFormValues}
				formValues={formValues}
			/>

			<LocationControl
				{...rest}
				formValues={formValues}
				setFormValues={setFormValues}
				controlItem={destinationControls}
				service_type="ltl_freight"
				organization={organization}
				prefix={<IcATruck width={30} height={30} />}
			/>
		</div>
	);
}

export default LTLRouteForm;
