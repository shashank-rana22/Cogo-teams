/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Tooltip, Pagination } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import Spinner from '../../Spinner';
// import EmptyState from '../EmptyState';

import Answer from './Answer';
import EmptySearchState from './EmptySearchState';
import styles from './styles.module.css';
import useQuestionList from './useQuestionList';

function QuestionList({
	search = '',
	topic = {},
	question = '',
	setQuestion = () => {},
}) {
	const { loading, list, page, setPage, pageData } = useQuestionList({
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

	if (loading) {
		return (
			<div className={styles.spinner_container}>
				<Spinner
					size={36}
					borderWidth={5}
					outerBorderColor="#f38e7e"
					spinBorderColor="#ea3925"
				/>
			</div>
		);
	}
	const allpills = (item) => (
		<div>
			{item?.faq_tags?.map((faqtag, i) => (i >= 3 ? (
				<div style={{ margin: '3px' }}>
					<div className={styles.pill}>{(faqtag.display_name).toUpperCase()}</div>
				</div>
			) : null))}
		</div>
	);
	const extendedPills = (item) => {
		const REMAINING = item.faq_tags.length - 3;
		return (
			<div style={{ display: 'flex' }}>
				{item?.faq_tags?.slice(0, 3).map((faqtag) => (
					<div style={{ display: 'flex' }} className={styles.pill}>
						{(faqtag.display_name).toUpperCase()}
					</div>
				))}
				<Tooltip
					content={allpills(item)}
					placement="right"
					theme="light"
					style={{ marginBottom: '24px' }}
				>
					<div style={{ display: 'flex' }} className={styles.pill}>
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
		<div>
			<div className={styles.container}>
				{list?.length > 0 ? (
					<>
						<div style={{ fontWeight: '600', marginBottom: 16, marginTop: 18, marginLeft: 24 }}>
							Topic:
							{' '}
							{startCase(topic.display_name) || 'Search Result'}
						</div>
						<div className={styles.list}>
							{(list || []).map((item) => (
								<div
									style={{
										marginLeft  : '4px',
										marginRight : '4px',
									}}
								>
									<div className={styles.question} onClick={() => setQuestion(item)}>
										<div
											style={{
												marginLeft     : '20px',
												marginRight    : '15px',
												paddingTop     : '15px',
												alignItems     : 'center',
												display        : 'flex',
												justifyContent : 'space-between',
											}}
										>
											<div style={{ marginRight: 4 }}>
												{item?.question_abstract}
												?
											</div>
											<div>
												<IcMArrowRight
													height="16px"
													width="16px"
													style={{ color: '#ea3925' }}
												/>
											</div>
										</div>
										<div
											style={{
												margin  : '8px 15px 3px 15px',
												display : 'flex',
											}}
										>
											{item?.faq_tags.length <= 3
												? item?.faq_tags?.map((faqtag) => (
													<div style={{ display: 'flex' }} className={styles.pill}>
														{(faqtag.display_name).toUpperCase()}
													</div>
												))
												: extendedPills(item)}
										</div>
									</div>
								</div>
							))}
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
		</div>
	);
}

export default QuestionList;
