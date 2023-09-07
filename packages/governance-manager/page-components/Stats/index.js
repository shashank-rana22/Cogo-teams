import useGetStats from '../hooks/useGetStats';

import styles from './styles.module.css';
import { STATS_IMAGE_URLS } from './utils/stats-image-urls';

function Stats({ t }) {
	const { data:stats } = useGetStats();

	return (
		<div className={styles.stats}>
			<div className={styles.pending}>
				<div className={styles.pending_left}>
					<div className={styles.circle}>
						<img
							src={STATS_IMAGE_URLS.pending}
							alt="pending"
						/>
					</div>
				</div>
				<div className={styles.pending_right}>
					<div className={styles.right_bolder}>{stats?.pending_service_approval}</div>
					<div className={styles.right_lighter}>{t('main_page_stats_pending_title')}</div>

				</div>
			</div>
			<div className={styles.onboarded_rejected}>
				<div className={styles.onboarded}>
					<div className={styles.onboarded_left}>
						<div className={styles.circle}>
							<img
								src={STATS_IMAGE_URLS.approved}
								alt="approved"
							/>
						</div>
					</div>
					<div className={styles.onboarded_right}>
						<div className={styles.right_bolder}>{stats?.approved_service_approval}</div>
						<div className={styles.right_lighter}>{t('main_page_stats_onboarded_title')}</div>
					</div>
				</div>
				<div className={styles.rejected}>
					<div className={styles.rejected_left}>
						<div className={styles.circle}>
							<img
								src={STATS_IMAGE_URLS.rejected}
								alt="rejected"
							/>
						</div>
					</div>
					<div className={styles.rejected_right}>
						<div className={styles.right_bolder}>{stats?.rejected_service_approval}</div>
						<div className={styles.right_lighter}>{t('main_page_stats_rejected_title')}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Stats;
