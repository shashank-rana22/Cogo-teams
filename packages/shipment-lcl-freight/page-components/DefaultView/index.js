import { Tabs, TabPanel } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { dynamic } from '@cogoport/next';
import { ShipmentChat } from '@cogoport/shipment-chat';
import { useContext, useState } from 'react';

import PocSop from '../PocSop';
import ShipmentHeader from '../ShipmentHeader';
import ShipmentInfo from '../ShipmentInfo';
import TimeLine from '../TimeLine';

import styles from './styles.module.css';

const CancelDetails = dynamic(() => import('../CancelDetails'), { ssr: false });
const DocumentHoldDetails = dynamic(() => import('../DocumentHoldDetails'), { ssr: false });

const TAB_MAPPING = {
	overview  : dynamic(() => import('../Overview'), { ssr: false }),
	tasks     : dynamic(() => import('../Tasks'), { ssr: false }),
	documents : dynamic(() => import('../Documents'), { ssr: false }),
	emails    : dynamic(() => import('@cogoport/shipment-mails/page-components'), { ssr: false }),
	tracking  : dynamic(() => import('@cogoport/ocean-modules/components/Tracking'), { ssr: false }),
};

function DefaultView() {
	const { shipment_data = {}, stakeholderConfig = {} } = useContext(ShipmentDetailContext) || {};

	const { features = [], default_tab = 'tasks' } = stakeholderConfig || {};
	const [activeTab, setActiveTab] = useState(default_tab);

	const tabs = Object.keys(TAB_MAPPING).filter((t) => features.includes(t));

	const conditionMapping = {
		shipment_info       : !!features.includes('shipment_info'),
		shipment_header     : !!features.includes('shipment_header'),
		poc_sop             : !!(features.includes('poc') || features.includes('sop')),
		chat                : !!features.includes('chat'),
		cancelDetails       : !!(features.includes('cancel_details') && shipment_data?.state === 'cancelled'),
		documentHoldDetails : !!features.includes('document_hold_details'),
		timeline            : !!features.includes('timeline'),
	};

	return (
		<div>
			<div className={styles.top_header}>
				<ShipmentInfo />

				<div className={styles.toggle_chat}>
					{/* <Toggle
						size="md"
						onLabel="Old"
						offLabel="New"
						onChange={handleVersionChange}
					/> */}
					{conditionMapping.chat ? <ShipmentChat /> : null}
				</div>
			</div>

			{conditionMapping.cancelDetails ? <CancelDetails /> : null}

			{conditionMapping.documentHoldDetails ? <DocumentHoldDetails /> : null}

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
							{TAB_MAPPING[t]()}
						</TabPanel>
					))}
				</Tabs>
			</div>

		</div>
	);
}

export default DefaultView;
