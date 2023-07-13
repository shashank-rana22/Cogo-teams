import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Header({
	setShowForm = () => {},
	title = '',
}) {
	return (
		<div className={styles.top}>
			{title}
			{' '}
			Details

			<div className={styles.btn}>

				<Button
					size="md"
					themeType="accent"
					role="presentation"
					style={{ marginLeft: '8px' }}
					onClick={() => setShowForm(true)}
				>
					Add
					{' '}
					{title}
				</Button>
			</div>
		</div>
	);
}

export default Header;
