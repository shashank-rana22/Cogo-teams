import { Tabs, TabPanel, Select, Input, cl } from '@cogoport/components';
import { useState } from 'react';

import ClickableDiv from '../commons/ClickableDiv';
import TAB_CONFIG from '../configs/TAB_CONFIG.json';

// import ChildTabs from '../commons/ChildTabs';

import FCL from './FCL';
import FCLLocal from './FCL-Local';
import LCL from './LCL';
import StationaryManagement from './StationaryManagement';
import styles from './styles.module.css';

const trade_type_options = [
	{ label: 'Export', value: 'export' },
	{ label: 'Import', value: 'import' },
];

const deskMapping = {
	fcl_freight : FCL,
	lcl_freight : LCL,
	fcl_local   : FCLLocal,
};

export default function BLDoCollectionDesk() {
	const [stateProps, setStateProps] = useState({
		activeTab     : 'stationary',
		shipment_type : 'fcl_freight',
		inner_tab     : 'knockoff_awaiting',
		trade_type    : '',
		q             : '',
		page          : 1,
	});

	const Desk = deskMapping[stateProps.shipment_type];

	const renderFilters = () => (
		<div className={styles.filters_tabs}>
			{
			TAB_CONFIG.TABS.map((item) => (
				<ClickableDiv onClick={() => setStateProps({ ...stateProps, inner_tab: item.value })}>
					<div className={cl`${stateProps.inner_tab === item.value ? styles.active : ''} 
				${styles.service_tab}`}
					>
						{item.label}

					</div>
				</ClickableDiv>
			))
	}
		</div>
	);

	const renderInnerTabs = () => (
		<div className={styles.inner_tabs}>

			<div className={styles.service_tabs}>
				{
				TAB_CONFIG.SHIPMENT_TYPES.map((item) => (
					<ClickableDiv onClick={() => setStateProps({ ...stateProps, shipment_type: item.value })}>
						<div className={cl`${stateProps.shipment_type === item.value ? styles.active : ''} 
				${styles.service_tab}`}
						>
							{item.label}
						</div>
					</ClickableDiv>
				))
			}
				<Select
					value={stateProps.trade_type}
					options={trade_type_options}
					onChange={(val) => setStateProps({ ...stateProps, trade_type: val })}
					placeholder="Trade Type"
				/>
			</div>
			<div>
				<Input
					placeholder="Search SID"
					type="search"
					size="sm"
					value={stateProps.q}
					onChange={(val) => setStateProps({ ...stateProps, q: val })}
				/>
			</div>
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.header}>BL/DO Collection</div>

			<Tabs
				activeTab={stateProps.activeTab}
				themeType="secondary"
				onChange={(val) => setStateProps({ ...stateProps, activeTab: val })}
				fullWidth
			>
				<TabPanel
					name="bl"
					title="BL Colletion-Release"
				>
					<div className={styles.outer_tab}>
						{renderInnerTabs()}
						{renderFilters()}
						<Desk setStateProps={setStateProps} stateProps={stateProps} />
					</div>
				</TabPanel>
				<TabPanel
					name="do"
					title="DO Release"
				>
					<div className={styles.outer_tab}>
						{renderInnerTabs()}
						{renderFilters()}
						<Desk setStateProps={setStateProps} stateProps={stateProps} />
					</div>
				</TabPanel>

				<TabPanel
					name="stationary"
					title="Stationary Management"
				>
					<StationaryManagement />
				</TabPanel>

			</Tabs>
		</div>
	);
}
