import { Tabs, TabPanel, Toggle } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import ShipmentPageContainer from '@cogoport/ocean-modules/components/ShipmentPageContainer';
import PurchaseInvoicing from '@cogoport/purchase-invoicing';
import { ShipmentChat } from '@cogoport/shipment-chat';
import { ShipmentMails } from '@cogoport/shipment-mails';
import { useRouter } from 'next/router';
import React, { useMemo, useState, useCallback } from 'react';

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

	return (
		<ShipmentPageContainer
			isGettingShipment={isGettingShipment}
			shipmentStatusCode={getShipmentStatusCode}
			shipmentData={shipment_data}
		>
			<ShipmentDetailContext.Provider value={contextValues}>
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
							<PurchaseInvoicing
								shipmentData={shipment_data}
								servicesData={servicesGet?.servicesList}
							/>
						</TabPanel>

						<TabPanel name="documents" title="Documents">
							<Documents />
						</TabPanel>

						<TabPanel name="emails" title="Emails">
							<ShipmentMails
								source="cogo_rpa"
								filters={{ q: shipment_data?.serial_id }}
								pre_subject_text={shipment_data?.serial_id?.toString() || ''}
							/>
						</TabPanel>
					</Tabs>
				</div>
			</ShipmentDetailContext.Provider>
		</ShipmentPageContainer>
	);
}
