import EmptyState from '@cogoport/air-modules/common/EmptyState';
import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import useTask from '../../../hooks/useTask';
import Card from '../Card';
import Header from '../Header';
import LoadingState from '../LoadingState';
import TaskExecution from '../TaskExecution';

import styles from './styles.module.css';

const DISABLE_TASK = [
	'upload_mawb_freight_certificate',
	'upload_hawb_freight_certificate',
];

function TaskView() {
	const {
		shipment_data,
		primary_service,
		servicesList,
		refetch: getShipment = () => {},
		getShipmentTimeline = () => {},
		isGettingShipment,
	} = useContext(ShipmentDetailContext);

	const incoTerm = shipment_data?.inco_term;
	const tradeType = GLOBAL_CONSTANTS.options.inco_term[incoTerm]?.trade_type
		|| primary_service.trade_type;

	const {
		count = 0,
		completedTaskCount = 0,
		tasksList = [],
		loading = true,
		taskListRefetch = () => {},
		hideCompletedTasks = false,
		setHideCompletedTasks = () => {},
		handleClick = () => {},
		selectedTaskId,
		setSelectedTaskId = () => {},
		showMyTasks = true,
		setShowMyTasks = () => {},
		selectedMail = [],
		setSelectedMail = () => {},
	} = useTask({ shipment_data, isGettingShipment });

	const handleDisableTaskButton = () => (tasksList || []).map((item) => {
		const element = item;

		if (
			element?.service_type === 'air_freight_service'
				&& shipment_data?.shipment_type === 'air_freight'
		) {
			if (element?.task === 'update_airway_bill_number') {
				element.disabled = (tasksList || []).some(
					(task) => task?.task === 'mark_confirmed'
							&& task?.status === 'pending'
							&& task?.service_type === 'air_freight_service',
				);
			}
			if (element?.task === 'update_flight_details') {
				element.disabled = (tasksList || []).some(
					(task) => task?.task === 'update_airway_bill_number'
							&& task?.status === 'pending',
				);
			}
			if (
				element?.task === 'cargo_handover_at_origin_terminal'
					&& tradeType === 'export'
			) {
				element.disabled = (tasksList || []).some(
					(task) => DISABLE_TASK.includes(task?.task)
							&& task?.status === 'pending'
							&& task?.service_type === 'air_freight_service',
				);
			}
			if (
				element?.task === 'mark_confirmed'
				&& tradeType === 'export'
			) {
				element.disabled = (tasksList || []).some(
					(task) => task?.task === 'confirm_service_provider'
							&& task?.status === 'pending'
							&& task?.service_type === 'air_freight_service',
				);
			}
		}

		return element;
	});
	handleDisableTaskButton();

	return (
		<div>
			<Header
				count={count}
				completedTaskCount={completedTaskCount}
				hideCompletedTasks={hideCompletedTasks}
				setHideCompletedTasks={setHideCompletedTasks}
				showMyTasks={showMyTasks}
				setShowMyTasks={setShowMyTasks}
				shipment_data={shipment_data}
				servicesList={servicesList}
			/>
			{loading ? <LoadingState /> : null}

			{isEmpty(tasksList) && !loading ? <EmptyState /> : null}

			{!isEmpty(tasksList) && !loading ? (
				<>
					{selectedTaskId ? (
						<Button
							className={styles.see_all_tasks}
							onClick={() => setSelectedTaskId(null)}
							themeType="link"
							size="md"
						>
							<IcMArrowBack width={50} />

							<div style={{ width: 200 }}>See All Tasks</div>
						</Button>
					) : (tasksList || []).map((task) => (
						<Card
							key={task?.id}
							task={task}
							handleClick={handleClick}
							refetch={taskListRefetch}
							servicesList={servicesList}
						/>
					)) }

					{selectedTaskId ? (
						<>
							<Card
								task={tasksList?.find((task) => task.id === selectedTaskId)}
								handleClick={handleClick}
								isTaskOpen
								loading={loading}
								servicesList={servicesList}
							/>

							<TaskExecution
								task={tasksList?.find((task) => task.id === selectedTaskId)}
								onCancel={() => setSelectedTaskId(null)}
								taskListRefetch={taskListRefetch}
								selectedMail={selectedMail}
								setSelectedMail={setSelectedMail}
								shipment_data={shipment_data}
								primary_service={primary_service}
								getShipment={getShipment}
								getShipmentTimeline={getShipmentTimeline}
							/>
						</>
					) : null }
				</>
			) : null}
		</div>
	);
}

export default TaskView;
