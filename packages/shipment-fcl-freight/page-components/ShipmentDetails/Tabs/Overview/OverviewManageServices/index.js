import { Accordion } from '@cogoport/components';
import { useContext } from 'react';

import { AdditionalServiceList } from '../../../../../common/AdditionalServices';
import { ShipmentDetailContext } from '../../../../../common/context';
import Route from '../../../../../common/Route';

import styles from './styles.module.css';

function OverviewManageServices() {
	const { servicesList } = useContext(
		ShipmentDetailContext,
	);

	const getTitle = (
		<div className={styles.title}>Manage Services</div>
	);

	return (
		<Accordion title={getTitle}>
			<Route allServices={servicesList} />
			<div className={styles.line} />

			<AdditionalServiceList
				services={servicesList}
				// refetchServices={refetchServices}
				// activeTab={activeTab}
			/>
		</Accordion>
	);
}
export default OverviewManageServices;
