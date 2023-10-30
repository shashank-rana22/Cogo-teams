import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

import { SEVERITY_MAPPING } from '../../../../constant/card';

import styles from './styles.module.css';

function Footer({ lastUpdated = '', milestones = {}, action = {} }) {
	const { t } = useTranslation(['common', 'airOceanTracking']);

	const renderTitle = ({ next_milestone = '' }) => {
		if (next_milestone) return t('airOceanTracking:next_milestone');
		return t('airOceanTracking:current_milestone');
	};

	const { next_milestone } = milestones || {};

	const { severity = '' } = action || {};

	const { milestone, milestoneDate, mileStoneLocation } = useMemo(() => {
		const {
			current_milestone = '',
			current_milestone_date = '',
			current_milestone_location = '',
			next_milestone_date = '', next_milestone_location = '',
		} = milestones || {};
		return {
			milestone         : next_milestone || current_milestone,
			milestoneDate     : next_milestone_date || current_milestone_date,
			mileStoneLocation : next_milestone_location || current_milestone_location,
		};
	}, [milestones, next_milestone]);

	return (
		<div className={cl`${styles.flex_box} ${styles.footer_container}`}>
			<div className={cl`${styles.flex_box} ${styles.first_section}`}>

				<div className={styles.severity_section}>
					{SEVERITY_MAPPING?.[severity]?.icon}
					<span className={styles?.[SEVERITY_MAPPING?.[severity]?.class]}>
						{SEVERITY_MAPPING?.[severity]?.title}
					</span>
				</div>

				{milestone ? (
					<div className={styles.next_milestone}>
						{renderTitle({ next_milestone })}
						{' '}
						:
						{' '}
						{`${milestone} at ${mileStoneLocation} on ${formatDate({
							date       : milestoneDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}`}
					</div>
				) : null}
			</div>

			<div>
				{t('airOceanTracking:tracking_list_aircard_last_updated_at_text')}
				{' '}
				{formatDate({
					date       : lastUpdated,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
					formatType : 'dateTime',
				})}
			</div>

		</div>
	);
}
export default Footer;
