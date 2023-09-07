import { Tabs, TabPanel } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { Tracking } from '@cogoport/ocean-modules';
import ShipmentPageContainer from '@cogoport/ocean-modules/components/ShipmentPageContainer';
import { ShipmentChat } from '@cogoport/shipment-chat';
import { ShipmentMails } from '@cogoport/shipment-mails';
import { isEmpty } from '@cogoport/utils';
import React, { useMemo, useState } from 'react';

import Documents from '../../../common/Documents';
import JobStatus from '../../../common/JobStatus';
import Overview from '../../../common/Overview';
import PocSop from '../../../common/PocSop';
import PurchaseInvoice from '../../../common/PurchaseInvoice';
import ReOpenJob from '../../../common/ReOpenJob';
import RolloverDetails from '../../../common/RolloverDetails';
import RolloverRequestedModal from '../../../common/RolloverModal/RequestedModal';
import ShipmentHeader from '../../../common/ShipmentHeader';
import ShipmentInfo from '../../../common/ShipmentInfo';
import Tasks from '../../../common/Tasks';
import Timeline from '../../../common/TimeLine';
import useGetServices from '../../../hooks/useGetServices';
import useGetTimeLine from '../../../hooks/useGetTimeline';
import config from '../../../stakeholderConfig';

import styles from './styles.module.css';

const SERVICES_ADDITIONAL_MTDS = ['stakeholder', 'service_objects', 'can_edit_params'];
const stakeholderConfig = config({ stakeholder: 'DEFAULT_VIEW' });

function CostBookingDesk({ get = {}, activeStakeholder = '' }) {
	const [activeTab, setActiveTab] = useState('timeline_and_tasks');
	const [reOpenJobModal, setReOpenJobModal] = useState(false);

	const { shipment_data, isGettingShipment, getShipmentStatusCode, container_details } = get || {};

	const rollover_containers = (container_details || []).filter(
		(container) => container?.rollover_status === 'requested',
	);

	const { servicesGet = {} } = useGetServices({
		shipment_data,
		additional_methods: SERVICES_ADDITIONAL_MTDS,
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
				<div className={styles.top_header}>
					<ShipmentInfo />

					<JobStatus activeStakeholder={activeStakeholder} setReOpenJobModal={setReOpenJobModal} />

					<RolloverDetails />

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

						<TabPanel name="purchase_live_invoice" title="Live Invoices">
							<PurchaseInvoice activeTab={activeTab} />
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

						<TabPanel name="tracking" title="Tracking">
							<Tracking shipmentData={shipment_data} />
						</TabPanel>

					</Tabs>
				</div>

				{!isEmpty(rollover_containers) ? (
					<RolloverRequestedModal rollover_containers={rollover_containers} />
				) : null}

				{reOpenJobModal ? (
					<ReOpenJob
						showModal={reOpenJobModal}
						setShowModal={setReOpenJobModal}
						shipmentData={shipment_data}
					/>
				) : null}

			</ShipmentDetailContext.Provider>
		</ShipmentPageContainer>
	);
}

export default CostBookingDesk;
