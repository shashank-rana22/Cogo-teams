import { Select } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import LANGUAGE_OPTIONS from '@cogoport/globalization/constants/languageMapping';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function SelectLanguage({ invoiceLanguage = '', setInvoiceLanguage = () => {} }) {
	const geo = getGeoConstants();
	const { t } = useTranslation(['common']);

	const allowedLanguages = (LANGUAGE_OPTIONS || [])
		.filter((language) => geo?.country.invoice_allowed_languages.includes(language.value));

	return (
		<div className={styles.container}>
			<Select
				options={allowedLanguages}
				value={invoiceLanguage}
				size="xs"
				placeholder={t('common:select_language')}
				onChange={setInvoiceLanguage}
			/>
		</div>
	);
}
export default SelectLanguage;
