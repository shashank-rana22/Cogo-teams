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

			<div className={styles.create_button_container}>
				<Button
					onClick={() => router.push('/allocation/kam-expertise/configurations')}
					themeType="primary"
				>
					Create Configuration
				</Button>
			</div>
		</section>

	);
}

export default KamExpertise;
