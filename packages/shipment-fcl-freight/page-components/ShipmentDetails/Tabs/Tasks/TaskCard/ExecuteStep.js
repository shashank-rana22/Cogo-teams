import { Button } from '@cogoport/components';

import Layout from './helpers/Layout';
import useStepExecution from './helpers/useStepExecution';
import styles from './styles.module.css';

function ExecuteStep({
	task = {},
	stepConfig = {},
	onCancel = () => {},
	refetch = () => {},
	isLastStep = false,
	primaryService = {},
	getApisData = {},
	uiConfig = {},
}) {
	const {
		formProps,
		// error,
		fields,
		isLoading,
		// setIsLoading,
		// onError,
	} = useStepExecution({
		task,
		stepConfig,
		primaryService,
		getApisData,
		// selectedMail,
	});
	const { control, error } = formProps;

	console.log('fields', fields, uiConfig, refetch);

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<Layout
					fields={fields}
					control={control}
					errrors={error}
					// showElements={showElements}
				/>
			</div>

			<div className={styles.button_wrap}>
				<Button
					className="secondary md"
					onClick={() => onCancel()}
					disabled={isLoading}
				>
					CANCEL
				</Button>

				<Button disabled={isLoading}>
					{isLastStep ? 'SUBMIT' : 'NEXT'}
				</Button>
			</div>
		</div>
	);
}

export default ExecuteStep;
