import { Checkbox } from '@cogoport/components';

import AgentAvatar from '../../../../../../../common/AgentAvatar';

import styles from './styles.module.css';

function AccountDetails() {
	return (
		<div className={styles.full_section}>
			<div className={styles.user_info}>
				<AgentAvatar text="Cogoport" />
				<div className={styles.org_details}>
					<div className={styles.business_name}>
						{/* {label || '-'} */}
						Reliance Pvt Ltd
					</div>
					<div className={styles.trade_name}>
						{/* {subLabel || '-'} */}
						Akash Agarwal (Agent)
					</div>
				</div>
			</div>

			<div className={styles.customer_details}>
				<div className={styles.label}>Contact Details of customer: </div>
				<div className={styles.contacts}>
					<div className={styles.sub_contact}>
						<div className={styles.title}>Phone</div>
						<div className={styles.contact_details}>
							+91 9876543210
							{/* {mobile_number ? (
								<>
									{mobile_country_code}
									{' '}
									{mobile_number}
								</>
							) : '-'} */}
						</div>
					</div>
					<div className={styles.sub_contact}>
						<div className={styles.title}>PAN</div>
						<div className={styles.contact_details}>123456789098766</div>
					</div>
					<div className={styles.sub_contact}>
						<div className={styles.title}>Email</div>
						<div className={styles.contact_details}>jigarshah123457@gmail.com</div>
					</div>
				</div>
			</div>

			<div className={styles.address_details}>
				<div className={styles.address_column}>
					<div className={styles.address_label}>Billing Address</div>
					{/* <div className={styles.address}>{address || '-'}</div> */}
					<div className={styles.address}>
						6th floor, Ackruti Trade Centre, Rd Number 7, Kondivita, Andheri East, Mumbai, Maharashtra
					</div>

				</div>
				<div className={styles.pincode}>
					<div className={styles.pincode_label}>Pincode: </div>
					<div className={styles.code}>400069</div>
				</div>
			</div>

			<div className={styles.gst_details}>
				<div className={styles.gst}>
					<div className={styles.pincode_label}>Tax/ GST Number: </div>
					<div className={styles.code}>123456789098766</div>
				</div>
				<div className={styles.approve}>
					<Checkbox label="I have reviewed all the KYC details thoroughly." value="a1" />
				</div>
			</div>
		</div>
	);
}

export default AccountDetails;
