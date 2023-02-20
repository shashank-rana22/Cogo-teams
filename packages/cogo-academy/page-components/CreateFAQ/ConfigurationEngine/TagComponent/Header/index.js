import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>

			<div className={styles.buttonContainer}>
				<div className={styles.tag}>Tag</div>

				<div>
					<Button>Add Tag</Button>
				</div>
			</div>

		</div>
	);
}

export default Header;
