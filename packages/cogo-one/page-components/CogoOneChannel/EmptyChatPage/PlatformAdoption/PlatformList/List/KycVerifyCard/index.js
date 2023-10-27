import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcAIncoterms, IcMDocument, IcMFtick, IcMCall } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { formatAccountType } from '../../../../../../../utils/platformAdoption';
import Header from '../../Header';

import styles from './styles.module.css';

function KycVerifyCard({ list = [], setVerifyAccount = () => {}, handlePlaceCall = () => {} }) {
	return (list || []).map((item) => {
		const {
			organization = {}, request_type = '', id = '', requesting_user = {}, performed_by_type = '',
			updated_at = '', customer = {}, serial_id = '', escalation_cycle = null, documents = [],
		} = item || {};
		const { account_type = '', business_name = '', tags = [] } = organization || {};
		const { name = '' } = requesting_user || {};
		const {
			name:pocName = '', mobile_country_code = '', mobile_number = '', id: pocId = '',
			lead_user_id = '',
		} = customer || {};

		return (
			<div className={styles.card} key={id}>
				<Header
					serialId={serial_id}
					escalationCycle={escalation_cycle}
					icon={<IcAIncoterms width={30} height={30} />}
					requestType={request_type}
					businessName={business_name}
					tags={tags}
					accountType={account_type}
					item={item}
				/>
				<div className={styles.body_info}>
					<div className={styles.each_row}>
						<div className={styles.title}>Documents Uploaded :</div>
						<div
							role="presentation"
							className={styles.view_all}
							onClick={() => {
								setVerifyAccount((prev) => ({
									...prev,
									show               : true,
									showAccountDetails : false,
									accountData        : documents,
									orgData            : {},
									verifyType         : '',
									accountType        : '',
								}));
							}}
						>
							<IcMDocument width={15} height={15} />
							<span>View All</span>
						</div>
					</div>
					<div className={styles.each_row}>
						<div className={styles.title}>Requsted By :</div>
						<div className={styles.request_name}>
							{startCase(name)}
							<div className={styles.role}>{startCase(performed_by_type)}</div>
							<div className={styles.role}>
								{formatDate({
									date       : updated_at,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
									formatType : 'dateTime',
									separator  : ' | ',
								})}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.line_break} />
				<div className={styles.footer_info}>
					<div
						className={styles.verify_button}
						role="presentation"
						onClick={() => {
							setVerifyAccount((prev) => ({
								...prev,
								show               : true,
								showAccountDetails : true,
								accountData        : documents,
								orgData            : item,
								verifyType         : 'kyc_verify',
								accountType        : formatAccountType({ tags })?.[account_type]?.shortName,
							}));
						}}
					>
						<IcMFtick className={styles.ftick_icon} />
						Verify
					</div>
					{mobile_number ? (
						<div
							role="presentation"
							className={styles.call_icon}
							onClick={() => handlePlaceCall({
								userName   : pocName,
								code       : mobile_country_code,
								number     : mobile_number,
								pocId,
								leadUserId : lead_user_id,
							})}
						>
							<IcMCall width={18} height={18} fill="#fff" />
						</div>
					) : null}
				</div>
			</div>
		);
	});
}

export default KycVerifyCard;
