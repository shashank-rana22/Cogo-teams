import { IcAOceanTracking, IcAAirTracking } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function ReturnOption({ label = '', icon = null }) {
	return (
		<div className={styles.options_container}>
			{icon}
			<div className={styles.option_text}>{label}</div>
		</div>
	);
}

export const getOptions = ({ t }) => [
	{
		value : 'ocean',
		label : (
			<ReturnOption
				label={t('airOceanTracking:ocean_toggle_label')}
				icon={<IcAOceanTracking width={25} height={25} />}
			/>),
	},
	{
		value : 'air',
		label : (
			<ReturnOption
				label={t('airOceanTracking:air_toggle_label')}
				icon={<IcAAirTracking width={25} height={25} />}
			/>),
	},
];
