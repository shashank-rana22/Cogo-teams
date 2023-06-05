import { Modal, Checkbox, Button } from '@cogoport/components';
import React, { useState } from 'react';

import useUpdatePartnerUser from '../Announcements/hooks/useUpdatePartnerUser';

import styles from './styles.module.css';

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
						<div>
							<p>
								The objective of this Personal Data Protection Policy Statement (“Policy”)
								is to provide you with information with respect to how Cogoport
								(“Cogoport”) (as well as its representatives, Affiliates and/or agents)
								(collectively referred to herein as “Cogoport”, “us”, “we” or “our”)
								collects and processes personal information and sensitive personal information.
								We ask that you read this Policy carefully as it contains important information
								regarding the collection, use and
								disclosure of Personal Data (as defined below).
								{' '}
							</p>
							<p>
								In addition, this Policy is intended to provide
								you with sufficient information to
								enable you to notify, and obtain consent from,
								any natural person (a “Relevant Person”)
								whose Personal Data may have been provided or may
								be provided by you or your agent to us from
								time to time.
								{' '}

							</p>
							<p>
								This Policy supplements but does not supersede or replace any
								other consent you may have previously provided to us in respect of your
								Personal Data, and your consents herein are additional to any rights to which we
								may have at law to collect, use or disclose your Personal Data.
								{' '}
							</p>
						</div>

						<div className={styles.sub_heading}>2. Personal Data </div>
						<div>
							<p>
								In this Policy, “Personal Data” refers to any data
								about you or a Relevant Person, whether true or not,
								such that you or such natural person (as the case may be)
								can be identified (a) from that data; or (b) from that data
								and other information to which we have or are likely to have access,
								including data in our records as may be updated from time to time.
								{' '}

							</p>
							<p>
								Examples of such Personal Data you may provide
								us include your name, company name, title, passport or
								other identification number,
								telephone number(s), mailing address, email address, account number,
								income and any other
								personal information relating to any Relevant Person which you have provided or
								will provide to us in any forms you may have submitted to us,
								or via any other form
								of interaction with you. We may also collect Personal Data about you or
								a Relevant Person from applications,
								forms or questionnaires you may complete or agreements you enter into with us
								or in the course of your establishing or maintaining a
								employee/employer relationship with us.
								{' '}

							</p>
						</div>

						<div className={styles.sub_heading}>
							3. Purposes for the Collection, Use and Disclosure of
							Personal Data
							{' '}

						</div>
						<div>
							Generally, Cogoport collects,
							uses and discloses Personal Data for the following purposes:
							<p>
								a. managing your relationship with us and/or
								administration of your contractual employment agreement.
								{' '}

							</p>
							<p>
								b. conducting identity and/or background checks,
								and carrying out employee due diligence and
								other checks and screenings and ongoing monitoring that may
								be required under any applicable law, regulation or directive
								or internal policies.
								{' '}
							</p>
							<p>
								c. preventing, detecting and investigating fraud,
								misconduct or any unlawful activities, whether or not requested by
								sany relevant governmental or regulatory authority, and analysing
								and managing commercial risks

							</p>
							<p>
								d. complying with all applicable laws, regulations,
								rules, directives, orders, instructions and requests from any
								governmental, tax, law enforcement or other authorities
								(whether local or foreign)

							</p>
							<p>
								e. managing our infrastructure and business
								operations and complying with our policies and procedures that may be
								srequired by applicable laws and regulations including those relating to
								risk control,
								compliance, security, audit, finance and accounting,
								human resources, systems and business continuity

							</p>
							<p>f. addressing or investigating any complaints, claims or disputes</p>
							<p>g. carrying out research, planning and statistical analysis</p>
							<p>h. organizing company related promotional events; and </p>
							<p>
								i.  enforcing our legal and/or
								contractual rights against
								you including, but not limited to, recovering any and all
								amounts owed to us,
								{' '}

							</p>
							<p>(collectively, the “Purposes”) </p>
						</div>

						<div className={styles.sub_heading}>4. Consent</div>
						<div>
							By interacting with us, submitting information to us, or signing our contractual
							employment agreement, you agree and consent to:
							<p>
								a. us collecting, using, disclosing and sharing such Personal Data for
								the Purposes stated in this Policy,to our authorised service
								providers and relevant
								third parties in the manner set forth in this Policy and as per
								the applicable data protection law ; and
								{' '}

							</p>
							<p>
								b. each Relevant Person having consented to
								our collection, use, disclosure, sharing, and/or processing
								of his/her Personal Data for the Purposes stated in this Policy,
								and such Relevant Person has been informed of and has accepted this Policy.
								{' '}

							</p>
							Please do note that this consent will be applicable and enforceable
							during the time when your employed with us (Cogoport) in any capacity.
							<p>
								Where the personal data protection laws of the relevant jurisdictions permit
								us to collect, use or disclose the Personal Data without your or the Relevant
								Person’s consent, such permission granted by local laws will continue to apply.
								{' '}

							</p>
						</div>

						<div className={styles.sub_heading}>
							5. Disclosure, Sharing and
							Transfer of Personal Data Overseas

						</div>
						<div>
							Subject to the provisions of any applicable law,
							Personal Data may be disclosed or transferred to, shared with
							or kept by the following entities,
							wherever located, for any of the Purposes or for processing for any of the Purposes:
							<p>
								a. other legal entities of the Cogoport,
								operating across various Geographies
								{' '}

							</p>
							<p>
								b. any third party service providers, who will help us in our
								day-to-day activities as an organization
								{' '}

							</p>
							<p>c. our auditors</p>
							<p>
								e. any local or foreign government agencies, regulatory
								authorities and statutory bodies having jurisdiction over us; and
								{' '}

							</p>
							<p>f. any of their respective successors and assigns. </p>
						</div>
						<div>
							To the extent that we may need to transfer Personal Data
							outside the relevant jurisdiction, we shall do so in accordance with the personal
							data protection law of that jurisdiction to ensure that we
							provide a standard of protection
							to the Personal Data so transferred that is comparable to the
							protection under that jurisdiction.
							{' '}

						</div>

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
