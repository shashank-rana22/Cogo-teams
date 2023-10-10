import { RaiseAlarm, RaiseAlarmCard } from '@cogoport/air-modules/components/RaiseAlarm';
import useGetShipmentFaultAlarmDescription from '@cogoport/air-modules/hooks/useGetShipmentFaultAlarmDescription';
import { Tabs, TabPanel, Toggle, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMArrowBack } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { ShipmentChat } from '@cogoport/shipment-chat';
import { isEmpty } from '@cogoport/utils';
import { useRouter } from 'next/router';
import { useContext, useState, useCallback, useEffect } from 'react';

import JobStatus from '../../commons/JobStatus';
import PocSop from '../PocSop';
import ShipmentHeader from '../ShipmentHeader';
import ShipmentInfo from '../ShipmentInfo';
import ShipmentTags from '../ShipmentTags';
import TimeLine from '../TimeLine';

import ReOpenShipment from './ReOpenShipment';
import styles from './styles.module.css';

const TAB_MAPPING = {
	overview  : dynamic(() => import('../Overview'), { ssr: false }),
	tasks     : dynamic(() => import('../Tasks'), { ssr: false }),
	sales  	  : dynamic(() => import('../SalesInvoice'), { ssr: false }),
	purchase  : dynamic(() => import('../PurchaseInvoice'), { ssr: false }),
	documents : dynamic(() => import('../Documents'), { ssr: false }),
	emails    : dynamic(() => import('@cogoport/shipment-mails/page-components'), { ssr: false }),
	tracking  : dynamic(() => import('@cogoport/air-modules/components/Tracking'), { ssr: false }),
};

const UNAUTHORIZED_STATUS_CODE = 403;
const ALLOWED_ROLES = ['superadmin', 'booking_agent', 'service_ops2'];

function HandleRaiseContainer({
	shipment_data = {},
	alarmId = '',
	setAlarmId = () => {},
	isGettingShipment = false,
}) {
	const isTrue = shipment_data?.stakeholder_types?.some((role) => ALLOWED_ROLES?.includes(role));

	if (!shipment_data?.is_job_closed && isTrue) {
		return (
			<div className={styles.raise_alarm_container}>
				<RaiseAlarm
					alarmId={alarmId}
					setAlarmId={setAlarmId}
					loading={isGettingShipment}
				/>
			</div>
		);
	}

	return null;
}

function DefaultView() {
	const router = useRouter();
	const { navigation = '' } = router.query;
	const {
		shipment_data = {}, stakeholderConfig = {},
		getShipmentStatusCode = 0, isGettingShipment = false,
		refetchServices = () => {},
	} = useContext(ShipmentDetailContext) || {};

	const {
		id: shipment_id,
		is_job_closed_financially = false,
	} = shipment_data || {};

	const { features = [], default_tab = 'tasks', job_open_request = false } = stakeholderConfig || {};
	const [activeTab, setActiveTab] = useState(default_tab);
	const [finJobOpenConfirmation, setFinJobOpenConfirmation] = useState(false);

	const [alarmId, setAlarmId] = useState('');
	const [reload, setReload] = useState(false);

	const { data: alarmData = {} } = useGetShipmentFaultAlarmDescription(alarmId, reload);
	const handleVersionChange = useCallback(() => {
		const newHref = `${window.location.origin}/${router?.query?.partner_id}/shipments/${shipment_data.id}${
			navigation ? `?navigation=${navigation}` : ''
		}`;
		window.location.replace(newHref);
		window.sessionStorage.setItem('prev_nav', newHref);
	}, [router?.query?.partner_id, shipment_data.id, navigation]);

	const tabs = Object.keys(TAB_MAPPING).filter((t) => features.includes(t));

	const conditionMapping = {
		shipment_header     : !!features.includes('shipment_header'),
		sales              	: !!features.includes('sales'),
		purchase            : !!features.includes('purchase'),
		poc_sop             : !!(features.includes('poc') || features.includes('sop')),
		chat                : !!features.includes('chat'),
		cancelDetails       : !!(features.includes('cancel_details') && shipment_data.state === 'cancelled'),
		documentHoldDetails : !!features.includes('document_hold_details'),
		timeline            : !!features.includes('timeline'),
	};

	const tabProps = {
		emails: {
			source           : 'cogo_rpa',
			filters          : { q: shipment_data.serial_id },
			pre_subject_text : `${shipment_data.serial_id}`,
			shipment_type  	 : shipment_data.shipment_type,
		},
		tracking: {
			shipmentData: shipment_data,
		},
	};

	useEffect(() => {
		if (activeTab) {
			refetchServices();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	if (isEmpty(shipment_data) && ![UNAUTHORIZED_STATUS_CODE, undefined, ''].includes(getShipmentStatusCode)) {
		return (
			<div className={styles.shipment_not_found}>
				<h2 className={styles.error_heading}>Something Went Wrong!</h2>
				<div className={styles.error_subheading}>We are looking into it.</div>
				<Button
					onClick={() => router.push(`${window.location.origin}
					/${router?.query?.partner_id}/shipment-management`)}
					className={styles.refresh}
				>
					<IcMArrowBack />
					{' '}
					Back to Bookings
				</Button>
			</div>
		);
	}

	return (
		<div>
			<div className={styles.top_header}>
				<ShipmentInfo />
				<div className={styles.toggle_chat}>

					<JobStatus
						shipment_data={shipment_data}
						isJobOpenAllowed={job_open_request}
					/>

					<HandleRaiseContainer
						shipment_data={shipment_data}
						alarmId={alarmId}
						setAlarmId={setAlarmId}
						isGettingShipment={isGettingShipment}
					/>

					{is_job_closed_financially && (
						<ReOpenShipment
							finJobOpenConfirmation={finJobOpenConfirmation}
							setFinJobOpenConfirmation={setFinJobOpenConfirmation}
							shipment_id={shipment_id}
						/>
					)}

					<Toggle
						size="md"
						onLabel="Old"
						offLabel="New"
						onChange={handleVersionChange}
					/>

					{conditionMapping.chat ? <ShipmentChat /> : null}
				</div>
			</div>
			{!isEmpty(alarmData) && !isGettingShipment
						&& alarmData?.map((item) => (
							<div style={{ marginBottom: '10px' }} key={item}>
								<RaiseAlarmCard
									data={item}
									reload={reload}
									setReload={setReload}
								/>
							</div>
						))}
			<ShipmentTags shipmentData={shipment_data} />
			<div className={styles.header}>
				{conditionMapping.shipment_header ? <ShipmentHeader /> : null}
				{conditionMapping.poc_sop ? <PocSop /> : null}
			</div>

			{conditionMapping.timeline ? <TimeLine /> : null}

			<div className={styles.container}>
				<Tabs
					fullWidth
					themeType="secondary"
					activeTab={activeTab}
					onChange={setActiveTab}
				>
					{tabs.map((t) => (
						<TabPanel name={t} key={t} title={stakeholderConfig[t]?.tab_title}>
							{TAB_MAPPING[t](tabProps?.[t] || {})}
						</TabPanel>
					))}
				</Tabs>
			</div>
		</div>
	);
}

export default DefaultView;
