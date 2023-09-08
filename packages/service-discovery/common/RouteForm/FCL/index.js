import { IcAShipAmber } from '@cogoport/icons-react';

import LocationControl from '../common/LocationControl';
import ToggleLocation from '../common/ToggleLocation';
import getControls from '../getControls';

import controls from './fcl-route-controls';
import styles from './styles.module.css';

function FCLRouteForm({ mode = '', setFormValues = () => {}, formValues = {}, organization = {}, ...restProps }) {
	const [originControls, destinationControls] = getControls(controls, mode);

	return (
		<div className={styles.container}>
			<LocationControl
				formValues={formValues}
				setFormValues={setFormValues}
				controlItem={originControls}
				prefix={<IcAShipAmber width={26} height={26} />}
				service_type="fcl_freight"
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
				prefix={<IcAShipAmber width={26} height={26} />}
				service_type="fcl_freight"
				organization={organization}
				{...restProps}
			/>
		</div>
	);
}

export default FCLRouteForm;
