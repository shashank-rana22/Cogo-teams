import Badges from './Badges';
import Partners from './Partners';
import Services from './Services';
import styles from './styles.module.css';
import TaggedAgent from './TaggedAgents';

function Details({
	detailsData, badgeListLoading, userBadges, profileBadgeRefetch,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.card_details}>
				<Partners detailsData={detailsData} />
			</div>

			<div className={styles.detail_container}>
				<div className={styles.card_details}>
					<Services detailsData={detailsData} />
				</div>

				<div className={styles.tagged_card_details}>
					<TaggedAgent detailsData={detailsData} />
				</div>
			</div>

			<div className={styles.badge_details}>
				<Badges
					badgeListLoading={badgeListLoading}
					userBadges={userBadges}
					profileBadgeRefetch={profileBadgeRefetch}
				/>
			</div>
		</div>

	);
}

export default Details;
