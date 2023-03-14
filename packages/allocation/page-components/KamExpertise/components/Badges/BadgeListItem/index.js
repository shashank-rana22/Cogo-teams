import { Button, Placeholder } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';

import BadgeCard from './BadgeCard';
import styles from './styles.module.css';

function BadgeListItem(props) {
	const { data, index, loading, setToggleScreen, setBadgeListData, listRefetch } = props;
	const { badge_details = [] } = data;
	const handleEdit = () => {
		setBadgeListData(data);
		setToggleScreen(3);
	};

	if (loading) {
		return (
			<div className={styles.container}>
				<div className={styles.number_tag}>
					<Placeholder width="100px" height="20px" />
					<Placeholder width="80px" height="28px" />
				</div>

				<div className={styles.main_card}>
					<div className={styles.card_description}>
						<div>
							<Placeholder width="180px" height="20px" />
						</div>

						<div style={{ marginTop: '12px' }}>
							<Placeholder width="180px" height="20px" />
						</div>

						<div className={styles.modified}>
							<Placeholder width="236px" height="20px" />
							<Placeholder width="236px" height="20px" />
						</div>
					</div>

					<div className={styles.score_container}>
						<Placeholder width="120px" height="24px" />
						<div className={styles.score_badge}>
							{[1, 2, 3].map((skeletonItem) => (
								<Placeholder
									key={skeletonItem}
									height="120px"
									width="220px"
									style={{ marginRight: '20px', marginTop: '20px' }}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

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
							{format(data.updated_at, 'yyyy-MMM-dd')}
						</div>

						{/* //! need from backend */}
						{/* <div>Last Modified By :</div> */}
					</div>
				</div>

				<div className={styles.score_container}>
					<h3 style={{ color: '#4f4f4f' }}>Scores</h3>
					<div className={styles.score_badge}>
						{
							badge_details.map((badge, i) => (
								<BadgeCard
									data={badge}
									medal={startCase(badge.medal || '')}
									badgeListData={data}
									isLast={i === badge_details.length - 1}
									listRefetch={listRefetch}
								/>
							))
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default BadgeListItem;
