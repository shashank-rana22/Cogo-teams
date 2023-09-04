import { Pill, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const FIRST_INDEX = 1;

function MasteryListItem({ data = {}, index, setToggleScreen = () => {}, setMasteryItemData = () => {} }) {
	const { t } = useTranslation(['allocation']);

	const {
		badge_name = '_', description = '_',
		audits = [], created_by = {},
		mastery_details = {},
		mastery_badges_detail = [],
	} = data;

	const handleEdit = () => {
		setMasteryItemData(data);
		setToggleScreen('create_mastery');
	};

	const updated_at = audits?.[GLOBAL_CONSTANTS.zeroth_index]?.created_at || null;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				#
				{' '}
				{index + FIRST_INDEX}
				<Button
					themeType="secondary"
					onClick={handleEdit}
				>
					{t('allocation:edit_button')}
				</Button>
			</div>

			<div className={styles.content}>
				<div className={styles.details}>
					<div>
						<div style={{ paddingBottom: '12px' }}>
							{t('allocation:event_name_label')}
							{' '}
							:
							{' '}
							<b>{badge_name}</b>
						</div>

						<div>
							{t('allocation:description_label')}
							{' '}
							:
							{' '}
							{description}
						</div>
					</div>

					<div className={styles.modified}>
						<div>
							{t('allocation:last_modified_label')}
							{' '}
							:
							{' '}
							{updated_at ? formatDate({
								date       : updated_at,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
								formatType : 'date',
							}) : '_'}
						</div>

						<div>
							{t('allocation:last_modified_by_label')}
							:
							{' '}
							{created_by?.name}
						</div>
					</div>
				</div>

				<div className={styles.badge_icon_container}>
					<div className={styles.rules}>
						<div className={styles.rule_heading}>{t('allocation:rules_label')}</div>

						<span>{t('allocation:mastery_in_label')}</span>

						{(mastery_badges_detail || []).map((item) => (
							<div key={item?.id} className={styles.pill}>
								<Pill color="#ced1ed">{item?.badge_name}</Pill>
							</div>
						))}
					</div>

					<div className={styles.badge}>
						<img
							style={{ objectFit: 'contain' }}
							src={mastery_details?.image_url}
							alt="Mastery-Icon"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MasteryListItem;
