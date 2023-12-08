import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function NotFound() {
	const router = useRouter();

	const handleBack = () => {
		router.push('/cogo-one/omni-channel');
	};

	return (
		<div className={styles.component}>
			<div className={styles.world_map}>
				<div className={styles.text_container}>
					<div className={styles.title}>404</div>
					<div className={styles.description}>Looks like you are off course</div>
					<div className={styles.button_container}>
						<Button onClick={handleBack} themeType="accent">
							Get back to base
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NotFound;
