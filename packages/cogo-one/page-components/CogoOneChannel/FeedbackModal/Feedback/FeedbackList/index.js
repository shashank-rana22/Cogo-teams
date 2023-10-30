import { Tabs, TabPanel, Toggle } from '@cogoport/components';

import { TABS_MAPPING } from '../../../../../constants';

import List from './List';
import styles from './styles.module.css';

function FeedbackList({
	setActiveTab = () => {},
	setModalData = () => {},
	activeTab = '',
	feedbacks = [],
	loading = false,
	toggleValue = false,
	setToogleValue = () => {},
}) {
	return (
		<div className={styles.list}>
			<Toggle
				size="sm"
				onLabel="Raised to me"
				offLabel="Raised by me"
				value={toggleValue}
				onChange={() => setToogleValue((p) => !p)}
			/>
			<Tabs
				fullWidth
				activeTab={activeTab}
				onChange={setActiveTab}
				themeType="secondary"
			>
				{
					TABS_MAPPING.map((item) => (
						<TabPanel key={item.key} name={item.key} title={item.title}>
							<List setModalData={setModalData} loading={loading} feedbacks={feedbacks} />
						</TabPanel>
					))
					}
			</Tabs>

		</div>
	);
}

export default FeedbackList;
