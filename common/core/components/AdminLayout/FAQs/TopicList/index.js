import { Pagination, Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import QuestionList from '../QuestionList';
import Header from '../QuestionList/Header';

import IconMapping from './iconMapping';
import Loader from './Loader';
import styles from './styles.module.css';
import useTopicList from './useTopicList';

const generalIcon = (
	<img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/General.svg"
		alt="logo cogoport"
		className={styles.general_icon}
	/>
);

function TopicList() {
	const {
		search,
		setSearch,
		list,
		loading,
		paginationData,
		page,
		setPage,
		topic,
		setTopic,
		question,
		setQuestion,
	} = useTopicList();

	const render = () => {
		if (topic) {
			return (
				<QuestionList
					question={question}
					setQuestion={setQuestion}
					topic={topic}
					setTopic={setTopic}
				/>
			);
		}

		const renderIcon = ({ item }) => {
			const { name = '' } = item || {};

			let includesKey = '';
			Object.keys(IconMapping).forEach((key) => {
				if (name.includes(key)) {
					includesKey = key;
				}
			});

			const DisplayIcon = IconMapping[includesKey]?.icon || generalIcon;

			return <div className={styles.icon}>{DisplayIcon}</div>;
		};

		return (
			<div className={styles.container}>
				<div className={styles.popular_topics}>Popular Topics</div>
				<div className={styles.display_topics}>
					{(list || []).map((item) => (
						<div role="presentation" onClick={() => setTopic(item)} className={styles.square_div}>
							<div className={styles.icon_grid}>
								{renderIcon({ item })}
								<div className={styles.display_name_and_topic}>
									<Tooltip
										theme="light"
										content={startCase(item?.display_name)}
										placement="bottom"
										animation="shift-away"
									>
										<div className={styles.display_name}>
											{startCase(item?.display_name)}
										</div>
									</Tooltip>
									<div className={styles.question_count}>
										{item?.question_count}
										{' '}
										Questions
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className={styles.pagination_container}>
					<Pagination
						totalItems={paginationData?.total_count || 0}
						currentPage={page || 1}
						pageSize={paginationData?.page_limit}
						onPageChange={setPage}
					/>
				</div>
			</div>
		);
	};

	const renderQuestionList = () => {
		if (search) {
			return (
				<QuestionList
					search={search}
					question={question}
					setQuestion={setQuestion}
				/>
			);
		}

		if (loading) return <Loader />;

		return render();
	};

	return (
		<div className={styles.container}>
			<Header
				search={search}
				setSearch={setSearch}
				topic={topic}
				setTopic={setTopic}
				question={question}
				setQuestion={setQuestion}
			/>

			{renderQuestionList()}
		</div>
	);
}

export default TopicList;
