import { useState, useMemo } from 'react';

import { STEPPER_ARRAY, STEPPER_KEYS_OBJ } from '../utils/stepperConfigs';

const INIT_VALUE = 1;
const DECREAMENT_VALUE = 2;

const useStepperHelper = () => {
	const [activeStepper, setActiveStepper] = useState(
		STEPPER_KEYS_OBJ.TRIP_DOCUMENTS,
	);

	const { findCurrentStep, previousDisabled, nextDisabled } = useMemo(() => {
		const findCurrent = STEPPER_ARRAY.find(
			(item) => item.key === activeStepper,
		);

		const previous = findCurrent.serial_id === INIT_VALUE;
		const next = findCurrent.serial_id === STEPPER_ARRAY.length;
		return {
			findCurrentStep  : findCurrent,
			previousDisabled : previous,
			nextDisabled     : next,
		};
	}, [activeStepper]);

	const handleNext = () => {
		if (findCurrentStep.serial_id < STEPPER_ARRAY.length) {
			setActiveStepper(STEPPER_ARRAY[findCurrentStep.serial_id].key);
		}
	};

	const handlePrevious = () => {
		if (findCurrentStep.serial_id > INIT_VALUE) {
			setActiveStepper(STEPPER_ARRAY[findCurrentStep.serial_id - DECREAMENT_VALUE].key);
		}
	};

	return {
		activeStepper,
		setActiveStepper,
		previousDisabled,
		nextDisabled,
		handleNext,
		handlePrevious,
	};
};

export default useStepperHelper;
