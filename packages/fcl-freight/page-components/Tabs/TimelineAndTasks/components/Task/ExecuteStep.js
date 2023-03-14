import React, { useState } from 'react';
import { Modal, Button } from '@cogoport/front/components/admin';
import { useStepExecuton } from '../../hooks/useTaskExecution';
import useHandleSubmit from '../../hooks/useHandleSubmit';
import FormLayout from '../../../commons/Layout';
import ConfirmationModal from './ConfirmationModal/index';
import styles from './styles.module.css';

function ExecuteStep({
	task = {},
	stepConfig = {},
	onCancel = () => {},
	refetch = () => {},
	shipment_data = {},
	isLastStep,
	currentStep = 0,
	serviceIdMapping = {},
	getApisData = {},
	timeLineRefetch = () => {},
	selectedMail = {},
	uiConfig = {},
}) {
	const {
		finalConfig,
		controls,
		showElements,
		error,
		fields,
		handleSubmit,
		isLoading,
		setIsLoading,
		onError,
	} = useStepExecuton({
		task,
		stepConfig,
		shipment_data,
		getApisData,
		selectedMail,
	});

	const { handleSubmit: handleSubmitTask } = useHandleSubmit({
		finalConfig,
		task,
		onCancel,
		refetch,
		shipment_data,
		setIsLoading,
		serviceIdMapping,
		currentStep,
		isLastStep,
		getApisData,
		timeLineRefetch,
		showElements,
	});

	const requiresConfirmationModal = uiConfig.confirmation?.required;

	const handleSubmitClick = async () => {
		if (stepConfig.end_point || isLastStep) {
			await handleSubmit(handleSubmitTask, onError)();
		}
	};

	const handleClick = () => {
		if (requiresConfirmationModal) {
			setShowModal(true);
		} else {
			handleSubmitClick();
		}
	};

	const [showModal, setShowModal] = useState(false);

	return (
		<div>
			<div className={styles.form}>
				<FormLayout
					controls={controls}
					fields={fields}
					errors={error}
					showElements={showElements}
				/>
			</div>
			<div className={styles.button_wrap}>
				<Button
					className="secondary md"
					onClick={() => onCancel()}
					disabled={isLoading}
				>
					cancel
				</Button>

				<Button disabled={isLoading} onClick={handleClick}>
					{isLastStep ? 'Submit' : 'Next'}
				</Button>

				{showModal ? (
					<Modal
						show={showModal}
						onClose={() => setShowModal(false)}
						closable={false}
						withAnimation
					>
						<ConfirmationModal
							isLoading={isLoading}
							triggerFunction={handleSubmitClick}
							label={task.label}
							setShowModal={setShowModal}
							confirmation={uiConfig?.confirmation}
						/>
					</Modal>
				) : null}
			</div>
		</div>
	);
}

export default ExecuteStep;
