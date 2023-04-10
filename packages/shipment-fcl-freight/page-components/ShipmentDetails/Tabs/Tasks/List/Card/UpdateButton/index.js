import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function UpdateButton({ task = {}, handleClick = () => {}, hideButton = false }) {
	if (hideButton) {
		return null;
	}

	return (
		<div className={styles.container}>
			<Button className={styles.upload_button} onClick={() => handleClick(task)}>
				Update
			</Button>
		</div>
	);
}

export default UpdateButton;
