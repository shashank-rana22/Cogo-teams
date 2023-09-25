import { Tabs, TabPanel } from '@cogoport/components';

import { TABS_MAPPING } from '../../../../../constants';

import List from './List';
import styles from './styles.module.css';

function FeedbackList({
	setActiveTab = () => {},
	activeTab = '',
	feedbacks = [],
	loading = false,
}) {
	return (
		<div className={styles.list}>
			<Tabs
				fullWidth
				themeType="primary"
				activeTab={activeTab}
				onChange={setActiveTab}
			>
				{
					TABS_MAPPING.map((item) => (
						<TabPanel key={item.key} name={item.key} title={item.title}>
							<List loading={loading} feedbacks={feedbacks} />
						</TabPanel>
					))
					}
			</Tabs>

		</div>
	);
}

export default FeedbackList;
