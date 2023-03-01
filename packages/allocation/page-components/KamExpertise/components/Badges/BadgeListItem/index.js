import { Button, Placeholder } from '@cogoport/components';
import { useState } from 'react';
// import useBadgeConfiguration from '../../../hooks/useBadgeConfiguration';
// import useBadgeConfigurationAttributes from '../../../hooks/useBadgeConfigurationAttributes';
// import GetCard from '../CreateBadge/getCard';

import BadgeCard from './BadgeCard';
import styles from './styles.module.css';

function BadgeListItem() {
	// const [openModal, setOpenModal] = useState(false);
	// const [medalType, setMedalType] = useState('');

	const [ruleType, setRuleType] = useState(1);

	// const {
	// 	onCheckPublish, loadingCheckPublishability,
	// } = useBadgeConfiguration();
	// // } = useBadgeConfigurationAttributes();

	// const handleClick = (e) => {
	// 	setOpenModal((pv) => !pv);
	// 	setMedalType(e);
	// };

	if (true) {
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
							{/* <BadgeCard
								medalType="Bronze"
								score="2000"
								img_url="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/nautical_ninja_bronze.svg"
								isLast={false}
							/> */}
							{/* <BadgeCard
								medalType="Silver"
								score="5000"
								img_url="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/silver_badge.svg"
								isLast={false}
							/> */}
							{/* <BadgeCard
								medalType="Gold"
								score="9000"
								img_url="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/gold_ninja_badge.svg"
							/> */}
							<Placeholder
								height="120px"
								width="220px"
								style={{ marginRight: '20px', marginTop: '20px' }}
							/>
							<Placeholder
								height="120px"
								width="220px"
								style={{ marginRight: '20px', marginTop: '20px' }}
							/>

							<Placeholder
								height="120px"
								width="220px"
								style={{ marginRight: '20px', marginTop: '20px' }}
							/>

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
					#000
					{ruleType}
				</p>
				<Button themeType="secondary">Edit</Button>
			</div>

			<div className={styles.main_card}>

				<div className={styles.card_description}>
					<div className={styles.badge_name_tag}>
						<p>
							Badge Name
							{' '}
							:
							{'  '}
							<b>
								Nautical Ninja
							</b>
						</p>
					</div>

					<div className={styles.desc}>
						<p>Description : Surface Stuff</p>
					</div>

					<div className={styles.modified}>
						<p>Last Modified : 31/September/2023</p>
						<p>Last Modified By : Ankur Verma</p>
					</div>
				</div>

				<div className={styles.score_container}>
					<h3 style={{ color: '#4f4f4f' }}>Scores</h3>
					<div className={styles.score_badge}>
						<BadgeCard
							medalType="Bronze"
							score="2000"
							img_url="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/nautical_ninja_bronze.svg"
							isLast={false}
						/>
						<BadgeCard
							medalType="Silver"
							score="5000"
							img_url="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/silver_badge.svg"
							isLast={false}
						/>
						<BadgeCard
							medalType="Gold"
							score="9000"
							img_url="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/gold_ninja_badge.svg"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BadgeListItem;
