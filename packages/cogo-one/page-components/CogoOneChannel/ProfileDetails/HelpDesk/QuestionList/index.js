import { Loader, Pagination } from '@cogoport/components';
import { IcMArrowBack, IcMArrowRight } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import useQuestionList from '../../../../../hooks/useQuestionList';

import Answer from './Answer';
import EmptySearchState from './EmptySearchState';
import styles from './styles.module.css';

function QuestionList({
	search = '', topic = {}, setTopic = () => {}, question = '',
	setQuestion = () => {},
}) {
	const { loading, list, page, setPage, pageData } = useQuestionList({ topic, search, question, setQuestion });

	if (!isEmpty(question)) {
		return (
			<Answer topic={topic} question={question} setQuestion={setQuestion} />
		);
	}

	if (loading) {
		return (
			<div className={styles.spinner_container}>
				<Loader themeType="primary" />
			</div>
		);
	}

	return (
		<div>

			{!search && (
				<div className={styles.header}>
					<IcMArrowBack
						width={16}
						height={16}
						className={styles.back}
						onClick={() => setTopic({})}
					/>
					{' '}
					Go Back to Search Result
				</div>
			)}

			{list?.length > 0 ? (
				<>
					<div className={styles.module}>
						Module:
						{' '}
						{startCase(topic.display_name) || 'Search Result'}
					</div>

					<div className={styles.list}>
						{(list || []).map((item) => (
							<div
								role="presentation"
								className={styles.question}
								onClick={() => setQuestion(item)}
							>
								<div className={styles.list_card}>

									<div>
										{item?.question_abstract}
										?
									</div>

									<div>
										<IcMArrowRight
											height={16}
											width={16}
											className={styles.right_icon}
										/>

									</div>
								</div>
								<div className={styles.tags}>
									{item?.faq_tags?.map((faqtag) => (
										<div className={styles.tags_name}>
											{startCase(faqtag?.display_name)}
											{' '}
											{' '}
										</div>
									))}
								</div>
							</div>

						))}
					</div>

					{(pageData?.total_count || 0) > 10 ? (
						<div className={styles.pagination_container}>
							<Pagination
								type="page"
								currentPage={page || 1}
								totalItems={pageData?.total_count || 0}
								pageSize={10}
								onPageChange={(val) => setPage(val)}
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
