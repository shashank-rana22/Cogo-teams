import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function KamExpertise() {
	const router = useRouter();

	return (
		<section className={styles.container} id="kam_expertise_container">
			<section className={styles.heading_container}>
				KAM Expertise
			</section>

			<Button
				onClick={() => router.push('/allocation/kam-expertise/view-badges')}
				themeType="primary"
			>
				View Badges
			</Button>

			<Button
				onClick={() => router.push('/allocation/kam-expertise/view-all-configs')}
				themeType="secondary"
			>
				View all configs
			</Button>
		</section>

	);
}

export default KamExpertise;
