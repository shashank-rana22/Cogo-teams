import { InputController, CheckboxController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

function TermsConditions({ control = {}, errors = {}, termsChecked = false, is_complete = false }) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>TERMS & CONDITIONS</div>
			<div className={styles.sub_title}>Please read carefully</div>
			<div className={styles.content_sub_container}>
				<div className={styles.content_text_container}>
					<CheckboxController
						className={styles.Checkbox}
						name="termsAcceptance"
						control={control}
						checked={termsChecked}
						disabled={is_complete}
					/>
					<div className={styles.content}>
						<p>
							The details you provide guide critical decisions,
							making accuracy paramount. By submitting this form, you
							affirm the accuracy of all information.
							Any discrepancies could lead to losses for which youll bear full responsibility.
							This self-attestation is legally binding.
						</p>
						<br />
						<p>
							Enter your Full Name, confirm your understanding and commitment to these terms.
						</p>
						{!termsChecked ? <span className={styles.error}>*required</span> : null}
					</div>
				</div>

				<div className={styles.name_main_container}>
					<div className={styles.full_name_text}>
						Full Name
					</div>

					<div className={styles.name_input_container}>
						<InputController
							size="sm"
							placeholder="Enter your full name"
							control={control}
							name="name"
							rules={{ required: 'this is required' }}
							disabled={is_complete}
						/>
						{errors.name ? <span className={styles.error}>*required</span> : null}
					</div>
				</div>
			</div>
		</div>
	);
}

export default TermsConditions;
