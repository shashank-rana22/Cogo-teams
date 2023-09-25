import { useSelector } from '@cogoport/store';

import styles from './styles.module.css';

function ProgreeBar() {
	const { user } = useSelector(({ profile }) => profile);

	return (
		<div className={styles.container}>
			<div>
				<p className={styles.username}>{user?.name || ''}</p>
				<p className={styles.points_till_now}>
					Points till now:
					{' '}
					<b>1250</b>
				</p>
			</div>
		</div>
	);
}

export default ProgreeBar;
