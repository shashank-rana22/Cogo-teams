// import { Button, ProgressBar } from '@cogoport/components';
import { IcMUserAllocations } from '@cogoport/icons-react';
// import { useRouter } from '@cogoport/next';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function Header({ name = '', picture = '' }) {
	const { t } = useTranslation(['welcome']);
	// const [progress, setProgress] = useState('60');

	// const { push } = useRouter();

	return (
		<div className={styles.container}>
			<div className={styles.name_container}>

				{picture ? (
					<img src={picture} alt="profile" className={styles.profile_picture} />
				) : (
					<div className={styles.avatar}>
						<IcMUserAllocations />
						{' '}
					</div>
				)}

				<div className={styles.name_details}>

					<div className={styles.name_text}>
						{t('welcome:hello_text')}
						{' '}
						<strong>{name}</strong>
						,
						{' '}
					</div>

					<div className={styles.welcome_text}>
						{t('welcome:welcome_message')}
						{' '}
					</div>
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
