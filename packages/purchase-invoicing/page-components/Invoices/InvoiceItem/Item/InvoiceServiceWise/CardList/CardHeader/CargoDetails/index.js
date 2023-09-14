import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import RenderCargoPills from './RenderCargoPills';
import styles from './styles.module.css';

function CargoDetails({ primary_service = {} }) {
	return (
		<div className={cl`${styles.container} ${styles.shipment_cargo_details_root}`}>
			<RenderCargoPills detail={{
				...primary_service,
				...primary_service?.cargo_details?.[GLOBAL_CONSTANTS.zeroth_index],
			} || {}}
			/>
		</div>
	);
}

export default CargoDetails;
