import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, isEmpty } from '@cogoport/utils';

import getFormattedAmount from '../../common/helpers/formatAmount';
import ToolTipWrapper from '../../common/ToolTipWrapper';

import styles from './styles.module.css';

const MAX_LEN_FOR_TOOLTIP = 25;
const INVOICE_TYPE_CN = 'CREDIT NOTE';

function CrossEntityInvoice({ item = {} }) {
	const { zeroth_index } = GLOBAL_CONSTANTS;

	const handleDownload = (documentUrl) => {
		window.open(documentUrl);
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.container_title}>
				<div className={styles.customer}>
					<h3 className={styles.heading}>
						<ToolTipWrapper
							text={item?.entityName}
							maxlength={MAX_LEN_FOR_TOOLTIP}
						/>
					</h3>

					<div className={styles.service_name}>
						<span className={styles.spankey}>Service :</span>
						<div>
							{startCase(item?.serviceType || ' ')}
						</div>
					</div>
				</div>

				<div className={styles.invoices_container}>
					<h3 className={styles.invoices}>
						{item?.invoiceType === INVOICE_TYPE_CN
							? item?.invoiceType
							: 'INVOICE'}
					</h3>
				</div>

				<div
					className={cl`${styles.invoice_number} ${!isEmpty(item?.documentUrl) ? styles.active : ''}`}
					onClick={() => (!isEmpty(item?.documentUrl) ? handleDownload(item?.documentUrl || '') : null)}
					role="button"
					tabIndex={0}
				>
					<h3>
						{item?.invoiceNumber || zeroth_index}
					</h3>
				</div>

				<h3 className={styles.invoice_value}>
					Live Invoice Value -
					<span className={styles.live_invoice_amount}>
						{getFormattedAmount(
							item?.invoiceAmount,
							item?.currency,

						)}
					</span>
				</h3>

			</div>
		</div>
	);
}

export default CrossEntityInvoice;
