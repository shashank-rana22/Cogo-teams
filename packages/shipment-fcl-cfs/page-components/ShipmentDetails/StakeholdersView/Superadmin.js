import { Tabs, TabPanel, Loader, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMRefresh } from '@cogoport/icons-react';
import PurchaseInvoicing from '@cogoport/purchase-invoicing';
import { ShipmentMails } from '@cogoport/shipment-mails';
import { useRouter } from 'next/router';
import { useMemo, useState, useEffect } from 'react';

import CancelDetails from '../../../common/CancelDetails';
import Documents from '../../../common/Documents';
import Overview from '../../../common/Overview';
import PocSop from '../../../common/PocSop';
import SalesInvoice from '../../../common/SalesInvoice';
import ShipmentHeader from '../../../common/ShipmentHeader';
import ShipmentInfo from '../../../common/ShipmentInfo';
import Tasks from '../../../common/Tasks';
import Timeline from '../../../common/TimeLine';
import useGetServices from '../../../hooks/useGetServices';
import useGetTimeLine from '../../../hooks/useGetTimeline';

import styles from './styles.module.css';

const SERVICE_ADDITIONAL_METHODS = ['stakeholder', 'service_objects', 'booking_requirement'];

const SHIPMENT_STATUS_CODE = 403;

function Superadmin({ get = {}, activeStakeholder = '' }) {
	const router = useRouter();

	const [activeTab, setActiveTab] = useState('timeline_and_tasks');

	const { shipment_data, isGettingShipment, getShipmentStatusCode } = get || {};

	const { servicesGet = {} } = useGetServices({
		shipment_data,
		additional_methods: SERVICE_ADDITIONAL_METHODS,
	});

	const { getTimeline = {} } = useGetTimeLine({ shipment_data });

	const contextValues = useMemo(() => ({
		...get,
		...servicesGet,
		...getTimeline,
		activeStakeholder,
	}), [get, servicesGet, getTimeline, activeStakeholder]);

	useEffect(() => {
		router.prefetch(router.asPath);
	}, [router]);

	if (isGettingShipment || getShipmentStatusCode === undefined) {
		return (
			<div className={styles.loader}>
				Loading Shipment Data....
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}

	if (!shipment_data && ![SHIPMENT_STATUS_CODE, undefined].includes(getShipmentStatusCode)) {
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

	if (getShipmentStatusCode === SHIPMENT_STATUS_CODE && getShipmentStatusCode !== undefined) {
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
			<div>
				<div className={styles.top_header}>
					<ShipmentInfo />

				</div>

				{shipment_data?.state === 'cancelled' ? <CancelDetails /> : null}

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

						<TabPanel name="invoice_and_quotation" title="Sales Invoice">
							<SalesInvoice />
						</TabPanel>

						<TabPanel name="purchase_live_invoice" title="Purchase Live Invoice">
							<PurchaseInvoicing shipmentData={shipment_data} servicesData={servicesGet?.servicesList} />
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

export default Superadmin;
