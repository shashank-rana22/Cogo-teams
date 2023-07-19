import { Tabs, TabPanel, Loader, Button, Toggle } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMRefresh } from '@cogoport/icons-react';
import PurchaseInvoicing from '@cogoport/purchase-invoicing';
import { ShipmentChat } from '@cogoport/shipment-chat';
import { ShipmentMails } from '@cogoport/shipment-mails';
import { Tracking } from '@cogoport/surface-modules';
import { useRouter } from 'next/router';
import React, { useMemo, useState, useEffect, useCallback } from 'react';

import AddService from '../../common/AdditionalServices/components/List/AddService';
import CancelDetails from '../../common/CancelDetails';
import Documents from '../../common/Documents';
import Overview from '../../common/Overview';
import OverviewManageServices from '../../common/Overview/OverviewManageServices';
import PocSop from '../../common/PocSop';
import SalesInvoice from '../../common/SalesInvoice';
import ShipmentHeader from '../../common/ShipmentHeader';
import ShipmentInfo from '../../common/ShipmentInfo';
import Tasks from '../../common/Tasks';
import Timeline from '../../common/TimeLine';
import useGetShipment from '../../hooks/useGetShipment';
import useGetTimeLine from '../../hooks/useGetTimeline';
import useServiceList from '../../hooks/useServiceList';
import getStakeholderConfig from '../../stakeholderConfig';

import styles from './styles.module.css';

const ACTIVE_STAKEHOLDER = 'superadmin';
const FORBIDDEN_STATUS_CODE = 403;

function ShipmentDetails() {
	const router = useRouter();

	const stakeholderConfig = getStakeholderConfig({ stakeholder: ACTIVE_STAKEHOLDER });
	const { get } = useGetShipment();

	const [activeTab, setActiveTab] = useState('overview');

	const { shipment_data, isGettingShipment, getShipmentStatusCode } = get || {};
	const { getTimeline = {} } = useGetTimeLine({ shipment_data });
	const { servicesGet = {} } = useServiceList();

	const handleVersionChange = useCallback(() => {
		const newHref = `${window.location.origin}/${router?.query?.partner_id}/shipments/${shipment_data?.id}`;
		window.location.replace(newHref);
		window.sessionStorage.setItem('prev_nav', newHref);
	}, [router?.query?.partner_id, shipment_data?.id]);

	const contextValues = useMemo(() => ({
		...get,
		...getTimeline,
		...servicesGet,
		activeStakeholder: ACTIVE_STAKEHOLDER,
		stakeholderConfig,
	}), [get, servicesGet, getTimeline, stakeholderConfig]);

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
						{' '}
						Refresh
					</Button>
				</div>
			</div>
		);
	}

	if (getShipmentStatusCode === FORBIDDEN_STATUS_CODE && getShipmentStatusCode !== undefined) {
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

						<TabPanel name="timeline_and_tasks" title="TimeLine and Tasks">
							<Tasks />
						</TabPanel>

						<TabPanel name="invoice_and_quotation" title="Sales Invoice">
							<SalesInvoice />
						</TabPanel>

						<TabPanel name="purchase_live_invoice" title="Purchase Live Invoice">
							<main className={styles.purchasecontainer}>
								<OverviewManageServices isOpen isPurchaseTab />
							</main>
							<main className={styles.accordian}>
								<PurchaseInvoicing
									shipmentData={shipment_data}
									servicesData={servicesGet?.servicesList}
									Component={AddService}
								/>
							</main>
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

export default ShipmentDetails;
