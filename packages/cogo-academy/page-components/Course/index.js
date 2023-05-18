import { TabPanel, Tabs, Badge } from '@cogoport/components';
import { useRef } from 'react';

import Header from './components/Header';
import ListComponent from './components/ListComponent';
import SearchFilter from './components/SearchFilter';
import styles from './styles.module.css';
import useHandleCourse from './useHandleCourse';

function Course() {
	const ref = useRef(null);

	const {
		handleChangeTab,
		activeTab,
		componentMapping,
	} = useHandleCourse({ ref });

	return (
		<div className={styles.container}>
			<Header />

			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={handleChangeTab}
					fullWidth
				>
					{Object.values(componentMapping).map((tab) => {
						const { key, title, componentProps, filterProps, total_count } = tab;

						return (
							<TabPanel
								key={key}
								name={key}
								title={(
									<div className={styles.tab_title}>
										{title}

										{total_count ? (
											<Badge
												color="red"
												size="md"
												text={total_count}
												style={{ marginLeft: '6px' }}
											/>
										) : null}
									</div>
								)}
							>
								<>
									<SearchFilter ref={ref} {...filterProps} />

									<ListComponent {...componentProps} />
								</>
							</TabPanel>
						);
					})}
				</Tabs>
			</div>
		</div>
	);
}

export default Course;
