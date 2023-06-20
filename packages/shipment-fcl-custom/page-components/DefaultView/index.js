import { Tabs, TabPanel } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { dynamic } from '@cogoport/next';
import { ShipmentChat } from '@cogoport/shipment-chat';
import { useContext, useState } from 'react';

import SopAndPoc from '../../common/PocSop';
import ShipmentHeader from '../../common/ShipmentHeader';
import ShipmentInfo from '../../common/ShipmentInfo';
import TimeLine from '../../common/TimeLine';

import styles from './styles.module.css';

const CancelDetails = dynamic(() => import('../../common/CancelDetails'), { ssr: false });
const DocumentHoldDetails = dynamic(() => import('../../common/DocumentHoldDetails'), { ssr: false });

const TAB_MAPPING = {
	overview  : dynamic(() => import('../../common/Overview'), { ssr: false }),
	tasks     : dynamic(() => import('../../common/Tasks'), { ssr: false }),
	sales     : dynamic(() => import('../../common/SalesInvoice'), { ssr: false }),
	purchase  : dynamic(() => import('@cogoport/purchase-invoicing/page-components'), { ssr: false }),
	documents : dynamic(() => import('../../common/Documents'), { ssr: false }),
	emails    : dynamic(() => import('@cogoport/shipment-mails/page-components'), { ssr: false }),
};

function DefaultView() {
	const { shipment_data = {}, stakeholderConfig = {}, servicesList = [] } = useContext(ShipmentDetailContext) || {};
	const { features = [], default_tab = 'tasks' } = stakeholderConfig || {};
	const [activeTab, setActiveTab] = useState(default_tab);

	const tabs = Object.keys(TAB_MAPPING).filter((t) => features.includes(t));

	const tabProps = {
		overview: {
			shipmentData: shipment_data,
		},
		emails: {
			source           : 'cogo_rpa',
			filters          : { q: shipment_data?.serial_id },
			pre_subject_text : `${shipment_data?.serial_id}`,
		},
		purchase: {
			servicesData : servicesList,
			shipmentData : shipment_data,
		},
	};

	const conditionMapping = {
		shipment_info       : !!features.includes('shipment_info'),
		purchase            : !!features.includes('purchase'),
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

					{conditionMapping.chat ? <ShipmentChat /> : null}
				</div>
			</div>

			{conditionMapping.cancelDetails ? <CancelDetails /> : null}

			{conditionMapping.documentHoldDetails ? <DocumentHoldDetails /> : null}

			<div className={styles.header}>
				{conditionMapping.shipment_header ? <ShipmentHeader /> : null}

				{conditionMapping.poc_sop ? <SopAndPoc /> : null}
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
