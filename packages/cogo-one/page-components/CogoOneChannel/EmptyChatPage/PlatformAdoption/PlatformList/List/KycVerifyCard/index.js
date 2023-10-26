import { Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcAIncoterms, IcMDocument, IcMFtick, IcMCall } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import PlatFormAdoptionAssign from '../../../../../../../common/PlatFormAdoptionAssign';
import { formatAccountType } from '../../../../../../../utils/platformAdoption';

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
				<div className={styles.header_info}>
					<div className={styles.cycle_section}>
						<div className={styles.serail_id}>
							ID :
							{' '}
							{serial_id}
						</div>
						{escalation_cycle ? (
							<div className={cl`${styles.cycle} ${escalation_cycle === 'warning'
								? styles.warning : styles.escalate}`}
							>
								{startCase(escalation_cycle)}
							</div>
						) : null}
					</div>
					<div className={styles.wrap}>
						<div className={styles.user_info}>
							<IcAIncoterms />
							<div className={styles.org_details}>
								<Tooltip
									content={startCase(business_name)}
									placement="top"
								>
									<div className={styles.business_name}>
										{startCase(request_type) || '-'}
									</div>
								</Tooltip>
								<div className={styles.lower_section}>
									<div className={styles.trade_name}>
										{startCase(business_name) || '-'}
									</div>
									<div className={styles.account_type}>
										{formatAccountType({ tags })?.[account_type]?.shortName}
									</div>
								</div>
							</div>
						</div>
						<PlatFormAdoptionAssign data={item} type="kyc_verification" />
						{/* <div className={styles.action}>
							<IcMInfo className={styles.info_icon} />
							<IcMOverflowDot className={styles.dot_icon} />
						</div> */}
					</div>
				</div>
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
					{/* <div className={styles.each_row}>
						<div className={styles.title}>Escalation Cycle :</div>
						<div className={styles.cycle_type}>{startCase(escalation_cycle) || '-'}</div>
					</div> */}
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
				</div>
			</div>
		);
	});
}

export default KycVerifyCard;
