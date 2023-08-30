import { Select, Toggle } from '@cogoport/components';
import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';

import SHIPMENT_TYPES from '../../../configs/DEMURRAGE_SHIPMENT_MAPPING.json';

import styles from './styles.module.css';

function Header({ setActiveShipment = () => {}, activeShipment = '' }) {
	const router = useRouter();

	const handleVersionChange = useCallback(() => {
		const newPathname = `${router.asPath}`;
		window.location.replace(newPathname);
	}, [router.asPath]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>Detention & Demurrage</div>
			<div className={styles.sub_container}>
				<Toggle
					size="md"
					onLabel="Old"
					offLabel="New"
					onChange={handleVersionChange}
				/>

				<div className={styles.select_container}>
					<Select
						options={SHIPMENT_TYPES.shipment_types}
						value={activeShipment}
						size="md"
						onChange={setActiveShipment}
					/>
				</div>
			</div>
		</div>
	);
}

export default memo(Header);
