import { Tooltip, cl } from '@cogoport/components';
import {
	IcMInfo,
	IcMEmail,
} from '@cogoport/icons-react';

import styles from '../../styles.module.css';

function EmailInfo({
	invoice = {},
	setSendEmail = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.main_container}>
				<div className={cl`${styles.actions_wrap} ${styles.actions_wrap_icons}`}>
					<div className={styles.email_wrapper}>
						<IcMEmail
							onClick={() => setSendEmail(true)}
						/>
						<Tooltip
							placement="bottom"
							content={(
								<div className={styles.flex_row_div}>
									<div className={styles.flex_row}>
										Proforma email sent :
										&nbsp;
										{invoice.proforma_email_count || 0}
									</div>

									<div className={cl`${styles.flex_row} ${styles.margin}`}>
										Live email sent:
										&nbsp;
										{invoice.sales_email_count || 0}
									</div>
									<div className={cl`${styles.flex_row} ${styles.utr_details}`}>
										<div className={cl`${styles.flex_row} ${styles.margin}`}>
											UTR Number:
											&nbsp;
											{invoice?.sales_utr?.utr_number || ''}
										</div>
										<div className={cl`${styles.flex_row} ${styles.margin}`}>
											Status:
											&nbsp;
											{invoice?.sales_utr?.status || ''}
										</div>
									</div>
								</div>
							)}
							theme="light"
						>
							<div className={styles.icon_div}><IcMInfo /></div>
						</Tooltip>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EmailInfo;
