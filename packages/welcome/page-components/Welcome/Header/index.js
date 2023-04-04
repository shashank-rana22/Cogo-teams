// import { Button, ProgressBar } from '@cogoport/components';
import { IcMUserAllocations } from '@cogoport/icons-react';
// import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Header({ name = '' }) {
	// const [progress, setProgress] = useState('60');

	// const { push } = useRouter();

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

					<div className={styles.welcome_text}>Welcome to Cogoport Family. </div>
				</div>
			</div>
			{/* <div className={styles.profile_container}>
				<div className={styles.progress_bar}>
					<span>Profile :</span>
					<ProgressBar progress={60} />
				</div>
				<Button size="lg" themeType="accent" onClick={() => push('/my-profile', '/my-profile')}>
					Complete Profile
				</Button>
			</div> */}
		</div>
	);
}

export default Header;
