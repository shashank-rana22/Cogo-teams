import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import KAM_STATUS_COLOR_MAPPING from '../../../../../../../../configurations/kam-status-color-mapping';

import styles from './styles.module.css';

const getListColumnMapping = ({ t = () => {} }) => {
	const LIST_COLUMN_MAPPING = [
		{
			key    : 'pos',
			flex   : 0.2,
			Header : (
				<div className={styles.top_heading}>{t('allocation:pos_label')}</div>
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
					<div className={styles.top_heading}>{t('allocation:kam_name_header')}</div>
					<div className={styles.sub_heading}>{t('allocation:role_label')}</div>
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
				<div className={styles.top_heading}>{t('allocation:kam_level_header')}</div>
			),
			accessor: ({ kam_expertise }) => (
				<div className={styles.business_name}>{kam_expertise?.kam_expertise_level || '--'}</div>
			),
		},
		{
			key    : 'kam_status',
			flex   : 1,
			Header : (
				<div className={styles.top_heading}>{t('allocation:kam_status_header')}</div>
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
				<div className={styles.top_heading}>{t('allocation:kam_objective_score')}</div>
			),
			accessor: ({ score }) => (
				<div className={styles.business_name}>{score || '--'}</div>
			),
		},
		{
			key    : 'expertise_score',
			flex   : 1.5,
			Header : (
				<div className={styles.top_heading}>{t('allocation:expertise_score')}</div>
			),
			accessor: ({ kam_expertise }) => (
				<div className={styles.business_name}>{kam_expertise?.score || '--'}</div>
			),
		},
	];

	return LIST_COLUMN_MAPPING;
};

export default getListColumnMapping;
