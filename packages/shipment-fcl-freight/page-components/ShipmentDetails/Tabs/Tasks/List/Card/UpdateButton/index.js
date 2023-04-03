import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function UpdateButton({ task = {}, handleClick = () => {}, hideButton = false }) {
	console.log('task', task, handleClick);

	if (hideButton) {
		return null;
	}
	return (
		<div className={styles.container}>
			<Button className={styles.upload_button}>
				Update
			</Button>
		</div>
	);
}

export default UpdateButton;
