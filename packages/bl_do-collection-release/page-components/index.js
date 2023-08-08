import { Tabs, TabPanel, Toggle } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState, useCallback } from 'react';

import STATIONARY_PERMISSIONS from '../configs/STATIONARY_PERMISSION.json';

import FCL from './FCL';
import FCLLocal from './FCL-Local';
import Filters from './Filters';
import LCL from './LCL';
import { RenderFilters } from './RenderFilters';
import StationaryManagement from './StationaryManagement';
import styles from './styles.module.css';

const DESK_MAPPING = {
	fcl_freight : FCL,
	lcl_freight : LCL,
	fcl_local   : FCLLocal,
};

export default function BLDoCollectionDesk() {
	const router = useRouter();

	const profile = useSelector((state) => state.profile || {});

	const [stateProps, setStateProps] = useState({
		activeTab        : 'bl',
		shipment_type    : 'fcl_freight',
		inner_tab        : 'knockoff_awaiting',
		trade_type       : 'export',
		ready_to_collect : false,
		ready_to_release : false,
		q                : '',
		page             : 1,
	});

	const Desk = DESK_MAPPING[stateProps.shipment_type];

	const handleVersionChange = useCallback(() => {
		const newPathname = `${router.asPath}`;
		window.location.replace(newPathname);
	}, [router.asPath]);

	const handleTabChange = (val) => {
		if (val === 'bl') {
			setStateProps({ ...stateProps, activeTab: val, page: 1, trade_type: 'export', document_status: undefined });
		} else {
			setStateProps({ ...stateProps, activeTab: val, page: 1, trade_type: 'import', document_status: undefined });
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div className={styles.header_text}>
					BL/DO Collection Release
				</div>
				<div>
					<Toggle
						size="md"
						onLabel="Old"
						offLabel="New"
						onChange={handleVersionChange}
					/>
				</div>
			</div>
			<Tabs
				activeTab={stateProps.activeTab}
				themeType="primary"
				onChange={handleTabChange}
				fullWidth
			>
				<TabPanel
					name="bl"
					title="Bill of Ladings"
				>
					<div className={styles.outer_tab}>
						<RenderFilters stateProps={stateProps} setStateProps={setStateProps} />
						<Filters stateProps={stateProps} setStateProps={setStateProps} />
						<Desk setStateProps={setStateProps} stateProps={stateProps} />
					</div>
				</TabPanel>
				<TabPanel
					name="do"
					title="Delivery Orders"
				>
					<div className={styles.outer_tab}>
						<RenderFilters stateProps={stateProps} setStateProps={setStateProps} />
						<Filters stateProps={stateProps} setStateProps={setStateProps} />
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
