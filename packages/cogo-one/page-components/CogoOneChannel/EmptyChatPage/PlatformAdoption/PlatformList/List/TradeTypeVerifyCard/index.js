import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import {
	IcAHelpingHand011, IcMDocument, IcMFtick,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { TradeInfoContent } from '../../../../../../../constants/platformAdoptionConstant';
import Header from '../../Header';

import styles from './styles.module.css';

function TradeTypeVerifyCard({ item = {}, setVerifyAccount = () => {} }) {
	const {
		trade_party = {}, request_type = '', organization = {}, requesting_user = {},
		serial_id = '', documents = [], escalation_cycle = '',
	} = item || {};
	const {
		business_name: orgName = '', account_type = '',
		tags = [],
	} = organization || {};
	const { business_name = '', trade_party_type = '', updated_at = '' } = trade_party || {};
	const { name = '' } = requesting_user || {};

	return (
		<div className={styles.card}>
			<Header
				serialId={serial_id}
				escalationCycle={escalation_cycle}
				icon={<IcAHelpingHand011 width={30} height={30} />}
				requestType={request_type}
				businessName={orgName}
				tags={tags}
				accountType={account_type}
				item={item}
				content={<TradeInfoContent />}
			/>
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
								orgData            : item,
								verifyType         : 'trade_party',
								accountType        : 'trade_party',
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
}

export default TradeTypeVerifyCard;
