import { ProgressBar, Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const Badge = {
	title        : 'Nautical Ninja',
	DateAchieved : 'Jult 22 2022',
	type         : 'Silver',
	// type         : 'Mastery',
	NextBadge    : 'Bronze',
	url          : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/nautical_ninja_bronze.svg',
	stars        : 1,
	rarity       : 80,
	NumberofKAMs : 24,
	description:
  'This is a quick desciption of what this badge is and why the KAM should be proud to be earning it',
};

const star_url = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/star-icon.svg';

function MasteryBadgeItem() {
	return (
		<div className={styles.mastery_badge_container}>
			<img className={styles.mastery_badge} src={Badge.url} alt="" />
			<div className={styles.star_container}>
				<img className={styles.smallstar} src={star_url} alt="" />
				<img className={styles.smallstar} src={star_url} alt="" />
				<img className={styles.smallstar} src={star_url} alt="" />
			</div>
		</div>
	);
}

function BadgeDescription(props) {
	// Todo: loadingState logic
	if (false) {
		return (
			<div className={styles.container}>
				<p className={styles.heading}>
					<Placeholder width="160px" height="20px" style={{ marginTop: '8px' }} />
				</p>
				<div className={styles.display_flex}>
					<div className={styles.badge_container}>
						<Placeholder width="140px" height="180px" style={{ marginTop: '8px' }} />
					</div>

					<div className={styles.details}>
						<div className={styles.lable_value_container}>
							<div className={styles.lable_value}>
								<Placeholder width="120px" height="20px" />
								<Placeholder width="120px" height="20px" style={{ marginTop: '8px' }} />
							</div>
							{Badge.type !== 'Mastery' && (
								<div className={styles.lable_value}>
									<Placeholder width="120px" height="20px" />
									<Placeholder width="120px" height="60px" style={{ marginTop: '8px' }} />
								</div>
							)}
						</div>
						{
							Array(3).fill('').map(() => (
								<div className={styles.lable_value}>
									<Placeholder width="200px" height="20px" />
									<Placeholder width="100%" height="20px" style={{ marginTop: '4px' }} />
								</div>
							))
						}
					</div>
				</div>

				{Badge.type !== 'Mastery' && (
					<div>
						<Placeholder width="100%" height="20px" style={{ marginTop: '16px', marginBottom: '16px' }} />

					</div>
				)}
				{
				Badge.type === 'Mastery'
				&& (
					<div className={styles.mastery_unlock}>
						<p className={styles.lable}>
							{' '}
							<Placeholder width="240px" height="20px" />
						</p>
						<div className={styles.flex_container}>
							{
							Array(3).fill('').map(() => (
								<div className={styles.mastery_badge_container}>
									<Placeholder width="80px" height="80px" />
								</div>
							))
						}
						</div>
					</div>
				)
}
			</div>
		);
	}
	return (

		<section>
			<div className={styles.container}>
				<p className={styles.heading}>
					{Badge.title}
					{' '}
					{Badge.type}
					{' '}
					{Badge.stars}
				</p>
				<div className={styles.display_flex}>
					<div className={styles.badge_container}>
						<img className={styles.main_badge} src={Badge.url} alt="" />
						<div className={styles.stars}>
							{Array(3).fill('').map(() => (
								<div><img className={styles.star} src={star_url} alt="" /></div>
							))}
						</div>
					</div>

					<div className={styles.details}>
						<div className={styles.lable_value_container}>
							<div className={styles.lable_value}>
								<p className={styles.lable}>Achievement Date</p>
								<p className={styles.value}>{Badge.DateAchieved}</p>
							</div>
							{Badge.type !== 'Mastery' && (
								<div className={styles.lable_value}>
									<p className={styles.lable}>Next unlock</p>
									<div className={styles.next_badge}>
										<img className={styles.small_badge} src={Badge.url} alt="" />
										<p className={styles.value}>
											{Badge.NextBadge}
											{' '}
											{Badge.stars === 3 ? 1 : Badge.stars + 1}
										</p>
									</div>
								</div>
							)}
						</div>
						<div className={styles.lable_value}>
							<p className={styles.lable}>Number of KAMs with badge</p>
							<p className={styles.value}>{Badge.NumberofKAMs}</p>
						</div>

						<div className={styles.lable_value}>
							<p className={styles.lable}>Rarity</p>
							<p className={styles.value}>
								{Badge.rarity}
								%
							</p>
						</div>
						<div className={styles.description_container}>
							<p className={styles.lable}>Description</p>
							<p className={styles.value}>{Badge.description}</p>
						</div>

					</div>
				</div>

				{Badge.type !== 'Mastery' && (
					<div className={styles.progressbar_container}>
						<ProgressBar className={styles.progressbar} progress={60} uploadText="Bronze" />
						<ProgressBar className={styles.progressbar} progress={0} uploadText="Silver" />
						<ProgressBar className={styles.progressbar} progress={0} uploadText="Gold" />
					</div>
				)}
				{Badge.type === 'Mastery' && (
					<div className={styles.mastery_unlock}>
						<h6 className={styles.lable}>Badge unlocked for mastery</h6>
						<div className={styles.flex_container}>
							<MasteryBadgeItem />
							<MasteryBadgeItem />
							<MasteryBadgeItem />
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

export default BadgeDescription;
