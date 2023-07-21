import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../commons/EmptyState';
import ModifiedStepper from '../../commons/ModifiedStepper';
import useStepperHelper from '../../hooks/useStepperHelper';
import { TRUCK_STATE_KEYS } from '../../utils/pageMappings';
import { STEPPER_ARRAY, STEPPER_OBJ } from '../../utils/stepperConfigs';

import EditCardDetails from './EditCardDetails';
import styles from './styles.module.css';

function EditDetails({
	formattedData = {},
	setInitFormattedData = () => {},
	otherFormattedData = {},
	setOtherFormattedData = () => {},
	truckNumber = {},
	updateDetails = () => {},
	editLoading = false,
}) {
	const {
		activeStepper,
		handlePrevious,
		previousDisabled,
		handleNext,
		nextDisabled,
	} = useStepperHelper();

	return (
		<div>
			<div className={styles.stepper_container}>
				<ModifiedStepper active={activeStepper} items={STEPPER_ARRAY} />
			</div>
			<div className={styles.heading}>Edit Details</div>
			{isEmpty(STEPPER_OBJ[activeStepper]) ? <EmptyState /> : null}
			{Object.entries(STEPPER_OBJ[activeStepper]).map(([key, value]) => (
				<EditCardDetails
					key={key}
					cardLabels={value}
					heading={key}
					formattedData={formattedData}
					setInitFormattedData={setInitFormattedData}
					otherFormattedData={otherFormattedData}
					setOtherFormattedData={setOtherFormattedData}
				/>
			))}
			<div className={styles.button_wrapper}>
				<Button
					themeType="secondary"
					size="md"
					onClick={handlePrevious}
					disabled={previousDisabled}
				>
					Back
				</Button>
				<Button
					style={{ marginLeft: '10px' }}
					themeType="accent"
					size="md"
					onClick={handleNext}
					disabled={nextDisabled}
				>
					Next
				</Button>
				{nextDisabled ? (
					<Button
						style={{ marginLeft: '10px' }}
						themeType="primary"
						size="md"
						onClick={() => updateDetails(truckNumber[TRUCK_STATE_KEYS.SELECTED_TRUCK_NUMBER])}
						disabled={editLoading}
					>
						Submit
					</Button>
				) : null}
			</div>
		</div>
	);
}

export default EditDetails;
