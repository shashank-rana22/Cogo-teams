import { Tabs, TabPanel, Loader, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMRefresh } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import Documents from '../../../common/Documents';
import Overview from '../../../common/Overview';
import ShipmentHeader from '../../../common/ShipmentHeader';
import ShipmentInfo from '../../../common/ShipmentInfo';
import Tasks from '../../../common/Tasks';
import Timeline from '../../../common/TimeLine';
import useGetServices from '../../../hooks/useGetServices';
import useGetTimeLine from '../../../hooks/useGetTimeline';
import config from '../../../stakeholderConfig';

import styles from './styles.module.css';

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
				<div className={styles.permission_message}>
					You don&apos;t have permission to visit this page.
					<br />
					Please contact at
					{' '}
					<a href="tel:+91 7208083747">+91 7208083747</a>
				</div>
			</section>
		);
	}

	const TAB_PANELS = [
		{
			name      : 'overview',
			title     : 'Overview',
			component : <Overview shipmentData={shipment_data} stakeholderConfig={stakeholderConfig} />,
		},
		{
			name      : 'timeline_and_tasks',
			title     : 'Timeline and Tasks',
			component : <Tasks />,
		},
		{
			name      : 'documents',
			title     : 'Documents',
			component : <Documents />,
		},
	];

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
						{TAB_PANELS.map(({ name, title, component }) => (
							<TabPanel
								name={name}
								title={title}
								key={name}
							>
								{component}
							</TabPanel>
						))}
					</Tabs>
				</section>
			</main>
		</ShipmentDetailContext.Provider>
	);
}

export default IGMDesk;
