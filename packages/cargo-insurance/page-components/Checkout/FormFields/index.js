import { useTranslation } from 'next-i18next';

import FormItem from '../../../common/FormItem';
import { getInsuranceControls, getFileControls } from '../../../configurations/insuranceControls';

import styles from './styles.module.css';

function FormFields({ formHook = {}, billingType = '', incotermResponse = {}, verificationDoc = {} }) {
	const { t } = useTranslation(['cargoInsurance']);

	const controls = getInsuranceControls({ incotermResponse, t });
	const fileControls = getFileControls({ billingType, t, verificationDoc });

	return (
		<div className={styles.container}>
			<p className={styles.form_title}>{t('cargoInsurance:form_field_title_2')}</p>

			<div className={styles.form_elements}>
				<FormItem formhook={formHook} controls={controls} />
			</div>

			<div className={styles.form_elements}>
				<FormItem formhook={formHook} controls={fileControls} />
			</div>

		</div>
	);
}

export default FormFields;
