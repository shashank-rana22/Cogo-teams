import { Button } from '@cogoport/components';
import { Layout } from '@cogoport/ocean-modules';
import { isEmpty } from '@cogoport/utils';
import { useRef } from 'react';

import BookingPreferenceCard from './CustomTasks/UploadBookingNote/components/Step0/BookingPreferenceCard';
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

	const { state = '', service_type = '', task: taskName = '' } = task;

	const showBookingPreference = (
		state === 'awaiting_service_provider_confirmation'
		&& service_type === 'fcl_freight_service'
		&& taskName === 'mark_confirmed'
	);

	const { list_shipment_booking_confirmation_preferences: list = [] } = getApisData;

	const selectedPriority = list?.find((item) => item?.priority === item?.selected_priority);

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

	const handleTaskSubmit = async () => {
		if (isShipmentRolloverable && editBookingParams) {
			setIsLoading(true);

			try {
				await editParams.current?.handleSubmit();
				handleSubmit(onSubmit)();
			} finally {
				setIsLoading(false);
			}
		} else {
			handleSubmit(onSubmit)();
		}
	};

	return (
		<div className={styles.container}>
			{showBookingPreference && !isEmpty(selectedPriority) ? (
				<BookingPreferenceCard item={selectedPriority} isProceedEnabled={false} />
			) : null }

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
