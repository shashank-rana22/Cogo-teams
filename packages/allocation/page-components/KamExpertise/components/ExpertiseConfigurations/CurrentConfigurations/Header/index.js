import { Button } from '@cogoport/components';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.heading}>
					Live Configuration&nbsp;:&nbsp;
					<strong>Version 3</strong>
				</div>

				<div className={styles.sub_container}>
					<div className={styles.left_text}>
						Published On&nbsp;:&nbsp;
						<strong>{format(new Date(), 'dd MMM yyyy')}</strong>
					</div>

					<div>
						Published by&nbsp;:&nbsp;
						<strong>Cogoparth</strong>
					</div>
				</div>
			</div>

			<Button>
				Create New Configuration
			</Button>
		</div>
	);
}

export default Header;
