import { Button } from '@cogoport/components';
import { ThreeDotLoader } from '@cogoport/ocean-modules';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../EmptyState';
import PendingTasks from '../../PendingTasks/TaskList';

import AccordianTimeline from './AccordianTimeline';
import styles from './styles.module.css';
import CustomTasks from './Tasks';

export function RenderTask({
	taskLoading = false,
	tasks = [],
	usingDefaultPendingTasks = false,
	showDeliveryOrderTask = false,
	taskToSend = [],
	item = {},
	handleAccordionOpen = () => {},
	refetchForTask = () => {},
	shipment_type = '',
	formRef = {},
	setMyForm = () => {},
	MUTATED_CONTROLS = [],
	handleNextAction = () => {},
	actionButton = '',
	currentStep = {},
	taskConfig = {},
}) {
	if (taskLoading) {
		return (
			<div className={styles.loading_container}>
				<ThreeDotLoader message="Loading Tasks" fontSize={16} size={30} />
			</div>
		);
	}

	if (isEmpty(tasks)) {
		return (
			<div>
				<EmptyState
					heading="No Task found !!"
					subHeading="Looks like this task has not been created yet,
					please complete previous tasks first!!"
				/>
			</div>
		);
	}

	return (
		<>
			<div className={styles.form_div}>
				{usingDefaultPendingTasks || showDeliveryOrderTask ? (
					<PendingTasks
						taskList={taskToSend}
						item={item}
						handleAccordionOpen={handleAccordionOpen}
						refetchForTask={refetchForTask}
						tasksLoading={false}
						shipment_type={shipment_type}
					/>
				) : (
					<div className={styles.accordian_container}>
						<AccordianTimeline
							stepCount={currentStep?.count}
							stepsData={taskConfig?.steps}
						/>
						<div className={styles.form_container}>
							<CustomTasks
								ref={formRef}
								setMyForm={setMyForm}
								controls={MUTATED_CONTROLS}
								handleNextAction={handleNextAction}
							/>
						</div>
					</div>
				)}
			</div>

			{usingDefaultPendingTasks ? null : (
				<div className={styles.button_container}>
					<Button onClick={handleNextAction} className="primary lg">
						{actionButton}
					</Button>
				</div>
			)}
		</>
	);
}
