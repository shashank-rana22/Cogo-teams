import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Header({
	setShowForm = () => {},
}) {
	return (
		<div className={styles.top}>
			POC Details

			<div className={styles.btn}>

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
