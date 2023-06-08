import { Button } from '@cogoport/components';
import { Layout } from '@cogoport/surface-modules';

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
	const { formProps, fields, showElements } = useStepExecution({
		task,
		stepConfig,
		getApisData,
		selectedMail,
	});

	const { control, formState: { errors }, handleSubmit, watch } = formProps;

	const { loading: isLoading, onSubmit } = useHandleSubmit({
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

	const formValues = watch();

	return (
		<div className={styles.task_container}>
			<div className={styles.form}>
				<Layout
					fields={fields}
					control={control}
					errors={errors}
					showElements={showElements}
					formValues={formValues}
				/>
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					onClick={onCancel}
					disabled={isLoading}
				>
					CANCEL
				</Button>

				<Button
					themeType="primary"
					disabled={isLoading}
					onClick={handleSubmit(onSubmit)}
				>
					{isLastStep ? 'SUBMIT' : 'NEXT'}
				</Button>
			</div>
		</div>
	);
}

export default ExecuteStep;
