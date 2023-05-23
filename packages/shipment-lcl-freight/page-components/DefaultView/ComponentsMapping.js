import { Tabs, TabPanel } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { dynamic } from '@cogoport/next';
import { useContext } from 'react';

import styles from './styles.module.css';

const ShipmentInfo = dynamic(() => import('../ShipmentInfo'), { ssr: false });
const CancelDetails = dynamic(() => import('../CancelDetails'), { ssr: false });
const TimeLine = dynamic(() => import('../TimeLine'), { ssr: false });
const ShipmentChat = dynamic(() => import('@cogoport/shipment-chat/page-components'), { ssr: false });

const COMPONENT_MAPPING = {
	overview  : dynamic(() => import('../Overview'), { ssr: false }),
	tasks     : dynamic(() => import('../Tasks'), { ssr: false }),
	documents : dynamic(() => import('../Documents'), { ssr: false }),
	emails    : dynamic(() => import('@cogoport/shipment-mails/page-components'), { ssr: false }),
	tracking  : dynamic(() => import('@cogoport/ocean-modules/components/Tracking'), { ssr: false }),
};

function ComponentsMapping({ stakeholderConfig = {} }) {
	const { shipment_data } = useContext(ShipmentDetailContext) || {};

	const { features = [] } = stakeholderConfig;
	const tabs = Object.keys(COMPONENT_MAPPING).filter((t) => features.includes(t));

	const conditionMapping = {
		shipment_info : !!features.includes('shipment_info'),
		cancelDetail  : !!(features.includes('cancel_details') && shipment_data.state === 'cancelled'),
		poc_sop       : !!(features.includes('poc') || features.includes('sop')),
		chat          : !!features.includes('chat'),
	};

	return (
		<div>
			<div className={styles.top_header}>
				{conditionMapping.shipment_info ? <ShipmentInfo /> : null}

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

			{conditionMapping.cancelDetail ? <CancelDetails /> : null}

			{conditionMapping.chat ? <TimeLine /> : null}

			<div className={styles.container}>
				<Tabs>
					{tabs.map((t) => (
						<TabPanel name={t} key={t} title={stakeholderConfig[t]?.tab_title}>
							{COMPONENT_MAPPING[t]}
						</TabPanel>
					))}
				</Tabs>
			</div>
		</div>
	);
}

export default ComponentsMapping;
