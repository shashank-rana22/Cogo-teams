import { Button, Placeholder } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';

// import { useState } from 'react';

import BadgeCard from './BadgeCard';
import styles from './styles.module.css';

function BadgeListItem({ data, index }) {
	//
	// !(loading) true/false
	//
	if (false) {
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
	const { badge_details = [] } = data;
	return (
		<div className={styles.container}>
			<div className={styles.number_tag}>
				<p>
					#
					{index + 1}
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

					<div className={styles.modified}>
						<p>
							Last Modified :
							{' '}
							{format(data.updated_at, 'yyyy-MMM-dd')}
						</p>

						{/* // needs changes */}
						<p>Last Modified By : Ankur Verma</p>
					</div>
				</div>

				<div className={styles.score_container}>
					<h3 style={{ color: '#4f4f4f' }}>Scores</h3>
					<div className={styles.score_badge}>
						{
							badge_details.map((badge, i) => (
								<BadgeCard
									medalType={startCase(badge.medal)}
									score={badge.score}
									image_url={badge.image_url}
									isLast={i === badge_details.length - 1}
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
