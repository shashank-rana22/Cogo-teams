import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	// Todo make the hardcoded part dynamic
	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<div style={{ fontSize: '18px', marginBottom: '4px' }}>
					Current Configuration :&nbsp;
					<b>Version 2</b>
				</div>

				<div className={styles.audits_data}>
					<div style={{ marginRight: '16px' }}>
						Published on :
						{' '}
						<b>31st January, 2023</b>
					</div>

					<div>
						Published by :
						{' '}
						<b>CogoParth</b>
					</div>
				</div>
			</div>

			<div className={styles.button_container}>
				<Button
					onClick={() => router.push('/allocation/kam-expertise/view-badges')}
					size="lg"
					themeType="secondary"
					className={styles.button}
				>
					View Badges
				</Button>

				<Button
					onClick={() => router.push('/allocation/kam-expertise/events')}
					size="lg"
					themeType="secondary"
					className={styles.button}
				>
					View Events
				</Button>

				{/* <Button
					// onClick={() => { router.push('/allocation/kam-expertise/'); }}
					size="lg"
					themeType="secondary"
					className={styles.button}
				>
				// Todo check if showing it is possible
					View All Configs
				</Button> */}

				<Button
					onClick={() => router.push('/allocation/kam-expertise/configurations')}
					size="lg"
					themeType="primary"
					className={styles.button}
				>
					Configure Now
				</Button>
			</div>
		</div>
	);
}

export default Header;
