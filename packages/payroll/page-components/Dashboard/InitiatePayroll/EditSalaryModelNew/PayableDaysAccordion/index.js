import { InputController } from '@cogoport/forms';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

import styles from './styles.module.css';

function PayableDays({ showAccordion, control, errors, setShowAccordion, title = '', payable_days = 0, setValue }) {
	useEffect(() => {
		setValue('payable_days', payable_days);
	}, [setValue, payable_days]);
	return (
		<div className={styles.container}>
			<div
				className={styles.heading}
				aria-hidden
				onClick={() => { setShowAccordion(showAccordion === title ? '' : title); }}
			>
				<div className={styles.left_head_section}>
					<span className={styles.head1}> PAYABLE DAYS </span>
					<span className={styles.head2}>Edit payable days</span>
				</div>
				<div className={styles.right_section}>
					<div className={styles.right_head_section}>
						<span className={styles.right_head1}>{payable_days}</span>
						<span className={styles.right_head2}>Total Payable Days</span>
					</div>

					<IcMArrowDown
						width={16}
						height={16}
						className={showAccordion === 'payable' ? styles.caret_active : styles.caret_arrow}
					/>
				</div>

			</div>

			<div className={showAccordion === 'payable' ? styles.item_container : styles.item_container_closed}>
				<div className={styles.detail}>
					<div className={styles.label}>Payable Days</div>
					<InputController
						size="md"
						placeholder="Eg. bonus, travel allowance etc."
						control={control}
						name="payable_days"
						rules={{ required: 'this is required' }}
						disabled
					/>
					{errors?.payable_days ? <span className={styles.error}>*required</span> : null}
				</div>
			</div>
		</div>
	);
}

export default PayableDays;
