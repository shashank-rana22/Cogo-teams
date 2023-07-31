import { Tabs, TabPanel } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import ShipmentPageContainer from '@cogoport/ocean-modules/components/ShipmentPageContainer';
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
const stakeholderConfig = config({ stakeholder: 'IGM_VIEW' });

function IGMDesk({ get = {}, activeStakeholder = '' }) {
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
		<ShipmentPageContainer
			isGettingShipment={isGettingShipment}
			getShipmentStatusCode={getShipmentStatusCode}
			shipment_data={shipment_data}
		>
			<ShipmentDetailContext.Provider value={contextValues}>
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
			</ShipmentDetailContext.Provider>
		</ShipmentPageContainer>
	);
}

export default IGMDesk;
