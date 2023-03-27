import { Pill, Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import StyledTable from '../../../../../../../../../commons/StyledTable';

import styles from './styles.module.css';

function AllQuestions({ props = [] }) {
	const truncate = (str) => (str?.length > 58 ? `${str.substring(0, 56)}...` : str);

	const listdata = props || [];
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
			<StyledTable columns={columns} layoutType="table" data={listdata} />

		</div>
	);
}

export default AllQuestions;
