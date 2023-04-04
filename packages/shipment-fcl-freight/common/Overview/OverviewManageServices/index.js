import { Accordion } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import { AdditionalServiceList } from '../../AdditionalServices';

import styles from './styles.module.css';

function OverviewManageServices() {
	const { servicesList, refetchServices } = useContext(
		ShipmentDetailContext,
	);

	const getTitle = (
		<div className={styles.title}>Manage Services</div>
	);

	return (
		<Accordion title={getTitle}>
			<AdditionalServiceList
				services={servicesList}
				refetchServices={refetchServices}
			/>
		</Accordion>
	);
}
export default OverviewManageServices;
