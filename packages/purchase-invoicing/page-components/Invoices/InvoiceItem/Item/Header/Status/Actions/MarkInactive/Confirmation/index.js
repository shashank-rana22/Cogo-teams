import { Checkbox } from '@cogoport/components';

import styles from './styles.module.css';

function Confirmation({ value = false, setValue = () => {} }) {
	return (
		<div
			role="presentation"
			className={styles.container}
			onClick={() => setValue(!value)}
		>
			<Checkbox checked={value} />

			<div className={styles.confirm_label}>
				I have gone through the invoice and wants to mark it as INACTIVE
			</div>
		</div>
	);
}

export default Confirmation;
