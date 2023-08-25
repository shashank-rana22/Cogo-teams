import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function FailedTooltip() {
	return (
		<Tooltip
			content={(
				<div className={styles.text_styles}>
					<div className={styles.heading}>Possible Reasons</div>
					<ul>
						<li>The recipient phone number is not a WhatsApp phone number.</li>
						<li>Recipient has not accepted our new Terms of Service and Privacy Policy.</li>
					</ul>
				</div>
			)}
			placement="left"
			width={500}
			interactive
			className={styles.tooltip_styles}
		>
			<IcMInfo fill="#BF291E" width="12px" height="12px" cursor="pointer" />
		</Tooltip>
	);
}
export default FailedTooltip;
