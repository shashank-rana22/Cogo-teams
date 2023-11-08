import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const ZERO_SCORE = 0;

const getListColumnMapping = (props) => {
	const { view } = props;

	const LIST_COLUMN_MAPPING = [
		{
			id       : 'rank',
			key      : 'rank',
			flex     : 1,
			Header   : <div className={styles.top_heading}>Rank</div>,
			accessor : ({ rank }) => (isEmpty(rank) ? null : <div className={styles.rank}>{rank}</div>),
		},
		{
			id       : 'name',
			key      : 'name',
			flex     : 4,
			Header   : <div className={styles.top_heading}>Name</div>,
			accessor : ({ name, user }) => (
				<p className={styles.name}>
					{['owner_wise', 'manager_wise', 'kam_wise'].includes(view)
						? user?.name : name}
				</p>
			),
		},
		{
			id       : 'score',
			key      : 'score',
			flex     : 1.5,
			Header   : <div className={styles.top_heading}>Score</div>,
			accessor : ({ total_score }) => (total_score === ZERO_SCORE ? 'NA'
				: <p className={styles.row_item}>{total_score}</p>),
		},
		{
			id       : 'percentile',
			key      : 'percentile',
			flex     : 1.5,
			Header   : <div className={styles.top_heading}>%ile</div>,
			accessor : ({ percentile }) => (isEmpty(percentile) ? null : (
				<p className={styles.row_item}>
					{percentile}
					%
				</p>
			)),
		},
	];

	return LIST_COLUMN_MAPPING;
};

export default getListColumnMapping;
