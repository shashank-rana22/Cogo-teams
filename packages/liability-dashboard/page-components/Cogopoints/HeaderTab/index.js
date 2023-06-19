import { Tabs, TabPanel, DateRangepicker } from '@cogoport/components';

import { HEADER_TAB_OPTIONS } from '../../../constants';

import styles from './styles.module.css';

function HeaderTab({
	activeHeaderTab = '',
	setActiveHeaderTab = () => {},
	setSelectedDate = () => {},
	selectedDate = {},
}) {
	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeHeaderTab}
				themeType="primary"
				fullWidth
				onChange={(tab) => setActiveHeaderTab(tab)}
			>
				{HEADER_TAB_OPTIONS.map((item) => {
					const { name, title } = item || {};
					return (
						<TabPanel name={name} title={title} key={name} />
					);
				})}
			</Tabs>
			<DateRangepicker
				name="date"
				onChange={setSelectedDate}
				value={selectedDate}
				className={styles.date_picker}
				isPreviousDaysAllowed
			/>
		</div>
	);
}

export default HeaderTab;
