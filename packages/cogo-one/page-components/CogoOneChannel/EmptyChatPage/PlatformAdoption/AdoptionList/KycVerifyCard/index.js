import { Button, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcAIncoterms, IcMOverflowDot, IcMInfo, IcMDocument, IcMTimer, IcMFtick, IcMCall } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function KycVerifyCard({ itm = {} }) {
	const { label, subLabel, accountType, requestedBy, agentRole } = itm || {};

	return (
		<div className={styles.card}>
			<div className={styles.header_info}>
				<div className={styles.user_info}>
					<IcAIncoterms />
					<div className={styles.org_details}>
						<Tooltip
							content="Cogoport private logistix limited"
							placement="top"
						>
							<div className={styles.business_name}>
								{label || '-'}
							</div>
						</Tooltip>
						<div className={styles.lower_section}>
							<div className={styles.trade_name}>
								{subLabel || '-'}
							</div>
							<div className={styles.account_type}>{startCase(accountType)}</div>
						</div>
					</div>
				</div>
				<div className={styles.action}>
					<IcMInfo />
					<IcMOverflowDot />
				</div>

			</div>
			<div className={styles.body_info}>
				<div className={styles.each_row}>
					<div className={styles.title}>Documents Uploaded :</div>
					<div className={styles.docs}>
						<IcMDocument width={15} height={15} />
						<span>View All</span>
					</div>
				</div>
				<div className={styles.each_row}>
					<div className={styles.title}>Requsted By :</div>
					<div className={styles.name}>
						{requestedBy}
						<div className={styles.role}>{agentRole}</div>
						<div className={styles.role}>
							{
							formatDate({
								date       : new Date(),
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType : 'dateTime',
								separator  : ' | ',
							})
						}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.line_break} />
			<div className={styles.footer_info}>
				<div className={styles.time_left}>
					<IcMTimer width={20} height={20} fill="#F37166" />
					10:09 m left
				</div>
				<div className={styles.button_section}>
					<Button themeType="secondary" size="sm">
						<IcMFtick width={20} height={20} fill="#ABCD62" />
						Verify
					</Button>
					<div className={styles.call_icon}>
						<IcMCall width={18} height={18} fill="#fff" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default KycVerifyCard;
