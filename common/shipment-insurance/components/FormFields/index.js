import FormItem from '../../common/FormItems';
import { getFileControls, getInsuranceControls } from '../../configurations/insuranceControls';

import styles from './styles.module.css';

function FormFields({ formHook = {}, billingType = '', incotermResponse = {}, verificationDoc = {} }) {
	const controls = getInsuranceControls({ incotermResponse });
	const fileControls = getFileControls({ billingType, verificationDoc });

	return (
		<div className={styles.container}>
			<p className={styles.form_title}>
				Additional fields required to finish the purchase of Insurance
			</p>

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
