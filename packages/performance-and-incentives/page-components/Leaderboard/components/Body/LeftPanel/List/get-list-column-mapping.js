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

function ArrowType({ sortBy = '', sortType = '', key = '' }) {
	if (sortBy !== key) {
		return <IcMArrowRotateUp className={styles.arrow} />;
	}

	if (sortType === 'asc') {
		return <IcMArrowRotateUp className={styles.arrow} />;
	}

	return <IcMArrowRotateDown className={styles.arrow} />;
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
						<ArrowType key="rank" />
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
						<ArrowType key="score" />
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
						<ArrowType key="percentile" />
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
