import { Button } from '@cogoport/components';
import { Layout } from '@cogoport/ocean-modules';
import { isEmpty } from '@cogoport/utils';
import { useRef, useState, useEffect } from 'react';

import useGetCommodityOptions from '../../../hooks/useGetCommodityOptions';

import ApprovalModal from './ApprovalModal';
import BookingPreferenceCard from './CustomTasks/UploadBookingNote/components/Step0/BookingPreferenceCard';
import EditBookingParams from './EditBookingParams';
import { getCanShipmentRollover } from './helpers/getCanShipmentRollover';
import useHandleSubmit from './helpers/useHandleSubmit';
import useStepExecution from './helpers/useStepExecution';
import RestrictTask from './RestrictTask';
import styles from './styles.module.css';
import prefillChanges from './utils/prefillChanges';

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
	isSeawayAndMarkConfirm = false,
}) {
	const [showApprovalModal, setShowApprovalModal] = useState(false);
	const [approvalChanges, setApprovalChanges] = useState({});

	const { options, allCommodity } = useGetCommodityOptions({ task });

	const {
		formProps,
		fields,
		showElements,
		restrictTask,
		setRestrictTask,
		toastMessage,
	} = useStepExecution({
		task,
		stepConfig,
		getApisData,
		selectedMail,
		options,
		allCommodity,
	});

	const { control, formState: { errors }, handleSubmit, watch, setValue } = formProps;

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

	const handleApiSubmit = async () => {
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
		setShowApprovalModal(false);
	};

	const handleTaskSubmit = () => {
		const changes = prefillChanges({
			config     : stepConfig,
			formValues : watch(),
		});

		if (!isEmpty(changes) && isEmpty(errors)) {
			setApprovalChanges(changes);
			setShowApprovalModal(true);
		} else {
			handleApiSubmit();
		}
	};
	useEffect(() => {
		if (isSeawayAndMarkConfirm) {
			setValue('bl_type', 'seaway');
		}
	}, [isSeawayAndMarkConfirm, setValue]);

	if (restrictTask) {
		return (
			<RestrictTask
				task={task}
				restrict={restrictTask}
				setRestrictTask={setRestrictTask}
				onCancel={onCancel}
				toastMessage={toastMessage}
			/>
		);
	}

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
					isSeawayAndMarkConfirm={isSeawayAndMarkConfirm}
					setValue={setValue}
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

			{showApprovalModal ? (
				<ApprovalModal
					approvalChanges={approvalChanges}
					showModal={showApprovalModal}
					loading={isLoading}
					handleApprove={handleApiSubmit}
					setShowModal={setShowApprovalModal}
				/>
			) : null}
		</div>

	);
}

export default ExecuteStep;
