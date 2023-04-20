import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function SelectNormal({
	setStep,
	airFreightNormalBookingCondition = false,
}) {
	return (
		<div className={styles.mode_wrapper}>
			<div className={styles.label}>Mode of booking</div>
			<div className={styles.value}>Normal Booking</div>
			<div className={styles.button_wrap}>
				<Button
					onClick={() => {
						setStep(2);
					}}
					disabled={airFreightNormalBookingCondition}
				>
					{airFreightNormalBookingCondition
						? 'Please revert rate first'
						: 'Proceed With Normal Booking'}
				</Button>
			</div>
		</div>
	);
}

export default SelectNormal;
