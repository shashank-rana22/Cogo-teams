import { Pill, Tooltip, Pagination } from '@cogoport/components';
// eslint-disable-next-line import/no-unresolved
import startCase from '@cogoport/utils/src/utilities/startCase';
import React from 'react';

import StyledTable from '../../../../../../../../../commons/StyledTable';
import useListFaqQuestions from '../../../../../../hooks/useListFaqQuestions';

import styles from './styles.module.css';

function AllQuestions({ id = '' }) {
	const truncate = (str) => (str?.length > 58 ? `${str.substring(0, 56)}...` : str);

	const topicId = id;
	const props = useListFaqQuestions({ topicId });
	console.log(props, 'props');
	const { paginationData, page, setPage } = props;
	const { page_limit, total_count } = paginationData;

	const listdata = props.data?.list || [];

	const addedQuestionsColumns = () => [
		{
			Header   : 'Questions',
			accessor : (items) => (
				<div className={styles.question}>
					<Tooltip content={items?.question_abstract} placement="right">
						<div>{truncate(items?.question_abstract)}</div>
					</Tooltip>
				</div>
			),
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
			) : '-'),
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
				<div className={styles.question}>
					{items?.answers[0]?.upvote_count}
				</div>
			),
		},
		{
			Header   : 'No.of Dislikes',
			accessor : (items) => (
				<div className={styles.question}>
					{items?.answers[0]?.downvote_count}
				</div>
			),
		},

	];
	const columns = addedQuestionsColumns();

	return (
		<div className={styles.container}>
			<StyledTable columns={columns} layoutType="table" data={listdata} />

			<Pagination
				style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10px' }}
				type="page"
				currentPage={page}
				totalItems={total_count}
				pageSize={page_limit}
				onPageChange={setPage}
			/>
		</div>
	);
}

export default AllQuestions;
