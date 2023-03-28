import { ProgressBar, Placeholder } from '@cogoport/components';
import { isEmpty, startCase, format } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';

import styles from './styles.module.css';

function BadgeDescription(props) {
	const { badgeDetailloading = false, badgeDetail } = props;

	const { badge_details = [], next_badge = [] } = badgeDetail || {};

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

							<div className={styles.lable_value}>
								<Placeholder width="160px" height="80px" />
							</div>
						</div>

						{
							[1, 2].fill('').map(() => (
								<div className={styles.lable_value}>
									<Placeholder width="100%" height="32px" />
									<Placeholder width="100%" height="32px" style={{ marginTop: '8px' }} />
								</div>
							))
						}
					</div>
				</div>

				<div>
					<Placeholder width="100%" height="40px" style={{ margin: '16px 0' }} />
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

		<section>
			<div className={styles.container}>
				<p className={styles.heading}>
					{badge_details?.[0]?.badge_name}
				</p>

				<div className={styles.display_flex}>
					<div className={styles.badge_container}>
						<img
							className={styles.main_badge}
							src={badgeDetail.url}
							alt="Main Badge"
						/>

						{/* //Todo: stars arent available in the response */}
						{/* <div className={styles.stars}>
							{[1, 2, 3].map((item) => (
								<div key={item}>
									<IcCStar width={10} stroke="#FFDF33" />
								</div>
							))}
						</div> */}
					</div>

					<div className={styles.details}>
						<div className={styles.details_header}>
							<div className={styles.lable_value}>
								<p className={styles.lable}>Achievement Date</p>

								<p className={styles.value}>
									{badgeDetail.achievement_date
										? format(badgeDetail?.achievement_date, 'dd MMM YYYY')
										: 'Not achieved yet'}
								</p>
							</div>

							{ !isEmpty(next_badge) && (
								<div className={styles.next_unlock}>
									<p className={styles.lable}>Next unlock</p>

									<div className={styles.next_badge}>
										<img
											className={styles.small_badge}
											src={next_badge.image_url}
											alt=""
										/>

										<p className={styles.value}>
											{next_badge.badge_name}
											{/* //Todo: stars arent available in the response */}
										</p>
									</div>
								</div>
							)}
						</div>

						<div className={styles.lable_value}>
							<p className={styles.lable}>Number of KAMs with badge</p>

							<p className={styles.value}>{badgeDetail.kam_badge_count}</p>
						</div>

						<div className={styles.lable_value}>
							<p className={styles.lable}>Rarity</p>

							<p className={styles.value}>
								{badgeDetail.rarity}
								%
							</p>
						</div>

						<div className={styles.description_container}>
							<p className={styles.lable}>Description</p>

							<p className={styles.value}>{badge_details?.[0]?.description}</p>
						</div>

					</div>
				</div>

				<div className={styles.progressbar_container}>
					{
						badge_details.map((item, i) => {
							const progress = (100 - item.percentage_score_required);
							return (
								i < 3
									? (
										<ProgressBar
											className={styles.progressbar}
											progress={progress > 0 ? progress : 0}
											uploadText={startCase(item?.medal || '')}
										/>
									)
									: null
							);
						})
					}
				</div>
			</div>
		</section>
	);
}

export default BadgeDescription;
