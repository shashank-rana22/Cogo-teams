import { Tooltip, Placeholder } from '@cogoport/components';
import { IcCStar } from '@cogoport/icons-react';
import { isEmpty, format } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';

import styles from './styles.module.css';

function MasteryDescription(props) {
	const { badgeDetailloading = false, badgeDetail } = props;

	const { badge_details = [], mastery_badge_url : unlockedBadges = [] } = badgeDetail || {};

	if (badgeDetailloading) {
		return (
			<div className={styles.container}>
				<p className={styles.heading}>
					<Placeholder width="100%" height="24px" style={{ marginTop: '8px' }} />
				</p>

				<div className={styles.display_flex}>
					<Placeholder width="180px" height="180px" style={{ marginTop: '8px' }} />

					<div className={styles.details}>
						<div className={styles.details_header}>
							<div className={styles.next_unlock}>
								<Placeholder width="160px" height="80px" />
							</div>
						</div>

						{
							[1, 2].map((item) => (
								<div className={styles.label_value} key={item}>
									<Placeholder width="100%" height="32px" />
									<Placeholder width="100%" height="32px" style={{ marginTop: '8px' }} />
								</div>
							))
						}
					</div>
				</div>

				<div className={styles.badges}>
					<Placeholder width="60%" height="32px" />

					<div className={styles.unlocked_badges}>
						{
							unlockedBadges?.map((item) => (
								<div key={item.id} className={styles.unlocked_item}>
									<Placeholder width="100px" height="100px" />
								</div>
							))
						}
					</div>
				</div>
			</div>
		);
	}

	if (isEmpty(badgeDetail)) {
		return (
			<div style={{ background: '#fff', padding: '20px 0', borderRadius: '8px' }}>
				<EmptyState
					height={220}
					width={380}
					flexDirection="column"
					emptyText="Badge Details not found"
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<p className={styles.heading}>
				{badge_details?.[0]?.badge_name || ''}
			</p>

			<div className={styles.display_flex}>
				<div className={styles.badge_container}>
					<img
						className={styles.main_badge}
						src={badgeDetail.url}
						alt="Main Badge"
					/>
				</div>

				<div className={styles.details}>
					<div className={styles.details_header}>
						<p className={styles.label}>Achievement Date</p>

						<p className={styles.value}>
							{badgeDetail.achievement_date
								? format(badgeDetail.achievement_date, 'dd MMM YYYY')
								: 'Not achieved yet'}
						</p>
					</div>

					<div className={styles.label_value}>
						<p className={styles.label}>Number of KAMs with badge</p>

						<p className={styles.value}>{badgeDetail.kam_badge_count}</p>
					</div>

					<div className={styles.label_value}>
						<p className={styles.label}>Rarity</p>

						<p className={styles.value}>
							{badgeDetail.rarity}
							%
						</p>
					</div>

					<div className={styles.description_container}>
						<p className={styles.label}>Description</p>

						<p className={styles.value}>{badge_details?.[0]?.description}</p>
					</div>
				</div>
			</div>

			<div className={styles.badges}>
				<div className={styles.label}>Badges unlocked for mastery</div>

				<div className={styles.unlocked_badges}>
					{unlockedBadges?.map((item) => (
						<Tooltip key={item.id} content={item.badge_name}>
							<div className={styles.unlocked_item}>
								<div className={styles.badge_image}>
									<img
										src={item?.image_url}
										alt=""
									/>
								</div>

								<div className={styles.stars_container}>
									{[1, 2, 3].map((itm) => (
										<div key={itm}>
											<IcCStar width={20} height={20} stroke="#FFDF33" />
										</div>
									))}
								</div>
							</div>
						</Tooltip>
					))}
				</div>
			</div>
		</div>
	);
}

export default MasteryDescription;
