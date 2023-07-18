import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function ModalContent({ modalType, onClick }) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				{modalType === 'select_user'
					? 'Select user from list below'
					: 'Invite User'}
			</div>

			<Button
				size="md"
				onClick={onClick}
				themeType={modalType === 'select_user' ? 'accent' : 'secondary'}
			>
				{modalType === 'select_user'
					? 'INVITE'
					: 'Back'}
			</Button>
		</div>
	);
}

export default ModalContent;
