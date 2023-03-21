import { Button } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';

import BadgeCard from './BadgeCard';
import styles from './styles.module.css';

function BadgeListItem(props) {
	const { data = {}, index, setToggleScreen, setBadgeItemData, listRefetch } = props;
	const { bronze_details = {}, silver_details = {}, gold_details = {} } = data;

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

	return (
		<div className={styles.container}>
			<div className={styles.number_tag}>
				<p>
					#
					{index + 1}
				</p>
				<Button themeType="secondary" onClick={handleEdit}>Edit</Button>
			</div>

			<div className={styles.main_card}>

				<div className={styles.card_description}>
					<div className={styles.details}>
						<div className={styles.badge_name_tag}>
							<p>
								Badge Name
								{' '}
								:
								{'  '}
								<b>
									{data.badge_name}
								</b>
							</p>
						</div>

						<div className={styles.desc}>
							<p>
								Description :
								{' '}
								{data.description}
							</p>
						</div>
					</div>

					<div className={styles.modified}>
						<div style={{ paddingRight: '4px' }}>
							Last Modified :
							{' '}
							{data.updated_at ? format(data.updated_at, 'yyyy-MMM-dd') : '___'}
						</div>

						<div>
							Last Modified By :
							{' '}
							{data.modified_by ? data.modified_by : '___'}
						</div>
					</div>
				</div>

				<div className={styles.score_container}>
					<h3 style={{ color: '#4f4f4f' }}>Scores</h3>
					<div className={styles.score_badge}>
						{
							Object.values(MEDAL_DETAILS_MAPPING).map((item) => {
								const { name = '', detailObj = {} } = item;
								return (
									<BadgeCard
										data={{ ...detailObj }}
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
