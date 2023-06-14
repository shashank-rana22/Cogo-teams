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

const SERVICE_ADDITIONAL_METHODS = ['stakeholder', 'service_objects', 'booking_requirement'];
const SHIPMENT_ADDITIONAL_METHODS = ['main_service', 'documents'];

function FclFreightLocal() {
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

	if (!shipment_data && ![403, undefined].includes(getShipmentStatusCode)) {
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

	if (getShipmentStatusCode === 403 && getShipmentStatusCode !== undefined) {
		return (
			<div className={styles.shipment_not_found}>
				<div className={styles.page}>
					You don&apos;t have permission to visit this page.
					Please contact at +91 7208083747
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

export default FclFreightLocal;
