import { Select } from '@cogoport/components';

import styles from './styles.module.css';

function SelectLanguage({ invoiceLanguage = '', setInvoiceLanguage = () => {} }) {
	return (
		<div className={styles.container}>
			<Select
				options={[{ label: 'English', value: 'english' }, { label: 'Vietnamese', value: 'vietnamese' }]}
				value={invoiceLanguage}
				size="xs"
				placeholder="Select Language"
				onChange={(val) => setInvoiceLanguage(val)}
			/>
		</div>
	);
}
export default SelectLanguage;
