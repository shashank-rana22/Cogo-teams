import { Tabs, TabPanel, Toggle, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMArrowBack } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { ShipmentChat } from '@cogoport/shipment-chat';
import { isEmpty } from '@cogoport/utils';
import { useRouter } from 'next/router';
import { useContext, useState, useCallback, useEffect } from 'react';

import PocSop from '../PocSop';
import ShipmentHeader from '../ShipmentHeader';
import ShipmentInfo from '../ShipmentInfo';
import ShipmentTags from '../ShipmentTags';
import TimeLine from '../TimeLine';

import styles from './styles.module.css';

const TAB_MAPPING = {
	overview  : dynamic(() => import('../Overview'), { ssr: false }),
	tasks     : dynamic(() => import('../Tasks'), { ssr: false }),
	purchase  : dynamic(() => import('@cogoport/purchase-invoicing/page-components'), { ssr: false }),
	documents : dynamic(() => import('../Documents'), { ssr: false }),
	emails    : dynamic(() => import('@cogoport/shipment-mails/page-components'), { ssr: false }),
	tracking  : dynamic(() => import('@cogoport/air-modules/components/Tracking'), { ssr: false }),
};

const UNAUTHORIZED_STATUS_CODE = 403;

function DefaultView() {
	const router = useRouter();

	const {
		shipment_data = {}, stakeholderConfig = {},
		servicesList = [], getShipmentStatusCode,
		refetchServices = () => {},
	} = useContext(ShipmentDetailContext) || {};

	const { features = [], default_tab = 'tasks' } = stakeholderConfig || {};
	const [activeTab, setActiveTab] = useState(default_tab);

	const handleVersionChange = useCallback(() => {
		const newHref = `${window.location.origin}/${router?.query?.partner_id}/shipments/${shipment_data.id}`;
		window.location.replace(newHref);
		window.sessionStorage.setItem('prev_nav', newHref);
	}, [router?.query?.partner_id, shipment_data.id]);

	const tabs = Object.keys(TAB_MAPPING).filter((t) => features.includes(t));

	const conditionMapping = {
		shipment_info       : !!features.includes('shipment_info'),
		shipment_header     : !!features.includes('shipment_header'),
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
		purchase: {
			shipmentData : shipment_data,
			servicesData : servicesList,
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
					<Toggle
						size="md"
						onLabel="Old"
						offLabel="New"
						onChange={handleVersionChange}
					/>
					{conditionMapping.chat ? <ShipmentChat /> : null}
				</div>
			</div>
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
