import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ArrowType({ sortBy = '', sortType = '', title = '' }) {
	if (sortBy !== title) {
		return <IcMArrowRotateUp className={styles.arrow} fill="#e0e0e0" />;
	}

	if (sortType === 'asc') {
		return <IcMArrowRotateUp className={styles.arrow} fill="#e0e0e0" />;
	}

	return <IcMArrowRotateDown className={styles.arrow} fill="#e0e0e0" />;
}

const getListColumnMapping = ({ params = {}, setParams = () => {} }) => {
	const handleSort = ({ title }) => {
		if (params.sort_by === title) {
			if (params.sort_type === 'asc') {
				setParams((prev) => ({ ...prev, sort_type: 'desc' }));
			} else {
				setParams((prev) => ({ ...prev, sort_type: 'asc' }));
			}
			return;
		}
		setParams((prev) => ({ ...prev, sort_by: title, sort_type: 'desc' }));
	};

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
						onClick={() => handleSort({ title: 'rank' })}
					>
						<div>Rank</div>
						<ArrowType sortBy={params.sort_by} sortType={params.sort_type} title="rank" />
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
			accessor : ({ user = {} }) => (isEmpty(user.name) ? null : <div className={styles.name}>{user.name}</div>),
		},
		{
			id   : 'total_score',
			key  : 'total_score',
			flex : 1.5,
			Header:
				(
					<div
						role="presentation"
						className={styles.top_heading}
						onClick={() => handleSort({ title: 'total_score' })}
					>
						<div>Score</div>
						<ArrowType sortBy={params.sort_by} sortType={params.sort_type} title="total_score" />
					</div>
				),
			accessor: ({ total_score }) => (isEmpty(total_score) ? null : <div>{total_score}</div>),
		},
		{
			id   : 'percentile',
			key  : 'percentile',
			flex : 1.5,
			Header:
				(
					<div
						role="presentation"
						className={styles.top_heading}
						onClick={() => handleSort({ title: 'percentile' })}
					>
						<div>%ile</div>
						<ArrowType sortBy={params.sort_by} sortType={params.sort_type} title="percentile" />
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
