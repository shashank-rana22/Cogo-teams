import { Pill, Tooltip } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const onClickApplySort = (setSortType) => {
	setSortType((prev) => (prev === 'desc' ? 'asc' : 'desc'));
};

const COLUMNS_MAPPING = (sortType, setSortType) => ({
	questions : 'QUESTIONS',
	topics    : 'TOPICS',
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
	const truncate = (str) => (str?.length > 38 ? `${startCase(str.substring(0, 36))}...` : startCase(str));

	const columns_mapping = COLUMNS_MAPPING(sortType, setSortType);
	const columns = Object.entries(columns_mapping).map(([column, Header]) => ({
		Header,
		accessor: column,
	}));

	const data = (listdata || []).map((item) => ({
		questions: (
			<div style={{ fontWeight: 1000, paddingLeft: '20px' }}>
				<Tooltip content={item?.question_abstract} placement="right">
					<div>{truncate(item?.question_abstract)}</div>
				</Tooltip>
			</div>
		),
		topics: (
			item?.faq_topics?.length > 0 ? (
				<div className={styles.topics}>
					{item.faq_topics.map((topic) => {
						const { display_name } = topic || {};
						return <Pill size="sm" color="green">{startCase(display_name)}</Pill>;
					})}
				</div>
			) : <div style={{ marginLeft: '32px' }}>-</div>
		),
		tags: (
			item?.faq_tags?.length > 0 ? (
				<div className={styles.tags}>
					{item.faq_tags.map((tag) => {
						const { display_name } = tag || {};
						return <Pill size="sm" color="green">{startCase(display_name)}</Pill>;
					})}
				</div>
			) : <div style={{ marginLeft: '32px' }}>-</div>
		),
		views: (
			<div className={styles.question}>
				{item?.view_count}
			</div>
		),
		likes: (
			<div className={styles.likes}>
				{item?.answers?.[0]?.upvote_count}
			</div>
		),
		dislikes: (
			<div className={styles.question}>
				{item?.answers?.[0]?.downvote_count}
			</div>
		),
	}));

	return {
		columns,
		data,
	};
};

export default useAllQuestions;
