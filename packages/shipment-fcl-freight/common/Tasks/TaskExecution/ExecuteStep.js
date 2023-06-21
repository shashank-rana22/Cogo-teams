import { Button } from '@cogoport/components';
import { Layout } from '@cogoport/ocean-modules';
import { useRef } from 'react';

import EditBookingParams from './EditBookingParams';
import { getCanShipmentRollover } from './helpers/getCanShipmentRollover';
import useHandleSubmit from './helpers/useHandleSubmit';
import useStepExecution from './helpers/useStepExecution';
import styles from './styles.module.css';

function ExecuteStep({
	task = {},
	stepConfig = {},
	onCancel = () => {},
	refetch = () => {},
	currentStep = 0,
	isLastStep = false,
	getApisData = {},
	selectedMail = [],
	serviceIdMapping = [],
}) {
	const {
		formProps,
		fields,
		showElements,
	} = useStepExecution({
		task,
		stepConfig,
		getApisData,
		selectedMail,
	});
	const { control, formState: { errors }, handleSubmit, watch } = formProps;

	const { editBookingParams } = showElements || {};

	const editParams = useRef(null);

	const isShipmentRolloverable = getCanShipmentRollover(getApisData);

	const { loading: isLoading, setIsLoading, onSubmit } = useHandleSubmit({
		finalConfig: stepConfig,
		task,
		onCancel,
		refetch,
		serviceIdMapping,
		currentStep,
		isLastStep,
		getApisData,
		showElements,
	});

	const handleTaskSubmit = () => {
		if (isShipmentRolloverable && editBookingParams) {
			setIsLoading(true);

			editParams.current?.handleSubmit()
				.then(() => handleSubmit(onSubmit)())
				.finally(() => setIsLoading(false));
			// .then(() => console.log('then'))
			// .catch(() => console.log('catch'))
			// .finally(() => console.log('finally'));
		} else {
			handleSubmit(onSubmit);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<Layout
					fields={fields}
					control={control}
					errors={errors}
					showElements={showElements}
					formValues={watch()}
					shipment_id={task?.shipment_id}
				/>

				{isShipmentRolloverable && editBookingParams ? (
					<EditBookingParams
						task={task}
						getApisData={getApisData}
						formProps={formProps}
						ref={editParams}
					/>
				) : null}
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					onClick={() => onCancel()}
					disabled={isLoading}
				>
					CANCEL
				</Button>

				<Button themeType="primary" disabled={isLoading} onClick={handleTaskSubmit}>
					{isLastStep ? 'SUBMIT' : 'NEXT'}
				</Button>
			</div>
		</div>
	);
}

export default ExecuteStep;
