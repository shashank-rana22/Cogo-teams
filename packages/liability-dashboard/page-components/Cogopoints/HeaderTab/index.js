import { Tabs, TabPanel, SingleDateRange } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

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
			<div className={styles.date_container}>
				<SingleDateRange
					placeholder="Enter Date"
					dateFormat={GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy']}
					name="date"
					onChange={setSelectedDate}
					value={selectedDate}
					isPreviousDaysAllowed
				/>
			</div>
		</div>
	);
}

export default HeaderTab;
