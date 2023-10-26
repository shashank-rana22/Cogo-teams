import { Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import {
	IcAHelpingHand011, IcMDocument, IcMFtick,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import PlatFormAdoptionAssign from '../../../../../../../common/PlatFormAdoptionAssign';
import { formatAccountType } from '../../../../../../../utils/platformAdoption';

import styles from './styles.module.css';

function TradeTypeVerifyCard({ list = [], setVerifyAccount = () => {} }) {
	return (list || []).map((item) => {
		const {
			trade_party = {}, request_type = '', id = '', organization = {}, requesting_user = {},
			serial_id = '', documents = [], escalation_cycle = '',
		} = item || {};
		const {
			business_name: orgName = '', account_type = '',
			tags = [],
		} = organization || {};
		const { business_name = '', trade_party_type = '', updated_at = '' } = trade_party || {};
		const { name = '' } = requesting_user || {};

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
							<IcAHelpingHand011 />
							<div className={styles.org_details}>
								<Tooltip
									content={startCase(orgName)}
									placement="top"
								>
									<div className={styles.business_name}>
										{startCase(request_type) || '-'}
									</div>
								</Tooltip>
								<div className={styles.lower_section}>
									<div className={styles.trade_name}>
										{startCase(orgName) || '-'}
									</div>
									<div className={styles.account_type}>
										{formatAccountType({ tags })?.[account_type]?.shortName}
									</div>
								</div>
							</div>
						</div>
						<PlatFormAdoptionAssign data={item} type="trade_party_verification" />
						{/* <div className={styles.action}>
							<IcMInfo className={styles.info_icon} />
							<IcMOverflowDot className={styles.dot_icon} />
						</div> */}
					</div>
				</div>
				<div className={styles.body_info}>
					<div className={styles.each_row}>
						<div className={styles.title}>Requested by :</div>
						<div className={styles.request_name}>{name}</div>
					</div>
					<div className={styles.each_row}>
						<div className={styles.title}>Trade name :</div>
						<div className={styles.request_name}>{business_name}</div>
					</div>
					<div className={styles.each_row}>
						<div className={styles.title}>Trade Type :</div>
						<div className={styles.source}>
							{startCase(trade_party_type)}
							<div className={styles.source_date}>
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
					<div className={styles.each_row}>
						<div className={styles.title}>Documents Uploaded :</div>
						<div
							className={styles.docs}
							role="presentation"
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
				</div>
				<div className={styles.line_break} />
				<div className={styles.footer_info}>
					{/* <div className={styles.time_left}>
						<IcMTimer width={20} height={20} fill="#F37166" />
						10:09 m left
					</div> */}
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
								verifyType         : 'trade_party',
								accountType        : 'trade_party',
							}));
						}}
					>
						<IcMFtick className={styles.ftick_icon} />
						Verify
					</div>
				</div>
			</div>
		);
	});
}

export default TradeTypeVerifyCard;
