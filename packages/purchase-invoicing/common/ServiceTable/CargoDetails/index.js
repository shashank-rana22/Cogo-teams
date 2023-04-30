import { cl } from '@cogoport/components';

import RenderCargoPills from './RenderCargoPills';
import styles from './styles.module.css';

function CargoDetails({ item }) {
	return (
		<div className={cl`${styles.container} ${styles.shipment_cargo_details_root}`}>
			<RenderCargoPills detail={item?.detail} />
		</div>
	);
}

export default CargoDetails;
