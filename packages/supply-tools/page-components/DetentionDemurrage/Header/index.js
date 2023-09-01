import { Select } from '@cogoport/components';
import { memo } from 'react';

import SHIPMENT_TYPES from '../../../configs/DEMURRAGE_SHIPMENT_MAPPING.json';

import styles from './styles.module.css';

function Header({ setActiveShipment = () => {}, activeShipment = '' }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>Detention & Demurrage</div>
			<div className={styles.shipment_type}>
				<Select
					options={SHIPMENT_TYPES.shipment_types}
					value={activeShipment}
					size="md"
					onChange={setActiveShipment}
				/>

			</div>
		</div>
	);
}

export default memo(Header);
