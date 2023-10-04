import { TabPanel, Tabs } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

interface ItemProps {
	activeTab:string,
	setActiveTab:Function,
	data:StashProps,
	push: (a: string, b: string) => void,
}
interface StashProps {
	statsData:Props,
}
interface Props {
	REQUESTED:number,
	REJECTED:number,
	APPROVED:number,
}
function Headers({ activeTab, setActiveTab, data, push }:ItemProps) {
	const { statsData } = data || {};
	const { REQUESTED, REJECTED, APPROVED } = statsData || {};
	const handleTabChange = (v) => {
		setActiveTab(v);
		push(
			'/my-incident/[activeIncidentTab]',
			`/my-incident/${v}`,
		);
	};
	return (
		<div>
			<div className={styles.container}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="primary"
					onChange={handleTabChange}
				>
					<TabPanel name="requested" title="Requested" badge={REQUESTED} />
					<TabPanel name="approved" title="Approved" badge={APPROVED} />
					<TabPanel name="rejected" title="Rejected" badge={REJECTED} />
				</Tabs>
			</div>
		</div>
	);
}

export default Headers;
