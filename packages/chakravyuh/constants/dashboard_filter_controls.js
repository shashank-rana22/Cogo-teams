import { IcMAir, IcMFcl } from '@cogoport/icons-react';

import styles from '../page-components/AccuracyDashboard/Filters/styles.module.css';

export const SERVICE_TYPE_OPTIONS = [
	{
		label : <p className={styles.dropdown_label}>FCL</p>,
		value : 'fcl',
	},
	{
		label : <p className={styles.dropdown_label}>AIR</p>,
		value : 'air',
	},
];

export const SELECT_ICON_MAPPING = {
	fcl : <IcMFcl />,
	air : <IcMAir />,
};

export const TIME_RANGE_OPTIONS = [
	{
		label     : 'Last one month',
		value     : 'last_one_month',
		date_diff : 30,
	},
	{
		label     : 'Last three months',
		value     : 'last_three_months',
		date_diff : 90,
	},
	{
		label     : 'Last six months',
		value     : 'last_six_months',
		date_diff : 180,
	},
	{
		label     : 'All',
		value     : 'all',
		date_diff : null,
	},
];
