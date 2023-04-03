import { Tabs, TabPanel } from '@cogoport/components';
import { startOfWeek, startOfMonth, getYear, getMonth, getDate } from '@cogoport/utils';
import { useState } from 'react';

import Header from './Header';
import KamData from './KamData';
import styles from './styles.module.css';

function KamExpertise() {
	const [activeTab, setActiveTab] = useState('this_week');

	const currentTime = new Date();
	const month = getMonth(currentTime);
	const day = getDate(currentTime);
	const year = getYear(currentTime);

	const weekEnd = startOfWeek(new Date(year, month, day));

	const monthEnd = startOfMonth(new Date(year, month, day));

	const quarter = Math.floor(((month + 1) / 3));
	const startFullQuarter = new Date(year, quarter * 3 - 3, 1);

	const yearEnd = new Date(year, 0, 1);

	const TAB_PANEL_MAPPING = {
		this_week: {
			name   : 'this_week',
			title  : 'This Week',
			params : {
				start_date : weekEnd,
				end_date   : currentTime,
			},
		},
		this_month: {
			name   : 'this_month',
			title  : 'This Month',
			params : {
				start_date : monthEnd,
				end_date   : currentTime,
			},
		},
		this_quarter: {
			name   : 'this_quarter',
			title  : 'This Quarter',
			params : {
				start_date : startFullQuarter,
				end_date   : currentTime,
			},
		},
		this_year: {
			name   : 'this_year',
			title  : 'This Year',
			params : {
				start_date : yearEnd,
				end_date   : currentTime,
			},
		},
	};

	return (
		<section className={styles.container} id="kam_expertise_container">
			<section className={styles.heading_container}>
				KAM Expertise
			</section>

			<Header />

			<div className={styles.tab_list}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					{Object.values(TAB_PANEL_MAPPING).map((item) => {
						const { name = '', title = '', params = {} } = item;

						return (
							<TabPanel
								key={name}
								name={name}
								title={title}
							>
								<KamData date_params={params} />
							</TabPanel>
						);
					})}
				</Tabs>
			</div>
		</section>

	);
}

export default KamExpertise;
