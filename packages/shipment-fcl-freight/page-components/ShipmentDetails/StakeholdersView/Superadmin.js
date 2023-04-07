import { Tabs, TabPanel, Loader } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { Documents, Tracking } from '@cogoport/ocean-modules';
// import { ShipmentChat } from '@cogoport/shipment-chat';
import { ShipmentMails } from '@cogoport/shipment-mails';
import React, { useContext, useState } from 'react';

import Overview from '../../../common/Overview';
import PocSop from '../../../common/PocSop';
import ShipmentHeader from '../../../common/ShipmentHeader';
import ShipmentInfo from '../../../common/ShipmentInfo';
import Timeline from '../../../common/TimeLine';
import Tasks from '../Tabs/Tasks/List';

import styles from './styles.module.css';

function Superadmin() {
	const { shipment_data, isGettingShipment } = useContext(ShipmentDetailContext);
	const [activeTab, setActiveTab] = useState('overview');

	if (isGettingShipment) {
		return (
			<div className={styles.loader}>
				Loading Shipment Data....
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}

	return (
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
						<Tasks />
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
