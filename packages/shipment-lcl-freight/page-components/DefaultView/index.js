import { Tabs, TabPanel } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { dynamic } from '@cogoport/next';
import { useContext } from 'react';

const ShipmentInfo = dynamic(() => import('../ShipmentInfo'), { ssr: false });
const CancelDetails = dynamic(() => import('../CancelDetails'), { ssr: false });
const ShipmentChat = dynamic(() => import('@cogoport/shipment-chat/page-components'), { ssr: false });
const PocSop = dynamic(() => import('../PocSop'), { ssr: false });

const COMPONENT_MAPPING = {
	overview  : dynamic(() => import('../Overview'), { ssr: false }),
	tasks     : dynamic(() => import('../Tasks'), { ssr: false }),
	documents : dynamic(() => import('../Documents'), { ssr: false }),
	emails    : dynamic(() => import('@cogoport/shipment-mails/page-components'), { ssr: false }),
	tracking  : dynamic(() => import('@cogoport/ocean-modules/components/Tracking'), { ssr: false }),
};

function DefaultView() {
	const {
		shipment_data = {},
		stakeholder_config = {},
		activeTab,
		setActiveTab = () => {},
	} = useContext(ShipmentDetailContext) || {};

	const { features = [] } = stakeholder_config || {};
	const tabs = Object.keys(COMPONENT_MAPPING).filter((t) => features.includes(t));

	const conditionMapping = {
		shipment_info : !!features.includes('shipment_info'),
		cancelDetail  : !!(features.includes('cancel_details') && shipment_data.state === 'cancelled'),
		poc_sop       : !!(features.includes('poc') || features.includes('sop')),
		chat          : !!features.includes('chat'),
	};

	return (
		<div>
			{conditionMapping.shipment_info ? <div><ShipmentInfo /></div> : null}

			{conditionMapping.cancelDetail ? <div><CancelDetails /></div> : null}

			{conditionMapping.chat ? <div><ShipmentChat /></div> : null}

			{conditionMapping.poc_sop ? <div><PocSop /></div> : null}

			<Tabs
				fullWidth
				themeType="secondary"
				activeTab={activeTab}
				onChange={setActiveTab}
			>
				{tabs.map((t) => (
					<TabPanel name={t} key={t} title={stakeholder_config[t]?.tab_title}>
						{COMPONENT_MAPPING[t]}
					</TabPanel>
				))}
			</Tabs>
		</div>
	);
}

export default DefaultView;
