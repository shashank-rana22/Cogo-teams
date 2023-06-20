import { Chips } from '@cogoport/components';

import getCurrencyOptions from './helpers/getCurrencyOptions';
import styles from './styles.module.css';

function ChangeCurrency({
	invoice = {},
	invoiceCurrency = '',
	setInvoiceCurrency = () => {},
}) {
	const { currencyOptions = [] } = getCurrencyOptions(invoice);

	return (
		<Chips
			className={styles.chip}
			size="sm"
			items={currencyOptions}
			selectedItems={invoiceCurrency}
			onItemChange={(val) => setInvoiceCurrency(val)}
		/>
	);
}

export default ChangeCurrency;