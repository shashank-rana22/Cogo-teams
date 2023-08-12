import { Button, Stepper } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import useStepsData from './hooks/useStepsData';
import styles from './styles.module.css';
import { STEPS_MAPPINGS } from './utils/stepsMappings';

const LAST_VALUE_INDEX = -1;

function FtlConfirmationBooking(props) {
	const { onCancel = () => {} } = props;
	const [step, setStep] = useState(STEPS_MAPPINGS.update_details.key);

	const stepsHookData = useStepsData({ ...props, setStep });

	const {
		handleNext = () => {},
		handleFinalSubmit = () => {},
		confirmationLoading = false,
		editQuoteData = {},
	} = stepsHookData || {};

	const stepsItems = Object.values(STEPS_MAPPINGS);
	const Component = STEPS_MAPPINGS[step]?.component;

	const isLast = stepsItems.at(LAST_VALUE_INDEX)?.key === step;
	const isFirst = stepsItems?.[GLOBAL_CONSTANTS.zeroth_index]?.key === step;

	return (
		<div>
			<Stepper items={stepsItems} active={step} setActive={setStep} />
			<div className={styles.container}>
				{Component ? <Component {...props} step={step} setStep={setStep} {...stepsHookData} />
					: null}
			</div>
			<div className={styles.button_wrapper}>
				<Button themeType="accent" onClick={() => onCancel()}>Cancel</Button>
				{!isFirst ? (
					<Button
						themeType="secondary"
						onClick={() => setStep(STEPS_MAPPINGS.update_details.key)}
					>
						Back
					</Button>
				) : null}
				{!isLast
					? (
						<Button
							themeType="primary"
							onClick={() => handleNext()}
							loading={confirmationLoading}
						>
							Next
						</Button>
					)
					: (
						<Button
							themeType="primary"
							onClick={() => handleFinalSubmit()}
							loading={editQuoteData?.loading}
						>
							Submit
						</Button>
					)}

			</div>
		</div>

	);
}

export default FtlConfirmationBooking;
