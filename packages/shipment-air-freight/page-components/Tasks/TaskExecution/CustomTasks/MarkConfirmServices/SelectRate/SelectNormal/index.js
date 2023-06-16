import { Button } from '@cogoport/components';

import styles from './styles.module.css';

const CONFIRM_RATE_STEP = 2;
function SelectNormal({
	setStep,
}) {
	return (
		<div className={styles.mode_wrapper}>
			<div className={styles.label}>Mode of booking</div>
			<div className={styles.value}>Normal Booking</div>
			<div className={styles.button_wrap}>
				<Button
					onClick={() => {
						setStep(CONFIRM_RATE_STEP);
					}}
				>
					Proceed With Normal Booking
				</Button>
			</div>
		</div>
	);
}

export default SelectNormal;
