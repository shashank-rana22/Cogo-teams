import { MultiSelect, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import SelectedReasonsForm from './components/SelectedReasonsForm';
import { getServiceWiseOptions, getServiceWiseConfig } from './configs';
import styles from './styles.module.css';

function DislikeRate({
	selectedSevice = {},
	details = {},
	rate = {},
	data = {},
	getSpotSearchRateFeedback = () => {},
	setSelectedSevice = () => {},
	unsatisfiedFeedbacks = {},
	setUnsatisfiedFeedbacks = () => {},
	chargeable_weight = '',
	refetchSearch = () => {},
}) {
	const { label = '', service_type, service_id = '', freight_price_currency = '', unit = '' } = selectedSevice;

	const { feedbacks = [] } = data[service_id] || {};

	const [selectedReasons, setSelectedReasons] = useState(feedbacks);

	const formProps = useForm();

	if (isEmpty(selectedSevice)) {
		return null;
	}

	const reasonOptions = getServiceWiseOptions({ service_type });
	const allControls = getServiceWiseConfig({ service_type })({ freight_price_currency, unit });

	const { data: unsatisfiedFeedbacksObj = {} } = unsatisfiedFeedbacks;

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

				<MultiSelect
					options={reasonOptions}
					value={selectedReasons}
					onChange={(value) => {
						const servicesDeleted = selectedReasons.filter((item) => !value.includes(item));

						if (feedbacks.some((item) => servicesDeleted.includes(item))) {
							Toast.warn('You cannot unselect submitted feedback');
							return;
						}

						setSelectedReasons(value);
					}}
					disabled={!isEmpty(unsatisfiedFeedbacksObj)}
				/>
			</div>

			<SelectedReasonsForm
				formProps={formProps}
				allControls={allControls}
				selectedReasons={selectedReasons}
				selectedSevice={selectedSevice}
				details={details}
				rate={rate}
				prefilledData={data[service_id] || {}}
				getSpotSearchRateFeedback={getSpotSearchRateFeedback}
				setSelectedReasons={setSelectedReasons}
				setSelectedSevice={setSelectedSevice}
				unsatisfiedFeedbacks={unsatisfiedFeedbacks}
				setUnsatisfiedFeedbacks={setUnsatisfiedFeedbacks}
				chargeable_weight={chargeable_weight}
				refetchSearch={refetchSearch}
			/>
		</div>
	);
}

export default DislikeRate;
