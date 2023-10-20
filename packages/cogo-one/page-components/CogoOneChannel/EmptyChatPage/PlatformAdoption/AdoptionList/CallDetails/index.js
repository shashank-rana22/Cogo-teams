import { Tooltip } from '@cogoport/components';
import {
	IcMMissedcall,
	IcMOverflowDot, IcMInfo, IcCSendWhatsapp, IcMCall,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

function CallDetails({ itm = {} }) {
	const { label, subLabel } = itm || {};

	return (
		<div className={styles.card}>
			<div className={styles.header_info}>
				<div className={styles.user_info}>
					<IcMMissedcall />
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
						</div>
					</div>
				</div>
				<div className={styles.action}>
					<IcMInfo className={styles.info_icon} />
					<IcMOverflowDot className={styles.info_icon} />
				</div>
			</div>
			<div className={styles.body_info}>
				<div className={styles.each_row}>
					<div className={styles.title}>Missed call at : </div>
					<div className={styles.time}>14 min ago</div>
				</div>
				<div className={styles.each_row}>
					<div className={styles.title}>Comments : </div>
					<div className={styles.comment}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua.
					</div>
				</div>
			</div>
			<div className={styles.line_break} />
			<div className={styles.footer_container}>
				<div className={styles.button}>
					<IcCSendWhatsapp width={20} height={20} />
				</div>
				<div className={styles.button}>
					<IcMCall width={20} height={20} />
				</div>
			</div>
		</div>
	);
}

export default CallDetails;
