/* eslint-disable no-nested-ternary */
import { Tabs, TabPanel, Badge } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import { React } from 'react';

import EmptyQuestionListState from '../../../../commons/EmptyQuestionListState';
import EmptyState from '../../../../commons/EmpyState';
import Spinner from '../../../../commons/Spinner';
import useListFaqTopic from '../../hooks/useListFaqTopic';
// eslint-disable-next-line import/no-cycle
import TagQuestions from '../PopularTags/TagQuestions';
import QuestionsList from '../QuestionsList';
import SearchFound from '../SearchFound';

import styles from './styles.module.css';

const ALL_TOPICS = 'All Topics';

function TopicList({ tabTitle = '', searchState = '', tagId = [] }) {
	const router = useRouter();

	const {
		refetchTopic = () => {},
		data,
		loading = false,
		activeTab,
		setActiveTab,
	} = useListFaqTopic();

	// if (true) {
	// 	return 'loading...';
	// }

	if (loading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
				<div className={styles.spinner}>
					<Spinner
						height={60}
						width={60}
						borderWidth="7px"
						outerBorderColor="#FBD69F"
						spinBorderColor="red"
					/>
				</div>
			</div>
		);
	}

	if (isEmpty(data?.list)) {
		return (<EmptyState text="Oops! No Topics availabe" />);
	}

	// if (isEmpty(data?.list)) {
	// 	return <EmptyQuestionListState searchState={searchState} />;
	// }

	const truncate = (input) => (input?.length > 40 ? `${input.substring(0, 29)}..` : input);
	return (
		<div>
			{' '}
			{(!searchState && (tagId.length === 0))
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
											</div>

											<div className={styles.subtitle}>
												{startCase('Click here to see all Questions')}
											</div>
										</div>
									)}
								/>

								{(data?.list || []).map((singleOption) => (
									<TabPanel
										name={singleOption.id}
										title={(

											<div>
												<div className={styles.title}>

													{truncate(startCase(singleOption?.name))}
													{' '}
													<Badge
														color="#FA9E96"
														size="md"
														text={singleOption.question_count}
													/>
												</div>

												<div className={styles.subtitle}>
													{startCase(singleOption.description) || 'No Description'}
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
										topicId={activeTab === 'All Topics' ? '' : activeTab}
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
