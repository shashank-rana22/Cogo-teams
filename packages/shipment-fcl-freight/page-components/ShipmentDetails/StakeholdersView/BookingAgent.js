import { Tabs, TabPanel, Pill, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { Tracking } from '@cogoport/ocean-modules';
import ShipmentPageContainer from '@cogoport/ocean-modules/components/ShipmentPageContainer';
import { ShipmentChat } from '@cogoport/shipment-chat';
import { isEmpty } from '@cogoport/utils';
import React, { useMemo, useState } from 'react';

import CancelDetails from '../../../common/CancelDetails';
import DocumentHoldDetails from '../../../common/DocumentHoldDetails';
import Documents from '../../../common/Documents';
import Overview from '../../../common/Overview';
import PocSop from '../../../common/PocSop';
import ReOpenJob from '../../../common/ReOpenJob';
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

const SERVICE_ADDITIONAL_METHODS = ['stakeholder', 'service_objects', 'booking_requirement', 'can_edit_params'];
const stakeholderConfig = config({ stakeholder: 'DEFAULT_VIEW' });

function BookingAgent({ get = {}, activeStakeholder = '' }) {
	const [activeTab, setActiveTab] = useState('overview');
	const [reOpenJobModal, setReOpenJobModal] = useState(false);

	const { shipment_data, isGettingShipment, getShipmentStatusCode, container_details } = get || {};

	const rollover_containers = (container_details || []).filter(
		(container) => container?.rollover_status === 'requested',
	);

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
				<div className={styles.top_header}>
					<ShipmentInfo />

					<RolloverDetails />

					{shipment_data?.is_job_closed && (
						<div className={styles.job_closed_container}>
							{shipment_data?.is_job_closed_financially ? (
								<Pill className={styles.job_closed_pill} size="lg">Financially Closed</Pill>
							) : (
								<>
									<Pill className={styles.job_closed_pill} size="lg">Operationally Closed</Pill>
									<Button
										className={styles.job_undo_button}
										themeType="link"
										size="md"
										onClick={() => setReOpenJobModal(true)}
									>
										Undo
									</Button>
								</>
							)}
						</div>
					)}

					<ShipmentChat />
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

						<TabPanel name="tracking" title="Tracking">
							<Tracking shipmentData={shipment_data} />
						</TabPanel>
					</Tabs>
				</div>

				{!isEmpty(rollover_containers) ? (
					<RolloverActionModal rollover_containers={rollover_containers} />
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

export default BookingAgent;
