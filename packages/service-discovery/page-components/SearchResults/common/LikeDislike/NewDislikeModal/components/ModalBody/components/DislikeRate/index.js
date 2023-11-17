import { MultiSelect } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import SelectedReasonsForm from './components/SelectedReasonsForm';
import { getServiceWiseOptions, getServiceWiseConfig } from './configs';
import styles from './styles.module.css';

function DislikeRate({
	selectedSevice = {},
	setSelectedSevice = () => {},
	details = {},
	rate = {},
	data = {},
	getSpotSearchRateFeedback = () => {},
}) {
	const { label = '', service_type, service_id = '' } = selectedSevice;

	const [selectedReasons, setSelectedReasons] = useState(data[service_id]?.feedbacks || []);

	const formProps = useForm();

	if (isEmpty(selectedSevice)) {
		return null;
	}

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

			<SelectedReasonsForm
				formProps={formProps}
				allControls={allControls}
				selectedReasons={selectedReasons}
				setSelectedSevice={setSelectedSevice}
				selectedSevice={selectedSevice}
				details={details}
				rate={rate}
				prefilledData={data[service_id] || {}}
				getSpotSearchRateFeedback={getSpotSearchRateFeedback}
			/>
		</div>
	);
}

export default DislikeRate;
