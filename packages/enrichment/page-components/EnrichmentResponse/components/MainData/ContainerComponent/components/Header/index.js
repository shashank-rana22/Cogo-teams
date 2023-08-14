import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Header({
	actionType = '',
	activeTab = '',
	setDetailsForm = () => {},
	loadingResponses = false,
}) {
	return (
		<div className={styles.top}>
			<span>
				{startCase(activeTab)}
				{' '}
				Details

			</span>

			<div className={styles.btn}>

				<Button
					size="md"
					themeType="accent"
					disabled={actionType === 'view' || loadingResponses}
					role="presentation"
					style={{ marginLeft: '8px' }}
					onClick={() => setDetailsForm(() => ({
						show        : true,
						type        : 'create',
						initialData : {},
					}))}
				>
					Add
					{' '}
					{startCase(activeTab)}
				</Button>
			</div>
		</div>
	);
}

export default Header;
