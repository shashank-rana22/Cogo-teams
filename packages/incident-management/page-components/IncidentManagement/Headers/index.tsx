import { TabPanel, Tabs } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

interface ItemProps {
	activeTab:string,
	setActiveTab:Function,
	data:StashProps,
}
interface StashProps {
	statsData:Props,
}
interface Props {
	REQUESTED:number,
	REJECTED:number,
	APPROVED:number,
}
function Headers({ activeTab, setActiveTab, data }:ItemProps) {
	const { statsData } = data || {};
	const { REQUESTED, REJECTED, APPROVED } = statsData || {};
	return (
		<div>
			<div className={styles.container}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel name="requested" title="Requested" badge={REQUESTED}>
						{/* <div>Requested</div> */}
					</TabPanel>

					<TabPanel name="approved" title="Approved" badge={APPROVED}>
						{/* <div>Approved</div> */}
					</TabPanel>
					<TabPanel name="rejected" title="Rejected" badge={REJECTED}>
						{/* <div>Rejected</div> */}
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default Headers;
