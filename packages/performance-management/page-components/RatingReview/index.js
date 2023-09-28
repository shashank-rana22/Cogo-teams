import { TabPanel, Tabs, Loader } from '@cogoport/components';

import useGetManagerLevel from './hooks/useGetManagerLevel';
import MonthlyRating from './MonthlyRating';
import styles from './styles.module.css';

const TABS_MAPPING = { vertical_head: 'Across All', functional_manager: 'Team View' };

function PerformanceRatingReview() {
	const props = useGetManagerLevel();
	const { level, loading, activeTab, setActiveTab } = props;

	if (loading) {
		return (
			<div className={styles.loader}>
				<Loader style={{ height: '60px', width: '60px' }} />
			</div>
		);
	}

	return (
		<div>
			<div className={styles.header}>
				Performance Rating Review
			</div>

			{['vertical_head', 'hr_admin'].includes(level) ? (
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					{Object.keys(TABS_MAPPING).map((tab) => (
						<TabPanel name={tab} title={TABS_MAPPING[tab]} key={tab}>
							<MonthlyRating props={props} key={tab} />
						</TabPanel>
					))}
				</Tabs>
			) : <MonthlyRating props={props} />}
		</div>
	);
}

export default PerformanceRatingReview;
