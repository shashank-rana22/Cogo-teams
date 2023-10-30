import { cl } from '@cogoport/components';
import { Image } from '@cogoport/next';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

import getMappingObject from '../../../../constant/card';
import { getMilestone } from '../../../../utils/getMilestone';

import styles from './styles.module.css';

const ZERO = 0;

function Stepper({ activeTab, lineInfo = {}, airCargoDetails = {} }) {
	const { short_name = '', logo_url = '' } = lineInfo || {};

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const MILESTONE_MAPPING = getMilestone({ airCargoDetails, t });

	const GET_MAPPING = useMemo(() => getMappingObject({ t }), [t]);

	const { DEFAULT_STATUS } = GET_MAPPING?.[activeTab] || {};

	return (
		<div className={styles.container}>

			<div className={styles.airLine}>
				{logo_url ? <Image width={80} height={40} src={logo_url} />
					: <span className={styles.airLineName}>{short_name}</span> }
			</div>

			<div className={styles.stepper}>
				{Object.keys(MILESTONE_MAPPING).map((item, index) => (
					<div
						key={item}
						className={cl`${styles.dot_line} ${index === ZERO ? styles.first_dot : ''}`}
					>
						{index !== ZERO && (
							<div className={cl`${styles.line}
								${DEFAULT_STATUS[index] ? styles.active_line : ''}`}
							/>
						)}

						<div className={styles.dot_container}>
							<div className={cl`${styles.dot} ${DEFAULT_STATUS[index] ? styles.active_dot : ''}`} />

							<div className={cl`${styles.milestoneName} ${styles?.[item]}`}>
								{MILESTONE_MAPPING[item]}
							</div>
						</div>
					</div>
				))}
			</div>

		</div>
	);
}

export default Stepper;
