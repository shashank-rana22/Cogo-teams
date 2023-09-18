import { Select } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import LANGUAGE_OPTIONS from '@cogoport/globalization/constants/languageMapping';

import styles from './styles.module.css';

const geo = getGeoConstants();
function SelectLanguage({ invoiceLanguage = '', setInvoiceLanguage = () => {} }) {
	const ALLOWED_LANGUAGES = (LANGUAGE_OPTIONS || [])
		.filter((language) => geo?.country.allowed_languages.includes(language.value));
	return (
		<div className={styles.container}>
			<Select
				options={ALLOWED_LANGUAGES}
				value={invoiceLanguage}
				size="xs"
				placeholder="Select Language"
				onChange={(val) => setInvoiceLanguage(val)}
			/>
		</div>
	);
}
export default SelectLanguage;
