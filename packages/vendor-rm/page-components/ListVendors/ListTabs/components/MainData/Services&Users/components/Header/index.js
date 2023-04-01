import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Header({
	setShowForm = () => {},
}) {
	return (
		<div className={styles.top}>
			Services & Users

			<div className={styles.btn}>
				<Button
					size="md"
					themeType="secondary"
					role="presentation"
					onClick={() => { setShowForm({ title: 'serviceForm' }); }}
				>
					Add Service
				</Button>

				<Button
					size="md"
					themeType="accent"
					role="presentation"
					style={{ marginLeft: '8px' }}
					onClick={() => { setShowForm({ title: 'pocForm' }); }}
				>
					Add POC
				</Button>
			</div>
		</div>
	);
}

export default Header;
