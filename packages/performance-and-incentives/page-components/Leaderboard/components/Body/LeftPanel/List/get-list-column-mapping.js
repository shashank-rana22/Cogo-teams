import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const ZERO_SCORE = 0;

const getListColumnMapping = () => {
	const LIST_COLUMN_MAPPING = [
		{
			id   : 'rank',
			key  : 'rank',
			flex : 1,
			Header:
				(
					<div
						role="presentation"
						className={styles.top_heading}
					>
						Rank
					</div>
				),
			accessor: ({ rank }) => (isEmpty(rank) ? null : (
				<div className={styles.rank}>{rank}</div>
			)),
		},
		{
			id       : 'name',
			key      : 'name',
			flex     : 2,
			Header   : <div className={styles.top_heading}>Name</div>,
			accessor : ({ user = {}, name = '' }) => ((isEmpty(user.name) && isEmpty(name))
				? null : <div className={styles.name}>{user.name || startCase(name)}</div>),
		},
		{
			id   : 'total_score',
			key  : 'total_score',
			flex : 1.5,
			Header:
				(
					<div
						className={styles.top_heading}
					>
						Score
					</div>
				),
			accessor: ({ total_score = 0 }) => (total_score === ZERO_SCORE
				? 'NA' : <div>{total_score}</div>),
		},
		{
			id   : 'percentile',
			key  : 'percentile',
			flex : 1.5,
			Header:
				(
					<div
						className={styles.top_heading}
					>
						%ile
					</div>
				),
			accessor: ({ percentile }) => (isEmpty(percentile) ? null : (
				<div>
					{percentile.toFixed(GLOBAL_CONSTANTS.two)}
					%
				</div>
			)),
		},
	];

	return LIST_COLUMN_MAPPING;
};

export default getListColumnMapping;
