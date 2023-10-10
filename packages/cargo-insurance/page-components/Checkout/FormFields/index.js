import FormItem from '../../../common/FormItem';
import { getInsuranceControls, getFileControls } from '../../../configurations/insuranceControls';

import styles from './styles.module.css';

function FormFields({ formHook = {}, billingType = '', incoterm = {} }) {
	const controls = getInsuranceControls({ incoterm });
	const fileControls = getFileControls({ billingType });
	return (
		<div className={styles.container}>
			<p className={styles.form_title}>Additional fields required to finish the purchase of Insurance</p>

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
