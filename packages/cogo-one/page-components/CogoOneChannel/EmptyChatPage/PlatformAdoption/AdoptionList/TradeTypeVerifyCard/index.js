import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import {
	IcAHelpingHand011,
	IcMOverflowDot, IcMInfo, IcMDocument, IcMTimer, IcMFtick,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function TradeTypeVerifyCard({ list = [], setVerifyAccount = () => {} }) {
	return (list || []).map((item) => {
		const { trade_party = {}, request_type = '', id = '', organization = {} } = item || {};
		const { business_name: orgName = '' } = organization || {};
		const { business_name = '', trade_party_type = '', updated_at = '' } = trade_party || {};

		return (
			<div className={styles.card} key={id}>
				<div className={styles.header_info}>
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
								{/* <div className={styles.account_type}>{startCase(accountType)}</div> */}
							</div>
						</div>
					</div>
					<div className={styles.action}>
						<IcMInfo className={styles.info_icon} />
						<IcMOverflowDot className={styles.dot_icon} />
					</div>

				</div>
				<div className={styles.body_info}>
					<div className={styles.each_row}>
						<div className={styles.title}>Requested by :</div>
						<div className={styles.request_name}>-</div>
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
									accountData        : [],
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
					<div className={styles.time_left}>
						<IcMTimer width={20} height={20} fill="#F37166" />
						10:09 m left
					</div>
					<div
						className={styles.verify_button}
						role="presentation"
						onClick={() => {
							setVerifyAccount((prev) => ({
								...prev,
								show               : true,
								showAccountDetails : true,
								accountData        : [],
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
