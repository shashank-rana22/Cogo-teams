import { Pill, Tooltip } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const onClickApplySort = (setSortType) => {
	setSortType((prev) => (prev === 'desc' ? 'asc' : 'desc'));
};

const COLUMNS_MAPPING = (sortType, setSortType) => ({
	questions : 'QUESTIONS',
	tags      : 'TAGS',
	views     : (
		<div role="presentation" className={styles.sort_title} onClick={() => onClickApplySort(setSortType)}>
			NO. OF VIEWS
			<IcMArrowNext
				height={14}
				width={14}
				className={styles.sort_arrow}
				style={{ transform: sortType === 'desc' ? 'rotate(270deg)' : '' }}
			/>
		</div>
	),
	likes    : 'NO. OF LIKES',
	dislikes : 'NO. OF DISLIKES',
});

const useAllQuestions = ({ listdata = [], sortType, setSortType }) => {
	const truncate = (str) => (str?.length > 58 ? `${str.substring(0, 56)}...` : str);

	const columns_mapping = COLUMNS_MAPPING(sortType, setSortType);

	const columns = Object.entries(columns_mapping).map(([column, Header]) => ({
		Header,
		accessor: column,
	}));

	const data = (listdata || []).map((item) => {
		const { question_abstract = '', faq_tags = [], view_count, answers = [] } = item || {};
		const { upvote_count = 0, downvote_count = 0 } = answers?.[0] || {};

		const tableData = {
			questions: (
				<div className={styles.question}>
					<Tooltip content={question_abstract} placement="right">
						<div>{truncate(question_abstract)}</div>
					</Tooltip>
				</div>
			),
			tags: (faq_tags?.length > 0 ? (
				<div className={styles.tags}>
					{(faq_tags || []).map((tag) => {
						const { display_name } = tag || {};
						return <Pill size="sm" color="green">{startCase(display_name)}</Pill>;
					})}
				</div>
			) : '-'),
			views: (
				<div className={styles.likes}>
					{view_count}
				</div>
			),
			likes: (
				<div className={styles.likes}>
					{upvote_count}
				</div>
			),
			dislikes: (
				<div className={styles.likes}>
					{downvote_count}
				</div>
			),
		};
		return tableData;
	});

	return {
		columns,
		data,
	};
};

export default useAllQuestions;
