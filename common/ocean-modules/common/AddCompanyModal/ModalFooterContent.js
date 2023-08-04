import { Button } from '@cogoport/components';

import styles from './styles.module.css';

export function ModalFooterContent({ onClose = () => {}, createLoading = false, formSubmit = () => {} }) {
	return (
		<div className={styles.actions}>
			<Button
				themeType="secondary"
				onClick={onClose}
				disabled={createLoading}
			>
				Cancel
			</Button>

			<Button
				themeType="accent"
				onClick={formSubmit}
				disabled={createLoading}
			>
				Submit
			</Button>
		</div>
	);
}
