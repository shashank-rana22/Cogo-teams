import { Pill, Tooltip, Pagination } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import Answer from './Answer';
import EmptySearchState from './EmptySearchState';
import GPTAnswers from './GPTAnswers';
import Loader from './Loader';
import styles from './styles.module.css';
import useQuestionList from './useQuestionList';

function QuestionList({
	search = '',
	topic = {},
	question = '',
	setQuestion = () => {},
}) {
	const {
		loading, list, page, setPage, pageData, response_type, gpt_answer, show_more,
	} = useQuestionList({
		topic,
		search,
		question,
		setQuestion,
	});
	if (question) {
		return (
			<Answer topic={topic} question={question} setQuestion={setQuestion} />
		);
	}

	if (loading) return <Loader topic={topic} />;

	if (response_type === 'GPT') {
		return (
			<GPTAnswers
				answer={gpt_answer}
				showMore={show_more}
				search={search}
			/>
		);
	}

	const allpills = (item) => (
		<div>
			{item?.faq_tags?.map((faqtag, i) => (i >= 3 ? (
				<Pill size="md" className={styles.pill}>
					{(faqtag.display_name).toUpperCase()}
				</Pill>
			) : null))}
		</div>
	);

	const extendedPills = (item) => {
		const REMAINING = item.faq_tags.length - 3;
		return (
			<div style={{ display: 'flex' }}>
				{item?.faq_tags?.slice(0, 3).map((faqtag) => (
					<Pill size="md" className={styles.pill}>
						{(faqtag.display_name).toUpperCase()}
					</Pill>
				))}
				<Tooltip
					content={allpills(item)}
					placement="right"
					theme="light"
					style={{ marginBottom: '24px' }}
				>
					<div className={styles.pill}>
						+
						{REMAINING}
						{' '}
						more..
					</div>
				</Tooltip>

			</div>
		);
	};

	return (
		<div className={styles.containers}>
			{list?.length > 0 ? (
				<>
					<div className={styles.topic_heading}>
						Topic:
						{' '}
						{startCase(topic.display_name) || 'Search Result'}
					</div>
					<div className={styles.list}>
						{(list || []).map((item) => (
							<div className={styles.list_container}>
								<div
									role="presentation"
									className={styles.question}
									onClick={() => setQuestion(item)}
								>
									<div className={styles.question_container}>
										<div style={{ marginRight: 4 }}>
											{item?.question_abstract}
										</div>
										<div>
											<IcMArrowRight
												height="16px"
												width="16px"
												style={{ color: '#ea3925' }}
											/>
										</div>
									</div>
									<div className={styles.pill_container}>

										{item?.faq_tags.length <= 3
											? item?.faq_tags?.map((faqtag) => (
												<Pill size="md" className={styles.pill}>
													{(faqtag.display_name).toUpperCase()}
												</Pill>
											))
											: extendedPills(item)}
									</div>
								</div>
							</div>
						))}
						{ search && <EmptySearchState search={search} source="list" />}
					</div>

					{(pageData?.total_count || 0) > 10 ? (
						<div className={styles.pagination_container}>
							<Pagination
								className="md"
								totalItems={pageData?.total_count || 0}
								currentPage={page || 1}
								pageSize={pageData?.page_limit}
								onPageChange={setPage}
							/>
						</div>
					) : null}
				</>
			) : (
				<EmptySearchState search={search} />
			)}
		</div>
	);
}

export default QuestionList;
