import { MultiSelect } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { getServiceWiseOptions, getServiceWiseConfig } from '../../../../configs';

import SelectedReasonsForm from './components/SelectedReasonsForm';
import styles from './styles.module.css';

function FormComponent({ selectedSevice = {} }) {
	const [selectedReasons, setSelectedReasons] = useState([]);

	const formProps = useForm();

	if (isEmpty(selectedSevice)) {
		return null;
	}

	const { label = '', service_type } = selectedSevice;

	const reasonOptions = getServiceWiseOptions({ service_type });
	const allControls = getServiceWiseConfig({ service_type })();

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div className={styles.number}>
					<div className={styles.number_div}>1</div>
				</div>

				<div className={styles.label}>{label}</div>
			</div>

			<div className={styles.feedback_reason_div}>
				<div className={styles.feedback_reason_label}>
					Feedback Reason
					{' '}
					<sup className={styles.asterisk_mark}>*</sup>
				</div>

				<MultiSelect options={reasonOptions} value={selectedReasons} onChange={setSelectedReasons} />
			</div>

			<SelectedReasonsForm formProps={formProps} allControls={allControls} selectedReasons={selectedReasons} />
		</div>
	);
}

export default FormComponent;
