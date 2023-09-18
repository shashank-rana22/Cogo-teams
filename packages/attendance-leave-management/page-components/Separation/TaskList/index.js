import { TASK_LIST } from '../../../utils/constants';
import Stepper from '../Stepper';

import styles from './styles.module.css';

function TaskList({ view_type = 'hrbp_clearance', apiData = {}, setCurrentComponent = () => {} }) {
	const stepperArr = view_type === 'hrbp_clearance' ? TASK_LIST
		: TASK_LIST.filter((val) => val.view_type === view_type);

	const handleCurrentTask = (currentTask) => {
		setCurrentComponent(currentTask);
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>TASK LIST</div>
			<div className={styles.sub_title}>Status of the related tasks</div>
			<div className={styles.details}>
				<Stepper
					items={stepperArr}
					direction="vertical"
					data={apiData}
					handleCurrentTask={handleCurrentTask}
				/>
			</div>
		</div>
	);
}

export default TaskList;
