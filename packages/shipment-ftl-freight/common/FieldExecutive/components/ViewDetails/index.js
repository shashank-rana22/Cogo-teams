import { Button, Input, Select } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../commons/EmptyState';
import ModifiedStepper from '../../commons/ModifiedStepper';
import useStartTracking from '../../hooks/useStartTracking';
import useStepperHelper from '../../hooks/useStepperHelper';
import useViewDetailsHelper from '../../hooks/useViewDetailsHelper';
import {
	STEPPER_ARRAY,
	STEPPER_KEYS_OBJ,
	STEPPER_OBJ,
} from '../../utils/stepperConfigs';

import CardDetails from './CardDetails';
import DocumentHistory from './DocumentHistory';
import styles from './styles.module.css';

function ViewDetails({
	formattedData = {},
	otherFormattedData = {},
	truckNumber = {},
	shipment_data = {},
	servicesList = [],
	filterOptions = [],
	fieldExecTabConfig = {},
}) {
	const {
		showHistory,
		setShowHistory,
		mobileNumber,
		setMobileNumber,
		selectedTruckNumber,
		mobileOptions,
		isTaskCompleted,
	} = useViewDetailsHelper({ servicesList, truckNumber });

	const {
		activeStepper,
		handleNext,
		handlePrevious,
		nextDisabled,
		previousDisabled,
	} = useStepperHelper();

	const { createTracking, loading } = useStartTracking({
		shipment_data,
		servicesList,
	});

	return (
		<div>
			<div className={styles.stepper_container}>
				<ModifiedStepper active={activeStepper} items={STEPPER_ARRAY} />
			</div>
			{fieldExecTabConfig?.document_history_visible ? (
				<div className={styles.history_btn}>
					<Button themeType="accent" size="md" onClick={() => setShowHistory(true)}>
						Show document history
					</Button>
				</div>
			) : null}

			{isEmpty(STEPPER_OBJ[activeStepper]) ? <EmptyState /> : null}
			{Object.entries(STEPPER_OBJ[activeStepper]).map(([key, value]) => (
				<CardDetails
					key={key}
					cardLabels={value}
					heading={key}
					formattedData={formattedData}
					otherFormattedData={otherFormattedData}
				/>
			))}

			{fieldExecTabConfig?.start_tracking_visible ? (
				<div>
					{activeStepper === STEPPER_KEYS_OBJ.TRIP_DOCUMENTS ? (
						<div className={styles.tracking}>
							<div className={styles.tracking_label}>Tracking : </div>
							<div className={styles.tracking_input}>
								{isTaskCompleted ? (
									<Select
										className={styles.sub_input}
										size="md"
										placeholder="Select Mobile No."
										options={mobileOptions}
										value={mobileNumber}
										onChange={(e) => setMobileNumber(e)}
									/>
								) : (
									<Input
										className={styles.sub_select}
										placeholder="Enter Mobile No."
										type="number"
										size="md"
										value={mobileNumber}
										onChange={(val) => setMobileNumber(val)}
									/>
								)}
							</div>
							<Button
								themeType="accent"
								size="md"
								disabled={isEmpty(mobileNumber)
							|| loading
							|| isEmpty(selectedTruckNumber)
							|| !filterOptions.some((fil) => fil.value === selectedTruckNumber)}
								onClick={() => createTracking({
									truck_number  : selectedTruckNumber,
									mobile_number : mobileNumber,
								})}
							>
								Start tracking
							</Button>
						</div>
					) : null}
				</div>
			) : null }

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
			</div>
			{showHistory ? (
				<DocumentHistory
					showHistory={showHistory}
					setShowHistory={setShowHistory}
					shipment_data={shipment_data}
					truckNumber={truckNumber}
				/>
			) : null}
		</div>
	);
}

export default ViewDetails;
