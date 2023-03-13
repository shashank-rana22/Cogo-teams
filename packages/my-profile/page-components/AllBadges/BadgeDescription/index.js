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

function BadgeDescription(props) {
	// Todo: loadingState logic
	if (false) {
		return (
			<div className={styles.card}>
				<p className={styles.heading}>
					<Placeholder width="160px" height="20px" style={{ marginTop: '8px' }} />
				</p>
				<div className={styles.main_container}>
					<div className={styles.badge_container}>
						<Placeholder width="140px" height="180px" style={{ marginTop: '8px' }} />
					</div>

					<div className={styles.matter_container}>
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
						<div className={styles.lable_value}>
							<Placeholder width="120px" height="20px" />
							<Placeholder width="120px" height="20px" style={{ marginTop: '8px' }} />
						</div>

						<div className={styles.lable_value}>
							<Placeholder width="120px" height="20px" />
							<Placeholder width="120px" height="20px" style={{ marginTop: '8px' }} />

						</div>
						<div className={styles.description_container}>
							<Placeholder width="120px" height="20px" />
							<Placeholder width="120px" height="20px" />
						</div>

					</div>
				</div>

				{Badge.type !== 'Mastery' && (
					<div>
						<Placeholder width="240px" height="20px" style={{ marginTop: '16px', marginBottom: '16px' }} />

					</div>
				)}
				{
				Badge.type === 'Mastery'
				&& (
					<div className={styles.mastery_unlock}>
						<h6 className={styles.lable}>
							{' '}
							<Placeholder width="240px" height="20px" />
						</h6>
						<div className={styles.flex_container}>
							<div className={styles.mastery_badge_container}>

								<Placeholder width="80px" height="80px" />

							</div>
							<div className={styles.mastery_badge_container}>

								<Placeholder width="80px" height="80px" />

							</div>
							<div className={styles.mastery_badge_container}>

								<Placeholder width="80px" height="80px" />

							</div>
						</div>
					</div>
				)
}
			</div>
		);
	}
	return (

		<section>
			<div className={styles.card}>
				<p className={styles.heading}>
					{Badge.title}
					{' '}
					{Badge.type}
					{' '}
					{Badge.stars}
				</p>
				<div className={styles.main_container}>
					<div className={styles.badge_container}>
						<img className={styles.main_badge} src={Badge.url} alt="" />
						<div className={styles.stars_container}>
							<img className={styles.star} src={star_url} alt="" />
							<img className={styles.star} src={star_url} alt="" />
							<img className={styles.star} src={star_url} alt="" />
						</div>
					</div>

					<div className={styles.matter_container}>
						<div className={styles.lable_value_container}>
							<div className={styles.lable_value}>
								<h6 className={styles.lable}>Achievement Date</h6>
								<p className={styles.value}>{Badge.DateAchieved}</p>
							</div>
							{Badge.type !== 'Mastery' && (
								<div className={styles.lable_value}>
									<h6 className={styles.lable}>Next unlock</h6>
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
							<h6 className={styles.lable}>Number of KAMs with badge</h6>
							<p className={styles.value}>{Badge.NumberofKAMs}</p>
						</div>

						<div className={styles.lable_value}>
							<h6 className={styles.lable}>Rarity</h6>
							<p className={styles.value}>
								{Badge.rarity}
								%
							</p>
						</div>
						<div className={styles.description_container}>
							<h6 className={styles.lable}>Description</h6>
							<p className={styles.value}>{Badge.description}</p>
						</div>

					</div>
				</div>

				{Badge.type !== 'Mastery' && (
					<div>
						<ProgressBar className={styles.bar} progress={60} />
					</div>
				)}
				{Badge.type === 'Mastery' && (
					<div className={styles.mastery_unlock}>
						<h6 className={styles.lable}>Badge unlocked for mastery</h6>
						<div className={styles.flex_container}>
							<div className={styles.mastery_badge_container}>
								<img className={styles.mastery_badge} src={Badge.url} alt="" />
								<div className={styles.star_container}>
									<img className={styles.smallstar} src={star_url} alt="" />
									<img className={styles.smallstar} src={star_url} alt="" />
									<img className={styles.smallstar} src={star_url} alt="" />
								</div>
							</div>
							<div className={styles.mastery_badge_container}>
								<img className={styles.mastery_badge} src={Badge.url} alt="" />
								<div className={styles.star_container}>
									<img className={styles.smallstar} src={star_url} alt="" />
									<img className={styles.smallstar} src={star_url} alt="" />
									<img className={styles.smallstar} src={star_url} alt="" />
								</div>
							</div>
							<div className={styles.mastery_badge_container}>
								<img className={styles.mastery_badge} src={Badge.url} alt="" />
								<div className={styles.star_container}>
									<img className={styles.smallstar} src={star_url} alt="" />
									<img className={styles.smallstar} src={star_url} alt="" />
									<img className={styles.smallstar} src={star_url} alt="" />
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

export default BadgeDescription;
