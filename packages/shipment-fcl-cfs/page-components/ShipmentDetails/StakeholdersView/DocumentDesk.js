import { Tabs, TabPanel, Button, Toggle } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMRefresh } from '@cogoport/icons-react';
import { ThreeDotLoader } from '@cogoport/ocean-modules';
import PurchaseInvoicing from '@cogoport/purchase-invoicing';
import { ShipmentChat } from '@cogoport/shipment-chat';
import { ShipmentMails } from '@cogoport/shipment-mails';
import { useRouter } from 'next/router';
import React, { useMemo, useState, useEffect, useCallback } from 'react';

import CancelDetails from '../../../common/CancelDetails';
import DocumentHoldDetails from '../../../common/DocumentHoldDetails';
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

const SERVICES_ADDITIONAL_METHODS = ['stakeholder', 'service_objects', 'booking_requirement'];
const FORBIDDEN_STATUS_CODE = 403;

export default function DocumentDesk({ get = {}, activeStakeholder = '' }) {
	const router = useRouter();

	const [activeTab, setActiveTab] = useState('timeline_and_tasks');

	const { shipment_data, isGettingShipment, getShipmentStatusCode } = get || {};

	const handleVersionChange = useCallback(() => {
		const newHref = `${window.location.origin}/${router?.query?.partner_id}/shipments/${shipment_data?.id}`;
		window.location.replace(newHref);
		window.sessionStorage.setItem('prev_nav', newHref);
	}, [router?.query?.partner_id, shipment_data?.id]);

	const { servicesGet = {} } = useGetServices({
		shipment_data,
		additional_methods: SERVICES_ADDITIONAL_METHODS,
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
				<ThreeDotLoader message="Loading Shipment Data" fontSize={18} size={45} />
			</div>
		);
	}

	if (!shipment_data && ![FORBIDDEN_STATUS_CODE, undefined].includes(getShipmentStatusCode)) {
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
						&nbsp;
						Refresh
					</Button>
				</div>
			</div>
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

	return (
		<ShipmentDetailContext.Provider value={contextValues}>
			<div>
				<div className={styles.top_header}>
					<ShipmentInfo />

					<div className={styles.toggle_chat}>
						<Toggle
							size="md"
							onLabel="Old"
							offLabel="New"
							onChange={handleVersionChange}
						/>
						<ShipmentChat />
					</div>
				</div>

				{shipment_data?.state === 'cancelled' ? <CancelDetails /> : null}

				<DocumentHoldDetails />

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
