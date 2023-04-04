import { Button, ProgressBar } from '@cogoport/components';
import { IcMUserAllocations } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Header({ name = '' }) {
	// const [progress, setProgress] = useState('60');

	return (
		<div className={styles.container}>
			<div className={styles.name_container}>
				<div className={styles.avatar}><IcMUserAllocations /></div>
				<div className={styles.name_details}>
					<div className={styles.name_text}>
						Hello
						{' '}
						<strong>{name}</strong>
						,
						{' '}
					</div>
					<div className={styles.welcome_text}>Welcome to Cogoport. </div>
				</div>
			</div>
			<div className={styles.profile_container}>
				<div className={styles.progress_bar}>
					<ProgressBar progress={60} />
				</div>
				<Button size="lg" themeType="accent">
					Complete Profile
				</Button>
			</div>
		</div>
	);
}

export default Header;
