import { Tabs, TabPanel, Loader, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMRefresh } from '@cogoport/icons-react';
import { ShipmentChat } from '@cogoport/shipment-chat';
import { ShipmentMails } from '@cogoport/shipment-mails';
import { useRouter } from 'next/router';
import React, { useMemo, useState, useEffect } from 'react';

import Documents from '../../../common/Documents';
import Overview from '../../../common/Overview';
import PocSop from '../../../common/PocSop';
import ShipmentHeader from '../../../common/ShipmentHeader';
import ShipmentInfo from '../../../common/ShipmentInfo';
import Tasks from '../../../common/Tasks';
import Timeline from '../../../common/TimeLine';
import useGetServices from '../../../hooks/useGetServices';
import useGetTimeLine from '../../../hooks/useGetTimeline';

import styles from './styles.module.css';

const services_additional_methods = ['stakeholder', 'service_objects', 'booking_requirement'];

function BookingDesk({ get, activeStakeholder }) {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('overview');

	const { shipment_data, isGettingShipment } = get;

	const { servicesGet } = useGetServices({
		shipment_data,
		additional_methods: services_additional_methods,
		activeStakeholder,
	});

	const { getTimeline } = useGetTimeLine({ shipment_data });

	const contextValues = useMemo(() => ({
		...get,
		...servicesGet,
		...getTimeline,
		activeStakeholder,
	}), [get, servicesGet, getTimeline, activeStakeholder]);

	const handleClick = () => {
		router.reload();
	};

	useEffect(() => {
		router.prefetch(router.asPath);
	}, [router]);

	if (isGettingShipment) {
		return (
			<div className={styles.loader}>
				Loading Shipment Data....
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}

	if (!shipment_data) {
		return (
			<div className={styles.shipment_not_found}>
				<div className={styles.section}>
					<h1 className={styles.error}>404</h1>
					<div className={styles.page}>Ooops!!! The page you are looking for is not found</div>
					<Button
						onClick={handleClick}
						className={styles.refresh}
					>
						<IcMRefresh />
						&nbsp;
						Refresh
					</Button>
				</div>
			</div>
		);
	}

	return (
		<ShipmentDetailContext.Provider value={contextValues}>
			<div>
				<div className={styles.top_header}>
					<ShipmentInfo />
					<ShipmentChat />
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
					</Tabs>
				</div>
			</div>
		</ShipmentDetailContext.Provider>
	);
}

export default BookingDesk;
