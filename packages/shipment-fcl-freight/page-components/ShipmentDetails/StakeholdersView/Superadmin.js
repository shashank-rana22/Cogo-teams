import { Tabs, TabPanel } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { Documents, Tracking } from '@cogoport/ocean-modules';
// import { ShipmentChat } from '@cogoport/shipment-chat';
import { ShipmentMails } from '@cogoport/shipment-mails';
import React, { useState, useMemo } from 'react';

import Overview from '../../../common/Overview';
import PocSop from '../../../common/PocSop';
import ShipmentHeader from '../../../common/ShipmentHeader';
import ShipmentInfo from '../../../common/ShipmentInfo';
import Timeline from '../../../common/TimeLine';
import useGetServices from '../../../hooks/useGetServices';
import useGetShipment from '../../../hooks/useGetShipment';
import useGetTimeLine from '../../../hooks/useGetTimeline';

import styles from './styles.module.css';

function Superadmin() {
	const shipment_additional_methods = useMemo(() => ['main_service',
		'documents'], []);

	const { get } = useGetShipment({ additional_methods: shipment_additional_methods });
	const { shipment_data } = get;

	const services_additional_methods = useMemo(() => [
		'stakeholder',
		'service_objects'], []);

	const { servicesGet } = useGetServices({
		shipment_id        : shipment_data?.id,
		additional_methods : services_additional_methods,
	});

	const { getTimeline } = useGetTimeLine({ shipment_data });

	const contextValues = useMemo(() => ({
		...get,
		...servicesGet,
		...getTimeline,
		activeStakeholder: 'Superadmin',
	}), [get, servicesGet, getTimeline]);
	const [activeTab, setActiveTab] = useState('overview');

	return (
		<ShipmentDetailContext.Provider value={contextValues}>
			<div>
				<div className={styles.top_header}>
					<ShipmentInfo />
					{/* <ShipmentChat /> */}
				</div>

				<div className={styles.header}>
					<ShipmentHeader />
					<PocSop />
				</div>

				<Timeline />
				<div className={styles.container}>
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
							{/* <TimelineAndTask /> */}
						</TabPanel>
						<TabPanel name="sales_live_invoice" title="Sales Live Invoice">
							{/* <SalesInvoice /> */}
						</TabPanel>
						<TabPanel name="documents" title="Documents">
							<Documents />
						</TabPanel>
						<TabPanel name="emails" title="Emails">
							<ShipmentMails
								source="cogo_rpa"
								filters={{ q: shipment_data?.serial_id }}
								pre_subject_text={`${shipment_data?.serial_id}`}
							/>
						</TabPanel>
						<TabPanel name="tracking" title="Tracking">
							<Tracking shipmentData={shipment_data} />
						</TabPanel>
					</Tabs>
				</div>
			</div>
		</ShipmentDetailContext.Provider>
	);
}

export default Superadmin;
