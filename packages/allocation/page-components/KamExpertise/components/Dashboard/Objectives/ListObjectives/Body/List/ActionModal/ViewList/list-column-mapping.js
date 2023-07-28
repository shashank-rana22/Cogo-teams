import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import KAM_STATUS_COLOR_MAPPING from '../../../../../../../../configurations/kam-status-color-mapping';

import styles from './styles.module.css';

const getListColumnMapping = () => {
	const LIST_COLUMN_MAPPING = [
		{
			key    : 'pos',
			flex   : 0.2,
			Header : (
				<div className={styles.top_heading}>POS</div>
			),
			accessor: ({ position }) => (
				<div>{position || '--'}</div>
			),
		},
		{
			key    : 'kam_name',
			flex   : 2,
			Header : (
				<>
					<div className={styles.top_heading}>KAM NAME</div>
					<div className={styles.sub_heading}>Role</div>
				</>
			),
			accessor: ({ stakeholder }) => (
				<>
					<div className={styles.business_name}>{stakeholder?.name || '--'}</div>
					<div className={styles.kam_role}>{stakeholder?.role || '--'}</div>
				</>
			),
		},
		{
			key    : 'kam_level',
			flex   : 1,
			Header : (
				<div className={styles.top_heading}>KAM LEVEL</div>
			),
			accessor: ({ kam_expertise }) => (
				<div className={styles.business_name}>{kam_expertise?.kam_expertise_level || '--'}</div>
			),
		},
		{
			key    : 'kam_status',
			flex   : 1,
			Header : (
				<div className={styles.top_heading}>KAM STATUS</div>
			),
			accessor: ({ stakeholder }) => (
				<div>
					<Pill color={KAM_STATUS_COLOR_MAPPING[stakeholder?.status]} size="md">
						{startCase(stakeholder?.status) || '--'}
					</Pill>
				</div>
			),
		},
		{
			key    : 'kam_objective_score',
			flex   : 1.5,
			Header : (
				<div className={styles.top_heading}>KAM OBJECTIVE SCORE</div>
			),
			accessor: ({ score }) => (
				<div className={styles.business_name}>{score || '--'}</div>
			),
		},
		{
			key    : 'expertise_score',
			flex   : 1.5,
			Header : (
				<div className={styles.top_heading}>EXPERTISE SCORE</div>
			),
			accessor: ({ kam_expertise }) => (
				<div className={styles.business_name}>{kam_expertise?.score || '--'}</div>
			),
		},
	];

	return LIST_COLUMN_MAPPING;
};

export default getListColumnMapping;
