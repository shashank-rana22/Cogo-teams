import { Pill, Tooltip, Pagination } from '@cogoport/components';
// eslint-disable-next-line import/no-unresolved
import startCase from '@cogoport/utils/src/utilities/startCase';
import React from 'react';

import StyledTable from '../../../../../../../../commons/StyledTable';

import styles from './styles.module.css';

function AllQuestions(props) {
	const { data, paginationData, page, setPage = () => {} } = props;
	const { total_count, page_limit } = paginationData;
	const listdata = data?.list;
	const truncate = (str) => (str?.length > 38 ? `${startCase(str.substring(0, 36))}...` : startCase(str));
	const addedQuestionsColumns = () => [
		{
			Header   : 'Questions',
			accessor : (items) => (
				<div style={{ fontWeight: 1000, paddingLeft: '20px' }}>
					<Tooltip content={items?.question_abstract} placement="right">
						<div>{truncate(items?.question_abstract)}</div>
					</Tooltip>
				</div>
			),
		},
		{
			Header   : 'Topics',
			accessor : (items) => (items?.faq_topics?.length > 0 ? (
				<div className={styles.topics}>
					{items.faq_topics.map((topic) => {
						const { display_name } = topic || {};
						return <Pill size="sm" color="green">{startCase(display_name)}</Pill>;
					})}
				</div>
			) : <div style={{ marginLeft: '32px' }}>-</div>),
		},
		{
			Header   : 'Tags',
			accessor : (items) => (items?.faq_tags?.length > 0 ? (
				<div className={styles.tags}>
					{items.faq_tags.map((tag) => {
						const { display_name } = tag || {};
						return <Pill size="sm" color="green">{startCase(display_name)}</Pill>;
					})}
				</div>
			) : <div style={{ marginLeft: '32px' }}>-</div>),
		},
		{
			Header   : 'No.Of Views',
			accessor : (items) => (
				<div className={styles.question}>
					{items?.view_count}
				</div>
			),
		},
		{
			Header   : 'No.of Likes',
			accessor : (items) => (
				<div className={styles.likes}>
					{items?.answers?.[0]?.upvote_count}
				</div>
			),
		},
		{
			Header   : 'No.of Dislikes',
			accessor : (items) => (
				<div className={styles.question}>
					{items?.answers?.[0]?.downvote_count}
				</div>
			),
		},

	];
	const columns = addedQuestionsColumns();
	return (
		<div className={styles.container}>
			<div>
				<StyledTable columns={columns} layoutType="table" data={listdata} />
				<Pagination
					style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', paddingRight: '12px' }}
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={setPage}
				/>

			</div>
		</div>
	);
}

export default AllQuestions;
