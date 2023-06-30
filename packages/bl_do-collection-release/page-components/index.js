import { Tabs, TabPanel, cl } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import ClickableDiv from '../commons/ClickableDiv';
import STATIONARY_PERMISSIONS from '../configs/STATIONARY_PERMISSION.json';
import TAB_CONFIG from '../configs/TAB_CONFIG.json';

import FCL from './FCL';
import FCLLocal from './FCL-Local';
import Filters from './Filters';
import LCL from './LCL';
import StationaryManagement from './StationaryManagement';
import styles from './styles.module.css';

const DESK_MAPPING = {
	fcl_freight : FCL,
	lcl_freight : LCL,
	fcl_local   : FCLLocal,
};

export default function BLDoCollectionDesk() {
	const [stateProps, setStateProps] = useState({
		activeTab     : 'bl',
		shipment_type : 'fcl_freight',
		inner_tab     : 'knockoff_awaiting',
		trade_type    : 'export',
		q             : '',
		page          : 1,
	});

	const profile = useSelector((state) => state.profile || {});
	const Desk = DESK_MAPPING[stateProps.shipment_type];

	const handleTabChange = (val) => {
		if (val === 'bl') {
			setStateProps({ ...stateProps, activeTab: val, page: 1, trade_type: 'export', document_status: undefined });
		} else {
			setStateProps({ ...stateProps, activeTab: val, page: 1, trade_type: 'import', document_status: undefined });
		}
	};

	const renderFilters =		(
		<div className={styles.filters_tabs}>
			{
			TAB_CONFIG.TABS.map((item) => (
				<ClickableDiv
					onClick={() => setStateProps({
						...stateProps,
						inner_tab       : item.value,
						page            : 1,
						document_status : undefined,
					})}
					key={uuid()}
				>
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

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={stateProps.activeTab}
				themeType="secondary"
				onChange={handleTabChange}
				fullWidth
			>
				<TabPanel
					name="bl"
					title="Bill Of Ladings"
				>
					<div className={styles.outer_tab}>
						<Filters stateProps={stateProps} setStateProps={setStateProps} />
						{renderFilters}
						<Desk setStateProps={setStateProps} stateProps={stateProps} />
					</div>
				</TabPanel>
				<TabPanel
					name="do"
					title="Delivery Orders"
				>
					<div className={styles.outer_tab}>
						<Filters stateProps={stateProps} setStateProps={setStateProps} />
						{renderFilters}
						<Desk setStateProps={setStateProps} stateProps={stateProps} />
					</div>
				</TabPanel>

				{STATIONARY_PERMISSIONS.email.includes(profile?.user?.email) ? (
					<TabPanel
						name="stationary"
						title="Stationary Management"
					>
						<StationaryManagement />
					</TabPanel>
				) : null}

			</Tabs>
		</div>
	);
}
