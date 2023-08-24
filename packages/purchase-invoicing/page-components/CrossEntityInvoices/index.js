import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import getFormattedAmount from '../../common/helpers/formatAmount';
import ToolTipWrapper from '../../common/ToolTipWrapper';

import styles from './styles.module.css';

const MAX_LEN_FOR_TOOLTIP = 25;
const INVOICE_TYPE_CN = 'CREDIT NOTE';

function CrossEntityInvoice({ item = {} }) {
	const { zeroth_index } = GLOBAL_CONSTANTS;

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

					<div className={styles.servicename}>
						<span className={styles.spankey}>Service :</span>
						<div>
							{startCase(item?.serviceType)}
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

				<h3 className={styles.invoice_number}>
					{item?.invoiceNumber || zeroth_index}
				</h3>

				<h3 className={styles.invoice_value}>
					Live Invoice Value -
					<span style={{ color: '#5936F0', marginLeft: '4px' }}>
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
