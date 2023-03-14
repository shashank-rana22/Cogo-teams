import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	return (
		<div className={styles.container}>
			<div>
				<p style={{ fontSize: '18px' }}>
					Current Configuration :&nbsp;
					<b>Version 2</b>
				</p>
				<div className={styles.left_container}>
					<p style={{ fontSize: '14px', marginRight: '34px' }}>
						Published on :&nbsp;
						<b>31st January, 2023</b>
					</p>
					<p style={{ fontSize: '14px' }}>
						Published by
						{' '}
						{' '}
						<b>CogoParth</b>
					</p>
				</div>
			</div>
			<div className={styles.button_container}>
				<Button
					onClick={() => { router.push('/allocation/kam-expertise/view-badges'); }}
					size="lg"
					themeType="secondary"
					className={styles.button}
				>
					View Badges

				</Button>
				<Button
					onClick={() => { router.push('/allocation/kam-expertise/events'); }}
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
					View All Configs

				</Button> */}

				<Button
					onClick={() => { router.push('/allocation/kam-expertise/configurations'); }}
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
