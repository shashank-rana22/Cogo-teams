import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const handleSort = ({ params = {}, setParams = () => {}, sortBy }) => {
	if (params.sort_by === sortBy) {
		if (params.sort_type === 'asc') {
			setParams((prev) => ({ ...prev, sort_type: 'desc' }));
		} else {
			setParams((prev) => ({ ...prev, sort_type: 'asc' }));
		}
		return;
	}
	setParams((prev) => ({ ...prev, sort_by: sortBy, sort_type: 'desc' }));
};

function ArrowType({ sortBy = '', sortType = '', title = '' }) {
	if (sortBy !== title) {
		return <IcMArrowRotateUp className={styles.arrow} fill="#e0e0e0" />;
	}

	if (sortType === 'asc') {
		return <IcMArrowRotateUp className={styles.arrow} fill="#e0e0e0" />;
	}

	return <IcMArrowRotateDown className={styles.arrow} fill="#e0e0e0" />;
}

const getListColumnMapping = () => {
	const LIST_COLUMN_MAPPING = [
		{
			id   : 'rank',
			key  : 'rank',
			flex : 1,
			Header:
				(
					<div role="presentation" className={styles.top_heading} onClick={() => handleSort({})}>
						<div>Rank</div>
						<ArrowType title="rank" />
					</div>
				),
			accessor: ({ rank }) => (isEmpty(rank) ? null : <p className={styles.rank}>{rank}</p>),
		},
		{
			id       : 'name',
			key      : 'name',
			flex     : 2,
			Header   : <div className={styles.top_heading}>Name</div>,
			accessor : ({ name }) => (isEmpty(name) ? null : <p className={styles.name}>{name}</p>),
		},
		{
			id   : 'score',
			key  : 'score',
			flex : 1.5,
			Header:
				(
					<div role="presentation" className={styles.top_heading} onClick={() => handleSort({})}>
						<div>Score</div>
						<ArrowType title="score" />
					</div>
				),
			accessor: ({ score }) => (isEmpty(score) ? null : <p>{score}</p>),
		},
		{
			id   : 'percentile',
			key  : 'percentile',
			flex : 1.5,
			Header:
				(
					<div role="presentation" className={styles.top_heading} onClick={() => handleSort({})}>
						<div>%ile</div>
						<ArrowType title="percentile" />
					</div>
				),
			accessor: ({ percentile }) => (isEmpty(percentile) ? null : (
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
