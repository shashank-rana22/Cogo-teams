import { Tabs, TabPanel } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { React } from 'react';

import EmptyQuestionListState from '../../../../commons/EmptyQuestionListState';
import useListFaqTopic from '../../hooks/useListFaqTopic';
import QuestionsList from '../QuestionsList';
import SearchFound from '../SearchFound';

import styles from './styles.module.css';

function TopicList({ tabTitle, searchState = '' }) {
	const {
		refetchTopic = () => {},
		data,
		loading = false,
		activeTab = 'All Topics',
		setActiveTab,
	} = useListFaqTopic();

	if (isEmpty(data?.list)) {
		return <EmptyQuestionListState searchState={searchState} />;
	}

	return (
		<div>
			{!searchState
				? (
					<div className={styles.grid_container} style={{ display: 'flex' }}>
						<div
							style={{
								margin : '5px 0',
								width  : '100%',
								height : '490px',
								flex   : 1,
							}}
							className={styles.scrollable}
						>
							<Tabs
								activeTab={activeTab}
								themeType="primary-vertical"
								onChange={setActiveTab}
							>
								<TabPanel
									name="All Topics"
									title={(
										<div>
											<div className={styles.title}>
												{startCase('All Topics')}
												:
											</div>

											<div className={styles.subtitle}>
												{startCase('Click here to see all Questions')}
											</div>
										</div>
									)}
								/>
								{(data?.list || []).map((singleOption) => (
									<TabPanel
										name={singleOption}
										title={(
											<div>
												<div className={styles.title}>
													{startCase(singleOption?.name)}
													:
												</div>

												<div className={styles.subtitle}>
													{startCase(singleOption.description)}
												</div>
											</div>
										)}
									/>
								))}
							</Tabs>
						</div>

						<div style={{ flex: 3.5 }}>
							{activeTab
								? (
									<QuestionsList
										tabTitle={activeTab.name}
										searchState={searchState}
										topicId={activeTab.id}
									/>
								)
								: (
									<QuestionsList
										tabTitle={tabTitle}
										searchState={searchState}
										// topicId={}
									/>
								)}

						</div>
					</div>
				) : <SearchFound searchState={searchState} />}
		</div>
	);
}

export default TopicList;
