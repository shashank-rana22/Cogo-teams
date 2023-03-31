import { Accordion } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import { AdditionalServiceList } from '../../../../../common/AdditionalServices';
import Route from '../../../../../common/Route';
import possibleFullRouteConfigs from '../../../../../common/Route/possible-full-route';

import styles from './styles.module.css';

function OverviewManageServices() {
	const { servicesList, refetchServices, isGettingShipment, primary_service, servicesLoading } = useContext(
		ShipmentDetailContext,
	);

	const mainServiceName = primary_service?.service_type;
	const possibleFullRoute = possibleFullRouteConfigs?.[mainServiceName];

	const getTitle = (
		<div className={styles.title}>Manage Services</div>
	);

	return (
		<Accordion title={getTitle}>
			{possibleFullRoute ? (
				<Route
					allServices={servicesList}
					loading={isGettingShipment || servicesLoading}
					refetch={refetchServices}
				/>
			) : null}

			<div className={styles.line} />
			<AdditionalServiceList
				services={servicesList}
				refetchServices={refetchServices}
			/>
		</Accordion>
	);
}
export default OverviewManageServices;
