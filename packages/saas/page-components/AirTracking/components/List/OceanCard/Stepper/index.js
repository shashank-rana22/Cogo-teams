import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { DEFAULT_STATUS } from '../../../../constant/card';
import { getMilestone } from '../../../../utils/getMilestone';

import styles from './styles.module.css';

import { Image } from '@/packages/next';

function Stepper({ activeTab, currentMilestone = {}, lineInfo = {}, airCargoDetails = {} }) {
	const { short_name = '', logo_url = '' } = lineInfo || {};
	const { container_status = {} } = currentMilestone || {};
	const { bool_status = DEFAULT_STATUS?.[activeTab] } = container_status || {};

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const MILESTONE_MAPPING = getMilestone({ airCargoDetails, t });

	return (
		<div className={styles.container}>

			<div className={styles.shippingline}>
				{logo_url ? <Image width={80} height={40} src={logo_url} />
					: <span className={styles.shippingName}>{short_name}</span> }
			</div>

			<div className={styles.stepper}>
				{Object.keys(MILESTONE_MAPPING).map((item, index) => (
					<div
						key={item}
						className={cl`${styles.dot_line} ${index === 0 ? styles.first_dot : ''}`}
					>
						{index !== 0 && (
							<div className={cl`${styles.line}
								${bool_status[index] ? styles.active_line : ''}`}
							/>
						)}

						<div className={styles.dot_container}>
							<div className={cl`${styles.dot} ${bool_status[index] ? styles.active_dot : ''}`} />

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
