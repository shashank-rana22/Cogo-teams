import { cl } from '@cogoport/components';

import RenderCargoPills from './RenderCargoPills';
import styles from './styles.module.css';

function CargoDetails({ primary_service = {} }) {
	return (
		<div className={cl`${styles.container} ${styles.shipment_cargo_details_root}`}>
			<RenderCargoPills detail={{ ...primary_service, ...primary_service?.cargo_details?.[0] } || {}} />
		</div>
	);
}

export default CargoDetails;
