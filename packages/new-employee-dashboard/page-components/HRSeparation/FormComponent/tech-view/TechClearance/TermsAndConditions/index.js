import { Checkbox, Input } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function TermsAndConditions() {
	return (
		<div>
			<div className={styles.title}>Terms & Conditions</div>
			<div className={styles.sub_heading}>Please read carefully</div>

			<div className={styles.content_container}>

				<div className={styles.content_text_container}>

					<Checkbox className={styles.Checkbox} />

					<div className={styles.content}>
						<p>
							The details you provide guide critical decisions,
							making accuracy paramount. By submitting this form, you affirm the accuracy of all
							information. Any discrepancies could lead to losses for which you&apos;ll bear full
							responsibility.
							This self-attestation is legally binding.
						</p>
						<br />
						<p>
							Enter your Full Name, confirm your understanding and commitment to these terms.
						</p>
					</div>
				</div>

				<div className={styles.name_main_container}>
					<div className={styles.full_name_text}>
						Full Name
					</div>
					<div className={styles.name_input_container}>
						<Input size="md" placeholder="Type your notes here" className={styles.name_input} />
					</div>
				</div>

			</div>
		</div>
	);
}

export default TermsAndConditions;
