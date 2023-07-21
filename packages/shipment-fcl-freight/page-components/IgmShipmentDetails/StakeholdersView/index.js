import { Tabs, TabPanel, Loader, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMRefresh } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import { useMemo, useState, useEffect } from 'react';

import Documents from '../../../common/Documents';
import Overview from '../../../common/Overview';
import ShipmentHeader from '../../../common/ShipmentHeader';
import ShipmentInfo from '../../../common/ShipmentInfo';
import Tasks from '../../../common/Tasks';
import Timeline from '../../../common/TimeLine';
import useGetServices from '../../../hooks/useGetServices';
import useGetTimeLine from '../../../hooks/useGetTimeline';
import config from '../../../stakeholderConfig';
import styles from '../styles.module.css';

const SERVICES_ADDTIONAL_METHODS = ['stakeholder', 'service_objects', 'booking_requirement'];
const FORBIDDEN_STATUS_CODE = 403;
const stakeholderConfig = config({ stakeholder: 'IGM_VIEW' });

function IGMDesk({ get = {}, activeStakeholder = '' }) {
	const router = useRouter();

	const [activeTab, setActiveTab] = useState('overview');

	const { shipment_data, isGettingShipment, getShipmentStatusCode } = get || {};

	const { servicesGet = {} } = useGetServices({
		shipment_data,
		additional_methods: SERVICES_ADDTIONAL_METHODS,
	});

	const { getTimeline = {} } = useGetTimeLine({ shipment_data });

	const contextValues = useMemo(() => ({
		...get,
		...servicesGet,
		...getTimeline,
		activeStakeholder,
		stakeholderConfig,
	}), [get, servicesGet, getTimeline, activeStakeholder]);

	useEffect(() => {
		router.prefetch(router.asPath);
	}, [router]);

	if (isGettingShipment || getShipmentStatusCode === undefined) {
		return (
			<section className={styles.loader}>
				Loading Shipment Data....
				<Loader themeType="primary" className={styles.loader_icon} />
			</section>
		);
	}

	if (!shipment_data && ![FORBIDDEN_STATUS_CODE, undefined].includes(getShipmentStatusCode)) {
		return (
			<section className={styles.shipment_not_found}>
				<div className={styles.section}>
					<h2 className={styles.error}>Something Went Wrong!</h2>

					<div className={styles.page}>We are looking into it.</div>

					<Button
						onClick={() => router.reload()}
						className={styles.refresh}
					>
						<IcMRefresh />
						{' '}
						Refresh
					</Button>
				</div>
			</section>
		);
	}

	if (getShipmentStatusCode === FORBIDDEN_STATUS_CODE && getShipmentStatusCode !== undefined) {
		return (
			<section className={styles.shipment_not_found}>
				<div className={styles.page}>
					You don&apos;t have permission to visit this page.
					Please contact at +91 7208083747
				</div>
			</section>
		);
	}

	return (
		<ShipmentDetailContext.Provider value={contextValues}>
			<main>
				<header className={styles.top_header}>
					<ShipmentInfo />
				</header>

				<header className={styles.header}>
					<ShipmentHeader />
				</header>

				<Timeline />

				<section className={styles.container}>
					<Tabs
						activeTab={activeTab}
						fullWidth
						themeType="secondary"
						onChange={setActiveTab}
					>
						<TabPanel name="overview" title="Overview">
							<Overview shipmentData={shipment_data} />
						</TabPanel>

						<TabPanel name="timeline_and_tasks" title="Timeline and Tasks">
							<Tasks />
						</TabPanel>

						<TabPanel name="documents" title="Documents">
							<Documents />
						</TabPanel>
					</Tabs>
				</section>
			</main>
		</ShipmentDetailContext.Provider>
	);
}

export default IGMDesk;
