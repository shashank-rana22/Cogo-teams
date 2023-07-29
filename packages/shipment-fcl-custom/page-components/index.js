import { Button, Loader } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMRefresh } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import { useMemo, useEffect } from 'react';

import useGetActiveStakeholder from '../hooks/useGetActiveStakeholder';
import useGetServices from '../hooks/useGetServices';
import useGetShipment from '../hooks/useGetShipment';
import useGetTimeline from '../hooks/useGetTimeline';
import getStakeholderConfig from '../stakeholderConfig';

import DefaultView from './DefaultView';
import styles from './styles.module.css';

const UNAUTHORIZED_STATUS_CODE = 403;
const SERVICE_ADDITIONAL_METHODS = ['stakeholder', 'service_objects', 'booking_requirement'];
const SHIPMENT_ADDITIONAL_METHODS = ['main_service', 'documents'];

function FclCustoms() {
	const router = useRouter();

	const { get } = useGetShipment({ additional_methods: SHIPMENT_ADDITIONAL_METHODS });

	const { shipment_data, isGettingShipment, getShipmentStatusCode } = get || {};

	const { servicesGet = {} } = useGetServices({
		shipment_data,
		additional_methods: SERVICE_ADDITIONAL_METHODS,
	});

	const { getTimeline = {} } = useGetTimeline({ shipment_data });

	useEffect(() => {
		router.prefetch(router.asPath);
	}, [router]);

	const activeStakeholder = useGetActiveStakeholder();
	const stakeholderConfig = getStakeholderConfig({ stakeholder: activeStakeholder });

	const contextValues = useMemo(() => ({
		...get,
		...servicesGet,
		...getTimeline,
		activeStakeholder,
		stakeholderConfig,
	}), [get, servicesGet, getTimeline, activeStakeholder, stakeholderConfig]);

	if (isGettingShipment || getShipmentStatusCode === undefined) {
		return (
			<div className={styles.loader}>
				Loading Shipment Data....
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}

	if (!shipment_data && ![UNAUTHORIZED_STATUS_CODE, undefined].includes(getShipmentStatusCode)) {
		return (
			<div className={styles.shipment_not_found}>
				<div className={styles.section}>
					<h2 className={styles.error}>Something Went Wrong!</h2>

					<div className={styles.page}>We are looking into it.</div>

					<Button
						onClick={() => router.reload()}
						className={styles.refresh}
					>
						<IcMRefresh />
						&nbsp;Refresh
					</Button>
				</div>
			</div>
		);
	}

	if (getShipmentStatusCode === UNAUTHORIZED_STATUS_CODE && getShipmentStatusCode !== undefined) {
		return (
			<div className={styles.shipment_not_found}>
				<div className={styles.permission_message}>
					You don&apos;t have permission to visit this page.
					<br />
					Please contact at
					{' '}
					<a href="tel:+91 7208083747">+91 7208083747</a>
				</div>
			</div>
		);
	}

	return (
		<ShipmentDetailContext.Provider value={contextValues}>
			<DefaultView />
		</ShipmentDetailContext.Provider>
	);
}

export default FclCustoms;
