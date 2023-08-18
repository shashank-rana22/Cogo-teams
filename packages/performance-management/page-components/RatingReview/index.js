import { TabPanel, Tabs, Loader } from '@cogoport/components';

import HeaderComponent from './HeaderComponent';
import useGetEmployeeLevels from './hooks/useGetEmployeeLevels';
import styles from './styles.module.css';

const TABS_MAPPING = { vertical_head: 'Across All', functional_manager: 'Team View' };

function PerformanceRatingReview() {
	const props = useGetEmployeeLevels();

	const { level, activeTab, setActiveTab, loading } = props || {};

	if (loading) {
		return (
			<div className={styles.loader}>
				<Loader style={{ height: '60px', width: '60px' }} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Performance Rating Review
			</div>

			{
				level === 'vertical_head' ? (
					<Tabs
						activeTab={activeTab}
						themeType="primary"
						onChange={setActiveTab}
					>
						{
						Object.keys(TABS_MAPPING).map((tab) => (
							<TabPanel name={tab} title={TABS_MAPPING[tab]} key={tab}>
								<HeaderComponent props={props} key={tab} />
							</TabPanel>
						))
						}
					</Tabs>
				) : <HeaderComponent props={props} />
			}

		</div>
	);
}

export default PerformanceRatingReview;
