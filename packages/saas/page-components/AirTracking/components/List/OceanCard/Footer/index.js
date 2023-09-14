import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { SEVERITY_MAPPING } from '../../../../constant/card';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function Footer({ lastUpdated = '', currentMilestone = {}, currentContainerAction = {} }) {
	const { current_status } = currentMilestone || {};
	const { current_milestone = '', next_milestone = '', last_milestone = '' } = current_status || {};
	const { severity = '' } = currentContainerAction || {};

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const milestone = next_milestone || current_milestone || last_milestone;

	const renderTitle = () => {
		if (next_milestone) return t('airOceanTracking:tracking_ocean_card_milestone_text_1');
		if (current_milestone) return t('airOceanTracking:tracking_ocean_card_milestone_text_2');
		return t('airOceanTracking:tracking_ocean_card_milestone_text_3');
	};

	return (
		<div className={cl`${styles.flex_box} ${styles.footer_container}`}>
			<div className={cl`${styles.flex_box} ${styles.first_section}`}>

				<div className={styles.severity_section}>
					{SEVERITY_MAPPING?.[severity]?.icon}
					<span className={styles?.[SEVERITY_MAPPING?.[severity]?.class]}>
						{SEVERITY_MAPPING?.[severity]?.title}
					</span>
				</div>

				{milestone && (
					<div className={styles.next_milestone}>
						{renderTitle()}
						{' '}
						:
						{' '}
						{milestone}
					</div>
				)}
			</div>

			<div>
				{t('airOceanTracking:tracking_list_aircard_last_updated_at_text')}
				{' '}
				{formatDate({
					date       : lastUpdated,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aa'],
					formatType : 'dateTime',
				})}
			</div>

		</div>
	);
}
export default Footer;
