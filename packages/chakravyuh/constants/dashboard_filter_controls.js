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

export const TIME_RANGE_OPTIONS = {
	more_options: [

		{
			children : '1W',
			key      : 7,
		},

		{
			children : '1Y',
			key      : 365,
		},
		{
			children : 'all',
			key      : 2500,
		},
	],
	default: [
		{
			children : '1M',
			key      : 30,
		},
		{
			children : '3M',
			key      : 90,
		},
		{
			children : '6M',
			key      : 180,
		},

	],
};
