import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import BadgeCard from './BadgeCard';
import styles from './styles.module.css';

const FIRST_INDEX = 1;

function BadgeListItem(props) {
	const { t } = useTranslation(['allocation']);

	const { data = {}, index, setToggleScreen, setBadgeItemData, listRefetch } = props;

	const {
		bronze_details = {}, silver_details = {},
		gold_details = {}, badge_name = '', description = '', audits = [], created_by = {},
		badge_condition_name = [],
	} = data;

	const handleEdit = () => {
		setBadgeItemData(data);
		setToggleScreen('create_badge');
	};

	const MEDAL_DETAILS_MAPPING = {
		bronze: {
			name      : 'bronze',
			detailObj : bronze_details,
		},
		silver: {
			name      : 'silver',
			detailObj : silver_details,
		},
		gold: {
			name      : 'gold',
			detailObj : gold_details,
		},
	};

	const updated_at = audits?.[GLOBAL_CONSTANTS.zeroth_index]?.created_at || null;

	return (
		<div className={styles.container}>
			<div className={styles.number_tag}>
				#
				{' '}
				{index + FIRST_INDEX}
				<Button themeType="secondary" onClick={handleEdit}>
					{t('allocation:edit_button')}
				</Button>
			</div>

			<div className={styles.main_card}>
				<div className={styles.card_description}>
					<div className={styles.details}>
						<div className={styles.badge_name_tag}>
							<p>
								{t('allocation:badge_name_label')}
								{' '}
								:
								{'  '}
								<b>
									{badge_name}
								</b>
							</p>
						</div>

						<div className={styles.desc}>
							<p>
								{t('allocation:description_label')}
								{' '}
								:
								{' '}
								{description}
							</p>
						</div>

						<div className={styles.events}>
							{t('allocation:events_label')}
							{' '}
							:
							{' '}
							{
								badge_condition_name.map((item) => (
									<Pill color="#cfeaed" key={item?.id}>
										{item?.condition_name || ''}
									</Pill>
								))
							}
						</div>
					</div>

					<div className={styles.modified}>
						<div style={{ paddingRight: '4px' }}>
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
							{' '}
							:
							{' '}
							{created_by?.name}
						</div>
					</div>
				</div>

				<div className={styles.score_container}>
					<h3 style={{ color: '#4f4f4f' }}>{t('allocation:scores_label')}</h3>
					<div className={styles.score_badge}>
						{
							Object.values(MEDAL_DETAILS_MAPPING).map((item) => {
								const { name = '', detailObj } = item;

								return (
									<BadgeCard
										key={item}
										data={detailObj || {}}
										medal={startCase(name)}
										badgeItemData={data}
										isLast={name === 'gold'}
										listRefetch={listRefetch}
									/>
								);
							})
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default BadgeListItem;
