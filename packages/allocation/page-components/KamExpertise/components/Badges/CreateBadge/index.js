// import { Select, Input } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
// import { useState } from 'react';

import styles from './styles.module.css';

// const OPTIONS = [{
// 	label : 'Gold',
// 	value : 'gold',
// },
// {
// 	label : 'Bronze',
// 	value : 'bronze',
// },

// ];

function CreateBadge() {
	// const [value, setValue] = useState('');

	return (
		<>
			{/* <div style={{ padding: 16, width: 'fit-content' }}>
				<Select
					value={value}
					onChange={(val) => setValue(val)}
					placeholder="Select Books"
					options={OPTIONS}
					isClearable
				/>
			</div> */}

			<div className={styles.container}>
				<div className={styles.number_tag}>
					<p>#0001</p>

					<IcMEdit />
				</div>
				<div className={styles.main_card}>
					<div className={styles.card_description}>
						<div className={styles.badge_name_tag}>
							<p>Badge Name&nbsp;:&nbsp;</p>
							<div className={styles.badge_name}>
								Nautical Ninja
							</div>
						</div>

						<div className={styles.desc}>
							<p>Description :</p>
							<div className={styles.description}>
								Surface Stuff
							</div>
						</div>

						<div className={styles.modified}>
							<div className={styles.last_modified}>
								<p>Last Modified : 31/September/2023</p>
							</div>
							<div className={styles.last_modifiedBy}>
								<p>Last Modified By : Ankur Verma</p>
							</div>
						</div>
					</div>

					<div className={styles.score_container}>
						<div className={styles.badge_heading}>Scores</div>
						<div className={styles.score_badge}>

							<div className={styles.badge_card}>

								<div className={styles.badge_name}>
									Bronze&nbsp;:
									<div className={styles.badge_score}>
								&nbsp;2000 Score
									</div>
								</div>

								<div className={styles.badge_icon}>
									<img
										src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/nautical_ninja_bronze.svg"
										alt="badge-icon"
									/>
								</div>

							</div>

							<div className={styles.badge_card}>

								<div className={styles.badge_name}>
									Silver
									{' '}
									:
									<div className={styles.badge_score}>
								&nbsp;5000 Score
									</div>
								</div>

								<div className={styles.badge_icon}>
									<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/silver_badge.svg" alt="badge-icon" />
								</div>

							</div>

							<div className={styles.gold_card}>

								<div className={styles.badge_name}>
									Silver&nbsp;:
									<div className={styles.badge_score}>
								&nbsp;9000 Score
									</div>
								</div>

								<div className={styles.badge_icon}>
									<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/gold_ninja_badge.svg" alt="badge-icon" />
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default CreateBadge;
