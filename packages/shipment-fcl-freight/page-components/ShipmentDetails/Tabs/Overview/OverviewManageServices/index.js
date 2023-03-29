import { Accordion } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import { AdditionalServiceList } from '../../../../../common/AdditionalServices';
import Services from '../Services';

import styles from './styles.module.css';

function OverviewManageServices({ container }) {
	const { servicesList, refetchServices, isGettingShipment, primary_service, servicesLoading } = useContext(
		ShipmentDetailContext,
	);

	const getTitle = (
		<div className={styles.title}>Manage Services</div>
	);

	return (
		<Accordion title={getTitle}>

			<Services />

			<div className={styles.line} />
			<AdditionalServiceList
				services={servicesList}
				refetchServices={refetchServices}
				// activeTab={activeTab}
			/>
		</Accordion>
	);
}
export default OverviewManageServices;
