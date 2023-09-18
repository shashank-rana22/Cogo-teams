import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const getListColumnMapping = () => {
	const LIST_COLUMN_MAPPING = [
		{
			id       : 'rank',
			key      : 'rank',
			flex     : 1,
			Header   : <div className={styles.top_heading}>Rank</div>,
			accessor : ({ rank }) => (isEmpty(rank) ? null : <p className={styles.rank}>{rank}</p>),
		},
		{
			id       : 'name',
			key      : 'name',
			flex     : 2,
			Header   : <div className={styles.top_heading}>Name</div>,
			accessor : ({ name }) => (isEmpty(name) ? null : <p className={styles.name}>{name}</p>),
		},
		{
			id       : 'score',
			key      : 'score',
			flex     : 1.5,
			Header   : <div className={styles.top_heading}>Score</div>,
			accessor : ({ score }) => (isEmpty(score) ? null : <p>{score}</p>),
		},
		{
			id       : 'percentile',
			key      : 'percentile',
			flex     : 1.5,
			Header   : <div className={styles.top_heading}>%ile</div>,
			accessor : ({ percentile }) => (isEmpty(percentile) ? null : (
				<p>
					{percentile}
					%
				</p>
			)),
		},
	];

	return LIST_COLUMN_MAPPING;
};

export default getListColumnMapping;
