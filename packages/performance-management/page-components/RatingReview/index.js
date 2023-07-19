import { TabPanel, Tabs, Loader } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import HeaderComponent from './HeaderComponent';
import useGetEmployeeLevels from './hooks/useGetEmployeeLevels';
import styles from './styles.module.css';

const TABS_MAPPING = ['vertical_head', 'functional_manager'];

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
							TABS_MAPPING.map((tab) => (
								<TabPanel name={tab} title={startCase(tab)} key={tab}>
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
