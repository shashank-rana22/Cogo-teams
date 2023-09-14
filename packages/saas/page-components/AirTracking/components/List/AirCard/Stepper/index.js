import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import getMappingObject from '../../../../constant/card';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import { getMilestone } from '@/ui/page-components/air-ocean-tracking/utils/getMilestone';

function Stepper({ activeTab, lineInfo = {}, airCargoDetails = {} }) {
	const { short_name = '', logo_url = '' } = lineInfo || {};

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const MILESTONE_MAPPING = getMilestone({ airCargoDetails, t });

	const GET_MAPPING = getMappingObject({ t });

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
						className={cl`${styles.dot_line} ${index === 0 ? styles.first_dot : ''}`}
					>
						{index !== 0 && (
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
