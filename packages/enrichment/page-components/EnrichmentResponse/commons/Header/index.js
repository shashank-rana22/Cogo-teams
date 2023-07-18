import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Header({
	setShowForm = () => {},
	actionType = '',
	activeTab = '',
}) {
	const title = startCase(activeTab);

	return (
		<div className={styles.top}>
			{title}
			{' '}
			Details

			<div className={styles.btn}>

				<Button
					size="md"
					themeType="accent"
					disabled={actionType === 'view'}
					role="presentation"
					style={{ marginLeft: '8px' }}
					onClick={() => setShowForm(activeTab)}
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
