import { useSelector } from '@cogoport/store';

import styles from './styles.module.css';

function Header() {
	const { profile: { user } } = useSelector((state) => state);

	const { name } = user;

	return (
		<div className={styles.main_container}>
			<div className={styles.instructions}>Test Instructions</div>
			<div className={styles.greeting}>
				Hi,
				{' '}
				<b>{name}</b>
			</div>
		</div>
	);
}

export default Header;
