import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyQuestionListState from '../../../../../commons/EmptyQuestionListState';
import Spinner from '../../../../../commons/Spinner';
import useListFaqQuestions from '../../../hooks/useListFaqQuestion';
import GPTAnswers from '../../GPTAnswers';

import Questions from './Questions';
import styles from './styles.module.css';

function QuestionsList({ tabTitle = '', searchState = '', topicId = '', tagId = '' }) {
	const {
		page,
		setPage,
		data,
		loading = false,
		paginationData,
		response_type,
		gpt_answer,
		show_more,
	} = useListFaqQuestions({ topicId, tagId, searchState });

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
		return <EmptyQuestionListState searchState={searchState} />;
	}
	if (response_type === 'GPT') {
		return <GPTAnswers answer={gpt_answer} showMore={show_more} search={searchState} />;
	}
	return (
		<div>
			<div style={{ margin: '6px 0', width: '100%', height: '488px' }} className={styles.scrollable}>

				{(data?.list || []).map((question) => (
					<div className={styles.border}>
						<Questions questions={question} topicId={topicId} topicName={tabTitle} />
					</div>
				))}
				{searchState && (
					<EmptyQuestionListState
						searchState={searchState}
						source="list"
					/>
				)}
			</div>

			<div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={paginationData?.total_count}
					pageSize={paginationData?.page_limit}
					onPageChange={setPage}
				/>
			</div>
		</div>
	);
}

export default QuestionsList;
