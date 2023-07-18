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
