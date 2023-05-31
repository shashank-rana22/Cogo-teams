import { Loader } from '@cogoport/components';
import { useEffect } from 'react';

import useGetTaskConfig from '../../../hooks/useGetTaskConfig';

import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';
import styles from './styles.module.css';

function ExecuteTask({
	task = {},
	refetch = () => {},
	onCancel = () => {},
	servicesLoading = false,
	primary_service = {},
	servicesList = [],
}) {
	const { taskConfigData, loading, getTaskConfigTrigger } = useGetTaskConfig({ task, servicesLoading });

	useEffect(() => {
		if (servicesList.length) {
			getTaskConfigTrigger();
		}
	}, [servicesList, getTaskConfigTrigger]);
	const {
		steps,
		currentStep,
		setCurrentStep,
		serviceIdMapping,
	} = useTaskExecution({ task, taskConfigData, primary_service, servicesList });

	const stepConfigValue = steps.length
		? steps[currentStep] || steps[steps.length - 1]
		: {};

	if (loading || servicesLoading) {
		return (
			<div className={styles.loading_container}>
				<div>Getting Tasks...</div>
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}
	return (
		<ExecuteStep
			task={task}
			stepConfig={stepConfigValue}
			onCancel={onCancel}
			refetch={refetch}
			primary_service={primary_service}
			isLastStep={currentStep === steps.length - 1}
			currentStep={currentStep}
			setCurrentStep={setCurrentStep}
			getApisData={taskConfigData?.apis_data}
			uiConfig={taskConfigData?.task_config?.ui_config[currentStep]}
			serviceIdMapping={serviceIdMapping}
		/>
	);
}

export default ExecuteTask;
