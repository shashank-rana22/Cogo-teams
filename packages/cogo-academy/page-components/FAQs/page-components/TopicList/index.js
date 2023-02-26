/* eslint-disable no-nested-ternary */
import { Tabs, TabPanel } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { React } from 'react';

import EmptyQuestionListState from '../../../../commons/EmptyQuestionListState';
import useListFaqTopic from '../../hooks/useListFaqTopic';
// eslint-disable-next-line import/no-cycle
import TagQuestions from '../PopularTags/TagQuestions';
import QuestionsList from '../QuestionsList';
import SearchFound from '../SearchFound';

import styles from './styles.module.css';

function TopicList({ tabTitle = '', searchState = '', tagId = '' }) {
	const ALL_TOPICS = 'All Topics';

	const {
		refetchTopic = () => {},
		data,
		loading = false,
		activeTab = { ALL_TOPICS },
		setActiveTab,
	} = useListFaqTopic();

	if (isEmpty(data?.list)) {
		return <EmptyQuestionListState searchState={searchState} />;
	}
	const truncate = (input) => (input?.length > 40 ? `${input.substring(0, 32)}...` : input);
	return (
		<div>
			{' '}
			{(!searchState && !tagId)
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
									name={ALL_TOPICS}
									title={(
										<div>
											<div className={styles.title}>
												{ALL_TOPICS}
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
													{truncate(startCase(singleOption?.name))}
													:
												</div>

												<div className={styles.subtitle}>
													{startCase(singleOption.description) 
													|| startCase('No Description added')}
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
									/>
								)}

						</div>
					</div>
				) : ((searchState)
					? (<SearchFound searchState={searchState} />) : (<TagQuestions tagId={tagId} />))}
		</div>

	);
}

export default TopicList;
