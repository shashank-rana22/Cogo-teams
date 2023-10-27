import { Checkbox, cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import AgentAvatar from '../../../../../../../../common/AgentAvatar';

import { formatKycOrgData, formatOnboardData, formatTradePartyData } from './formatOrgData';
import styles from './styles.module.css';

const DATA_MAPPING = {
	kyc_verify       : formatKycOrgData,
	trade_party      : formatTradePartyData,
	onboard_customer : formatOnboardData,
};

function AccountDetails({
	hasDocument = false, orgData = {}, verifyType = '', checked = false,
	setChecked = () => {},
}) {
	const detailsMapping = DATA_MAPPING?.[verifyType]?.({ orgData });

	const {
		orgName = '', email = '', address = '', pincode = '', taxNumber = '',
		pocName = '', mobileNumber = '', mobileCode = '', pan = '',
	} = detailsMapping || {};

	return (
		<div className={cl`${hasDocument ? styles.only_data : styles.full_section}`}>
			<div className={styles.user_info}>
				<AgentAvatar text="Cogoport" />
				<div className={styles.org_details}>
					<div className={styles.business_name}>
						{startCase(orgName) || '-'}
					</div>
					<div className={styles.trade_name}>
						{startCase(pocName) || '-'}
					</div>
				</div>
			</div>

			<div className={styles.customer_details}>
				<div className={styles.label}>Contact Details of customer: </div>
				<div className={styles.contacts}>
					<div className={styles.sub_contact}>
						<div className={styles.title}>Phone</div>
						<div className={styles.contact_details}>
							{mobileNumber ? (
								<>
									{mobileCode}
									{' '}
									{mobileNumber}
								</>
							) : '-'}
						</div>
					</div>
					<div className={styles.sub_contact}>
						<div className={styles.title}>PAN</div>
						<div className={styles.contact_details}>{pan}</div>
					</div>
					<div className={styles.sub_contact}>
						<div className={styles.title}>Email</div>
						<div className={styles.contact_details}>{email}</div>
					</div>
				</div>
			</div>

			<div className={styles.address_details}>
				<div className={styles.address_column}>
					<div className={styles.address_label}>Billing Address</div>
					<div className={styles.address}>{address || '-'}</div>
				</div>
				<div className={styles.pincode}>
					<div className={styles.pincode_label}>Pincode: </div>
					<div className={styles.code}>{pincode}</div>
				</div>
			</div>

			<div className={styles.gst_details}>
				<div className={styles.gst}>
					<div className={styles.pincode_label}>Tax/ GST Number: </div>
					<div className={styles.code}>{taxNumber}</div>
				</div>
				<div className={styles.approve}>
					<Checkbox
						label="I have reviewed all the KYC details thoroughly."
						value={checked}
						onChange={() => setChecked((p) => !p)}
					/>
				</div>
			</div>
		</div>
	);
}

export default AccountDetails;
