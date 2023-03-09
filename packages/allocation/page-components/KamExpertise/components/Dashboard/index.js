import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import Header from './Header';
import styles from './styles.module.css';
import ThisMonth from './ThisMonth';
import ThisQuarter from './ThisQuarter';
import ThisWeek from './ThisWeek';
import ThisYear from './ThisYear';

const TAB_PANEL_MAPPING = {
	this_week: {
		name      : 'this_week',
		title     : 'This Week',
		Component : ThisWeek,
	},
	this_month: {
		name      : 'this_month',
		title     : 'This Month',
		Component : ThisMonth,
	},
	this_quarter: {
		name      : 'this_quarter',
		title     : 'This Quarter',
		Component : ThisQuarter,
	},
	this_year: {
		name      : 'this_year',
		title     : 'This Year',
		Component : ThisYear,
	},
};

function KamExpertise() {
	const [activeTab, setActiveTab] = useState('this_week');

	return (
		<section className={styles.container} id="kam_expertise_container">
			<section className={styles.heading_container}>
				KAM Expertise
			</section>

			<div>
				<Header />
			</div>

			<div className={styles.tab_list}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="secondary"
					onChange={setActiveTab}
					className={styles.tabs}
				>
					{Object.values(TAB_PANEL_MAPPING).map((item) => {
						const { name = '', title = '', Component } = item;

						if (!Component) return null;

						return (
							<TabPanel
								key={name}
								name={name}
								title={title}
							>
								<Component />
							</TabPanel>
						);
					})}
				</Tabs>
			</div>
		</section>

	);
}

export default KamExpertise;
