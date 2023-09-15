import {
	CheckboxController,
	InputController,
} from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

function TermsConditions({ control = {}, errors = {}, is_complete = false, confirmedValues = {} }) {
//	 console.log(is_complete, 'wertyj', confirmedValues);
	return (
		<div className={styles.container}>
			<div className={styles.title}>TERMS & CONDITIONS</div>
			<div className={styles.subtitle}>Please read carefully</div>
			<div className={styles.content_sub_container}>
				<div className={styles.content_text_container}>
					<CheckboxController
						className={styles.Checkbox}
						control={control}
						value={is_complete}
						checked={is_complete}
						name="checkboxagreement"
						disabled={is_complete}
						rules={{ required: { value: true, message: '*required' } }}
					/>
					<div className={styles.content}>
						<p>
							The details you provide guide critical decisions,
							making accuracy paramount. By submitting this form, you
							affirm the accuracy of all information.
							Any discrepancies could lead to losses for which youll bear full responsibility.
							This self-attestation is legally binding.

							Enter your Full Name, confirm your understanding and commitment to these terms.
						</p>
						<br />
						<p>
							Enter your Full Name, confirm your understanding and commitment to these terms.
						</p>
						{errors?.checkboxagreement ? <div className={styles.error}>*required</div> : null}
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
							value={confirmedValues.tcFullName}
							name="Fullname"
							disabled={is_complete}
							rules={{ required: 'this is required' }}
						/>
						{errors.Fullname ? <span className={styles.error}>*required</span> : null}
					</div>
				</div>
			</div>
		</div>
	);
}

export default TermsConditions;
