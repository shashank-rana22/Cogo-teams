import { Modal, Checkbox, Button } from '@cogoport/components';
import React, { useState } from 'react';

import Content from './IntroductionContent';
import styles from './styles.module.css';
import useUpdatePartnerUser from './useUpdatePartnerUser';

function TnC({ partner_user_id }) {
	const [disabled, setDisabled] = useState(true);

	const { updatePartnerUser, useUpdatePartnerUserloading } = useUpdatePartnerUser();

	return (
		<div className={styles.container}>
			<Modal size="lg" show placement="center" showCloseIcon={false}>
				<Modal.Header title="Terms and Conditions" />
				<Modal.Body scroll={false}>
					<div className={styles.modal_container}>
						<div className={styles.header}>
							Personal Data Policy Statement
						</div>

						<div className={styles.sub_heading}>1. Introduction </div>

						<Content />

						<div className={styles.sub_heading}>6. Access And Correction </div>
						<div>
							Upon the commencement of your employment, you will be provided
							an access to your Personal Data and will be given opportunities to make
							corrections so that it accurately reflects the relevant details.

						</div>

						<div className={styles.sub_heading}>7.Retention </div>
						<div>
							Personal Data will be held for as long as it is necessary
							to fulfil the purpose for which it was collected, or as required or
							permitted by applicable laws. We shall cease to retain Personal Data, or remove
							the means by which the Personal Data can be associated with particular individuals,
							as soon as it is reasonable to conclude that the purpose for which that Personal
							Data was collected is no longer being served by retention of the Personal Data and
							retention is no longer necessary for legal or business purposes.
							{' '}

						</div>

						<div className={styles.sub_heading}>8.Data Security </div>
						<div>
							We have taken and will continue to take reasonable
							efforts to protect Personal Data in our possession or control
							by making reasonable security arrangements to prevent unauthorised access,
							collection, use, disclosure, copying, modification, disposal or similar risks.
							{' '}

						</div>
						<div>
							While we strive to protect your Personal Data,
							we cannot ensure the security of any Personal Data
							which you may have transmitted to us, via an unsecure browser,
							and we urge you to take every precaution to protect your Personal
							Data and use a secure browser.
							{' '}

						</div>

						<div className={styles.sub_heading}>
							9. Updates To The Personal
							Data Protection Policy Statement
							{' '}

						</div>
						<div>
							We may from time to time update this Policy to ensure that
							it is consistent with our future developments, industry
							trends and/or any changes in legal or regulatory requirements.
							Such updates will be available with our concerned HR Teams.
							{' '}

						</div>
						<div>
							Your continued employment with us will be taken as
							acceptance of and consent to the updated Policy.
							{' '}

						</div>

						<div className={styles.sub_heading}>10.  Contacting Us</div>
						<div>
							If you have any queries, comments or questions about the
							collection, use or disclosure of your Personal Data or this Policy,
							please contact us in writing at the address below referencing ‘Personal Data
							Protection Policy Statement’
							{' '}

						</div>
						<div className={styles.address}>
							<p>6th Floor, Akruti Trade Center,</p>
							<p>Road Number 7, Kondivita, </p>
							<p>Andheri East, Mumbai 400069</p>
							{' '}

						</div>
					</div>
					<div className={styles.flex}>
						<div style={{ marginLeft: '5px' }}>
							<Checkbox
								label="By clicking on AGREE,
										you are accepting the above Terms of Use"
								onChange={() => setDisabled(!disabled)}
							/>

						</div>
						<div className={styles.button}>
							<Button
								disabled={disabled}
								size="md"
								themeType="primary"
								onClick={() => updatePartnerUser({ id: partner_user_id })}
								loading={useUpdatePartnerUserloading}
							>
								AGREE
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}
export default TnC;
