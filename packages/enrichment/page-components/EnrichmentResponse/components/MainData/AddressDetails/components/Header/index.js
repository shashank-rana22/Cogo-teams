import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Header({
	setShowForm = () => {},
}) {
	return (
		<div className={styles.top}>
			Address Details

			<div className={styles.btn}>

				<Button
					size="md"
					themeType="accent"
					role="presentation"
					style={{ marginLeft: '8px' }}
					onClick={() => { setShowForm({ title: 'addressForm' }); }}
				>
					Add Address
				</Button>
			</div>
		</div>
	);
}

export default Header;
