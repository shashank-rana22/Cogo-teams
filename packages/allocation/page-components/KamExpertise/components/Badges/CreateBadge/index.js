import { IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

function CreateBadge() {
	return (
		<div className={styles.container}>
			<div className={styles.number_tag}>
				<p>#0001</p>
				<IcMEdit />
			</div>

			<div className={styles.main_card}>

				<div className={styles.card_description}>
					<div className={styles.badge_name_tag}>
						<p>Badge Name&nbsp;:&nbsp;</p>
						<b>Nautical Ninja</b>
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

						<div className={styles.badge_card}>
							<b>Bronze : 2000 Score</b>
							<div className={styles.badge_icon}>
								<img
									src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/nautical_ninja_bronze.svg"
									alt="badge-icon"
								/>
							</div>

						</div>

						<div className={styles.badge_card}>
							<b>Silver : 5000 Score</b>
							<div className={styles.badge_icon}>
								<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/silver_badge.svg" alt="badge-icon" />
							</div>
						</div>

						<div className={styles.gold_card}>
							<b>Gold : 9000 Score</b>
							<div className={styles.badge_icon}>
								<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/gold_ninja_badge.svg" alt="badge-icon" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateBadge;
