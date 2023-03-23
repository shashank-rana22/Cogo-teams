import { IcMExpand } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';

import styles from './styles.module.css';

function Header() {
	const { profile: { user } } = useSelector((state) => state);

	const { name } = user;

	const handleMinimizeTest = () => {
		if (document.fullscreen) {
			if (document?.exitFullscreen) {
				document?.exitFullscreen();
			} else if (document?.webkitExitFullscreen) { /* Safari */
				document?.webkitExitFullscreen();
			} else if (document?.msExitFullscreen) { /* IE11 */
				document?.msExitFullscreen();
			}
		}
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.instructions}>Test Instructions</div>
			<div className={styles.greeting}>
				Hi,
				{' '}
				<b>{name}</b>
			</div>

			<div className={styles.expand_icon}>
				<IcMExpand onClick={handleMinimizeTest} width={20} height={20} />
			</div>
		</div>
	);
}

export default Header;
