/* eslint-disable no-nested-ternary */
import { Tabs, TabPanel, Badge } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { React } from 'react';

import EmptyQuestionListState from '../../../../../../../commons/EmptyQuestionListState';
import Spinner from '../../../../../../../commons/Spinner';
import useListFaqTopic from '../../../../../hooks/useListFaqTopic';
import QuestionsList from '../../../QuestionsList';

import styles from './styles.module.css';

const ALL_TOPICS = 'All Topics';

function TopicList({ searchState = '', tagId = [] }) {
	const {
		data,
		loading = false,
		activeTab,
		setActiveTab,
	} = useListFaqTopic();

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
		return (<EmptyQuestionListState />);
	}

	const truncate = (input) => (input?.length > 30 ? `${input.substring(0, 28)}..` : input);

	if (!searchState && (tagId.length === 0)) {
		return (
			<div className={styles.grid_container} style={{ display: 'flex' }}>
				<div
					style={{
						margin : '4px 0',
						width  : '100%',
						height : '65vh',
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

											{truncate(startCase(singleOption?.display_name))}
											{' '}
											<Badge
												color="#FA9E96"
												size="md"
												text={singleOption.question_count}
												style={{ marginLeft: 2 }}
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
					<QuestionsList
						tabTitle={activeTab.name}
						searchState={searchState}
						topicId={activeTab === 'All Topics' ? '' : activeTab}
					/>
				</div>
			</div>
		);
	}

	return (
		<div>
			{' '}
			<QuestionsList searchState={searchState} tagId={tagId} />
		</div>

	);
}

export default TopicList;
