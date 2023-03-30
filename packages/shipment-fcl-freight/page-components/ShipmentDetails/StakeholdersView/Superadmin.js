import { Tabs, TabPanel } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import Documents from '@cogoport/ocean-modules/Documents';
import Tracking from '@cogoport/ocean-modules/Tracking';
import { ShipmentChat } from '@cogoport/shipment-chat';
import { ShipmentMails } from '@cogoport/shipment-mails';
import React, { useContext, useState } from 'react';

import ShipmentInfo from '../../../common/ShipmentInfo';
import Timeline from '../../../common/TimeLine';
import TopBar from '../../../common/TopBar';

import styles from './styles.module.css';

function Superadmin() {
	const {
		shipment_data,
		timelineData,
		shipmentTimelineLoading,
	} = useContext(ShipmentDetailContext);
	const [activeTab, setActiveTab] = useState('overview');

	return (
		<div>
			<div className={styles.header}>
				<ShipmentInfo />
				<ShipmentChat />
			</div>

			<TopBar />
			<Timeline timelineData={timelineData} loading={shipmentTimelineLoading} />
			<div className={styles.container}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="secondary"
					onChange={setActiveTab}
				>
					<TabPanel name="overview" title="Overview">
						{/* <Overview shipmentData={shipment_data} /> */}
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

	);
}

export default Superadmin;
