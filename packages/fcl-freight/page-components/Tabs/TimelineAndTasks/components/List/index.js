import React, { useEffect, useState } from 'react';
import { startCase } from '@cogoport/front/utils';
import useGetPendingTasks from '../../hooks/useGetPendingTaks';
import TaskCard from '../Task';
import Header from './Header';
import CardHeader from './CardHeader';
import styles from './styles.module.css';

const List = ({
	taskId,
	timeLineRefetch = () => {},
	servicesList = [],
	servicesLoading = false,
	refetchServices = () => {},
}) => {
	console.log('task id', taskId);
	console.log('timeLineRefetch', timeLineRefetch);
	console.log('servicesList', servicesList);
	console.log('servicesLoading', servicesLoading);
	console.log('refetchServices', refetchServices);

	const {
		refetch,
		showCompletedTask,
		setShowCompletedTask,
		showMyTasks,
		setMyTasks,
		loading,
		handleClick,
		pendingTask,
		setPendingTask,
		completed_count,
		tasksToShow,
		primary_service,
		shipment_data,
		tasks,
		selectedMail,
		setSelectedMail,
	} = useGetPendingTasks({ taskId });

	const [activeTab, setActiveTab] = useState(shipment_data?.source);

	let firstPendingTaskIndex = null;
	const handlePendingTaskIndex = () => {
		return (tasksToShow || []).forEach((item, i) => {
			if (firstPendingTaskIndex !== null) {
				return;
			}
			if (item?.status === 'pending') {
				firstPendingTaskIndex = i;
			}
		});
	};
	handlePendingTaskIndex();

	useEffect(() => {
		handlePendingTaskIndex();
	}, [tasks?.length]);

	const selectedTaskId = Object.keys(pendingTask || {})?.[0] || taskId;

	const handleTabChange = (val) => {
		setActiveTab(val);
	};

	const renderTasksComponent = () => {
		return (
			<div className={styles.container}>
				{selectedTaskId ? null : (
					<Header
						completed_count={completed_count}
						showCompletedTask={showCompletedTask}
						setShowCompletedTask={setShowCompletedTask}
						tasks={tasksToShow}
						tasksCount={tasks.length}
						showMyTasks={showMyTasks}
						setMyTasks={setMyTasks}
						loading={loading || servicesLoading}
						servicesList={servicesList}
						shipment_data={shipment_data}
						primary_service={primary_service}
					/>
				)}

				{selectedTaskId && !taskId ? (
					<div class={styles.see_all_tasks} onClick={() => setPendingTask(null)}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/arrow.svg"
							alt="arrow"
						/>
						<div>See All Tasks</div>
					</div>
				) : null}

				{loading || servicesLoading ? (
					<div className={styles.loading_container}>
						<div className={styles.custom_skeleton} />
						<div className={styles.custom_skeleton} />
						<div className={styles.custom_skeleton} />
						<div className={styles.custom_skeleton} />
					</div>
				) : (
					<div>
						{!selectedTaskId
							? (tasksToShow || []).map((task, index) => {
									return (
										<CardHeader
											task={task}
											handleClick={handleClick}
											show={pendingTask?.[task.id]}
											index={index}
											firstPendingTaskIndex={firstPendingTaskIndex}
											refetch={refetch}
											services={servicesList}
											shipment_data={shipment_data}
											primary_service={primary_service}
										/>
									);
							  })
							: null}

						{selectedTaskId ? (
							<>
								<CardHeader
									task={tasks?.find((task) => task.id === selectedTaskId)}
									handleClick={handleClick}
									show={pendingTask[selectedTaskId]}
									refetch={refetch}
									selectedTaskId={selectedTaskId}
									services={servicesList}
								/>
								<TaskCard
									task={tasks?.find((task) => task.id === selectedTaskId)}
									onCancel={() => {
										setPendingTask(null);
									}}
									refetch={refetch}
									tasksLoading={loading}
									shipment_data={shipment_data}
									primary_service={primary_service}
									services={servicesList}
									timeLineRefetch={timeLineRefetch}
									selectedMail={selectedMail}
									setSelectedMail={setSelectedMail}
									refetchServices={refetchServices}
								/>
							</>
						) : null}
					</div>
				)}
			</div>
		);
	};

	return renderTasksComponent();
};

export default List;
