import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import TAG_COLOR_MAPPING from '../../../../../../constants/tag-color-mapping';

import styles from './styles.module.css';

const ZERO_RANK = 0;

const getListColumnMapping = (items) => {
	const { levelStack } = items || {};

	const LIST_COLUMN_MAPPING = [
		{
			id     : 'rank',
			key    : 'rank',
			flex   : 1,
			Header : <div className={styles.top_heading}>Rank</div>,

			accessor: ({ rank = 0 }) => (rank === ZERO_RANK ? 'NA' : (
				<div className={styles.rank}>{rank}</div>
			)),
		},
		{
			id     : 'name',
			key    : 'name',
			flex   : 2.5,
			Header : <div className={styles.top_heading}>Name</div>,

			accessor: ({ user, name }) => {
				if (!isEmpty(user)) {
					const { name: user_name = '', status, block_access } = user;

					return (
						<>
							<div className={styles.name}>{user_name || ''}</div>
							{!isEmpty(levelStack) && status === 'inactive'
								? <span className={styles.inactive}>Inactive</span>
								: (block_access && <span className={styles.inactive}>Blocked</span>)}
						</>
					);
				}

				if (isEmpty(name)) return null;

				return <div className={styles.name}>{name === 'sme' ? 'SME' : startCase(name)}</div>;
			},
		},
		{
			id     : 'total_score',
			key    : 'total_score',
			flex   : 1.25,
			Header : <div className={styles.top_heading}>Score</div>,

			accessor: ({ total_score = 0 }) => <div>{total_score}</div>,
		},
		{
			id     : 'percentile',
			key    : 'percentile',
			flex   : 1.25,
			Header : <div className={styles.top_heading}>%ile</div>,

			accessor: ({ percentile }) => (isEmpty(percentile) ? null : (
				<div>
					{percentile.toFixed(GLOBAL_CONSTANTS.two)}
					%
				</div>
			)),
		},
		{
			id     : 'report_type',
			key    : 'report_type',
			flex   : 1.25,
			Header : <div className={styles.top_heading}>Report Type</div>,

			accessor: ({ report_type = '' }) => {
				if (isEmpty(report_type)) return null;

				const [report] = report_type.split('_');

				return <Pill size="sm" color={TAG_COLOR_MAPPING[report_type]}>{report.toUpperCase()}</Pill>;
			},
		},
	];

	return LIST_COLUMN_MAPPING;
};

export default getListColumnMapping;
