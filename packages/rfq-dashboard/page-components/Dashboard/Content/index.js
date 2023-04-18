import { Tabs, TabPanel } from '@cogoport/components';

import List from './List';
import styles from './styles.module.css';

function Content(props) {
	const { activeTab, setActiveTab } = props;

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
			>
				<TabPanel name="local_rates" title="Local Rates">
					<List {...props} />
				</TabPanel>

				<TabPanel name="freight_bookings" title="Freight Bookings">
					<div>bookings</div>
				</TabPanel>
			</Tabs>

		</div>
	);
}

export default Content;
