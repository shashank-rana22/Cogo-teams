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
const TRESHOLD_LENGTH = 30;
const TRIM_START = 0;
const TRIM_END = 28;

function TopicList({ searchState = '', tagId = [] }) {
	const {
		data,
		loading = false,
		activeTab,
		setActiveTab,
	} = useListFaqTopic();

	if (loading) {
		return (
			<div className={styles.spinner}>
				<Spinner
					height={60}
					width={60}
					borderWidth="7px"
					outerBorderColor="#FBD69F"
					spinBorderColor="red"
				/>

			</div>
		);
	}

	if (isEmpty(data?.list)) {
		return (<EmptyQuestionListState />);
	}

	const truncate = (input) => (input?.length
		> TRESHOLD_LENGTH ? `${input.substring(TRIM_START, TRIM_END)}..` : input);

	if (!searchState && (isEmpty(tagId))) {
		return (
			<div className={styles.grid_container}>
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
								key={singleOption}
								name={singleOption.id}
								title={(
									<div className={styles.topics_container}>
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

				<div className={styles.questions_container_tag}>
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
