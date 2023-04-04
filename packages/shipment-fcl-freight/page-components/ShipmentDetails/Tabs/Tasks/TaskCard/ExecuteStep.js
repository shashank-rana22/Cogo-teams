import { Button } from '@cogoport/components';

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
		finalConfig,
		// controls,
		// showElements,
		// error,
		// fields,
		// handleSubmit,
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

	const handleClick = () => {
		console.log('this is handle click', finalConfig, refetch, uiConfig);
	};

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				{/* <FormLayout
					controls={controls}
					fields={fields}
					errrors={error}
					showElements={showElements}
				/> */}
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
			</div>
		</div>
	);
}

export default ExecuteStep;
