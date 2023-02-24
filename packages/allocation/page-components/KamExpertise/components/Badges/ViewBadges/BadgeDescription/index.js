import { ProgressBar } from '@cogoport/components';

import styles from './styles.module.css';

function BadgeDescription() {
	const Badge = {
		title        : 'Nautical Ninja',
		DateAchieved : 'Jult 22 2022',
		type         : 'Silver',
		NextBadge    : 'Bronze',
		url          : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/nautical_ninja_bronze.svg',
		stars        : 1,
		rarity       : 80,
		NumberofKAMs : 24,
		description:
      'This is a quick desciption of what this badge is and why the KAM should be proud to be earning it',
	};

	const starUrl = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/star-icon.svg';

	return (
		<div className={styles.card}>
			<p className={styles.heading}>
				{Badge.title}
				{' '}
				{Badge.type}
				{' '}
				{Badge.stars}
			</p>
			<div className={styles.mainContainer}>
				<div className={styles.badgeContainer}>
					<img className={styles.mainBadge} src={Badge.url} />
					<div className={styles.starsContainer}>
						<img className={styles.star} src={starUrl} />
						<img className={styles.star} src={starUrl} />
						<img className={styles.star} src={starUrl} />
					</div>
				</div>
				<div className={styles.matterContainer}>
					<div className={styles.lableValueContainer}>
						<div className={styles.lableValue}>
							<h6 className={styles.lable}>Achievement Date</h6>
							<p className={styles.value}>{Badge.DateAchieved}</p>
							<h6 className={styles.lable}>Number of KAMs with badge</h6>
							<p className={styles.value}>{Badge.NumberofKAMs}</p>
						</div>
						{Badge.type != 'Mastery' && (
							<div className={styles.lableValue}>
								<h6 className={styles.lable}>Next unlock</h6>
								<div className={styles.nextBadge}>
									<img className={styles.smallBadge} src={Badge.url} />
									<p className={styles.value}>
										{Badge.NextBadge}
										{' '}
										{Badge.stars == 3 ? 1 : Badge.stars + 1}
									</p>
								</div>
							</div>
						)}
					</div>
					<div className={styles.lableValue}>
						<h6 className={styles.lable}>Rarity</h6>
						<p className={styles.value}>
							{Badge.rarity}
							%
						</p>
					</div>
					<div className={styles.descriptionContainer}>
						<h6 className={styles.lable}>Description</h6>
						<p className={styles.value}>{Badge.description}</p>
					</div>
				</div>
			</div>
			{Badge.type !== 'Mastery' && (
				<div className={styles.progressBar}>
					<ProgressBar progress={60} />
				</div>
			)}
			{Badge.type === 'Mastery' && (
				<div className={styles.MasteryUnlock}>
					<h6 className={styles.lable}>Badge unlocked for mastery</h6>
					<div className={styles.flexContainer}>
						<div className={styles.MasterybadgeContainer}>
							<img className={styles.MasteryBadge} src={Badge.url} />
							<div className={styles.starsContainer}>
								<img className={styles.Smallstar} src={starUrl} />
								<img className={styles.Smallstar} src={starUrl} />
								<img className={styles.Smallstar} src={starUrl} />
							</div>
						</div>
						<div className={styles.MasterybadgeContainer}>
							<img className={styles.MasteryBadge} src={Badge.url} />
							<div className={styles.starsContainer}>
								<img className={styles.Smallstar} src={starUrl} />
								<img className={styles.Smallstar} src={starUrl} />
								<img className={styles.Smallstar} src={starUrl} />
							</div>
						</div>
						<div className={styles.MasterybadgeContainer}>
							<img className={styles.MasteryBadge} src={Badge.url} />
							<div className={styles.starsContainer}>
								<img className={styles.Smallstar} src={starUrl} />
								<img className={styles.Smallstar} src={starUrl} />
								<img className={styles.Smallstar} src={starUrl} />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default BadgeDescription;
