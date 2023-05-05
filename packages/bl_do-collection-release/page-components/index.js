import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import TAB_CONFIG from '../configs/TAB_CONFIG.json';

import FCL from './FCL';
import FCLLocal from './FCL-Local';
import LCL from './LCL';
import StationaryManagement from './StationaryManagement';
import styles from './styles.module.css';

export default function BLDoCollectionDesk() {
	const [stateProps, setStateProps] = useState({
		activeTab     : 'bl_collection',
		shipment_type : 'fcl_freight',
		filters       : {},
	});

	const RenderTab = stateProps?.shipment_type in CollectionDesk
		? CollectionDesk[stateProps.shipment_type]
		: null;

	const renderInnerTabs = () => (
		<div className={styles.inner_tabs}>
			<Tabs
				activeTab={stateProps.shipment_type}
				themeType="primary"
				onChange={(val) => setStateProps({ ...stateProps, shipment_type: val })}
			>
				<TabPanel
					name="fcl_freight"
					title="FCL"
				>
					<FCL stateProps={stateProps} />
				</TabPanel>
				<TabPanel
					name="lcl_freight"
					title="LCL"
				>
					<LCL stateProps={stateProps} />
				</TabPanel>
				<TabPanel
					name="fcl_local"
					title="FCL Local"
				>
					<FCLLocal stateProps={stateProps} />
				</TabPanel>
			</Tabs>
		</div>
	);
	return (
		<div className={styles.container}>
			<StationaryManagement />
			{/* <div className={styles.header}>BL/DO Collection</div> */}

			<Tabs
				activeTab={stateProps.activeTab}
				themeType="primary"
				onChange={(val) => setStateProps({ ...stateProps, activeTab: val })}
				fullWidth
			>
				<TabPanel
					name="bl_collection"
					title="BL Colletion-Release"
				>
					{renderInnerTabs()}
				</TabPanel>
				<TabPanel
					name="do_collection"
					title="DO Release"
				>
					{renderInnerTabs()}
				</TabPanel>

				<TabPanel
					name="stationary"
					title="Stationary Management"
				>
					Stationary Managemnt
				</TabPanel>

			</Tabs>
		</div>
	);
}
