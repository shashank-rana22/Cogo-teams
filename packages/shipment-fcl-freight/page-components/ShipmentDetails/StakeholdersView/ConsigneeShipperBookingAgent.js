import { Tabs, TabPanel, Toggle } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useRouter } from '@cogoport/next';
import ShipmentPageContainer from '@cogoport/ocean-modules/components/ShipmentPageContainer';
import { ShipmentChat } from '@cogoport/shipment-chat';
import { ShipmentMails } from '@cogoport/shipment-mails';
import { isEmpty } from '@cogoport/utils';
import React, { useMemo, useState, useCallback } from 'react';

import CancelDetails from '../../../common/CancelDetails';
import DocumentHoldDetails from '../../../common/DocumentHoldDetails';
import Documents from '../../../common/Documents';
import Overview from '../../../common/Overview';
import PocSop from '../../../common/PocSop';
import RolloverDetails from '../../../common/RolloverDetails';
import RolloverActionModal from '../../../common/RolloverModal/RolloverActionModal';
import SalesInvoice from '../../../common/SalesInvoice';
import ShipmentHeader from '../../../common/ShipmentHeader';
import ShipmentInfo from '../../../common/ShipmentInfo';
import Tasks from '../../../common/Tasks';
import Timeline from '../../../common/TimeLine';
import useGetServices from '../../../hooks/useGetServices';
import useGetTimeLine from '../../../hooks/useGetTimeline';
import config from '../../../stakeholderConfig';

import styles from './styles.module.css';

const SERVICE_ADDITIONAL_METHODS = ['stakeholder', 'service_objects', 'booking_requirement'];
const stakeholderConfig = config({ stakeholder: 'DEFAULT_VIEW' });

function ConsigneeShipperBookingAgent({ get = {}, activeStakeholder = 'consignee_shipper_booking_agent' }) {
	const router = useRouter();

	const [activeTab, setActiveTab] = useState('overview');

	const { shipment_data, isGettingShipment, getShipmentStatusCode, container_details } = get || {};

	const rollover_containers = (container_details || []).filter(
		(container) => container?.rollover_status === 'requested',
	);

	const handleVersionChange = useCallback(() => {
		const newHref = `${window.location.origin}/${router?.query?.partner_id}/shipments/${shipment_data?.id}`;
		window.location.replace(newHref);
		window.sessionStorage.setItem('prev_nav', newHref);
	}, [router?.query?.partner_id, shipment_data?.id]);

	const { servicesGet = {} } = useGetServices({
		shipment_data,
		additional_methods: SERVICE_ADDITIONAL_METHODS,
		activeStakeholder,
	});

	const { getTimeline = {} } = useGetTimeLine({ shipment_data });

	const contextValues = useMemo(() => ({
		...get,
		...servicesGet,
		...getTimeline,
		activeStakeholder,
		stakeholderConfig,
	}), [get, servicesGet, getTimeline, activeStakeholder]);

	return (
		<ShipmentPageContainer
			isGettingShipment={isGettingShipment}
			shipmentStatusCode={getShipmentStatusCode}
			shipmentData={shipment_data}
		>
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
							<RolloverDetails />
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

							<TabPanel name="invoice" title="Sales Invoice">
								<SalesInvoice />
							</TabPanel>

							<TabPanel name="documents" title="Documents">
								<Documents />
							</TabPanel>

							<TabPanel name="emails" title="Emails">
								<ShipmentMails
									source="cogo_rpa"
									filters={{ q: shipment_data?.serial_id }}
									pre_subject_text={shipment_data?.serial_id}
								/>
							</TabPanel>
						</Tabs>
					</div>

					{!isEmpty(rollover_containers) ? (
						<RolloverActionModal rollover_containers={rollover_containers} />
					) : null}
				</div>
			</ShipmentDetailContext.Provider>
		</ShipmentPageContainer>
	);
}

export default ConsigneeShipperBookingAgent;
