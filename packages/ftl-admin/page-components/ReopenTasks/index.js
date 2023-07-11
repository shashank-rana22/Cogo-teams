import { Input, Modal, Button, cl } from '@cogoport/components';
import React, { useState, useEffect, useMemo } from 'react';

import Loader from '../../common/Loader';
import SearchShipment from '../../common/SearchShipment';
import useListShipmentPendingTasks from '../../hooks/useListShipmentPendingTasks';
import useUpdateShipmentPendingTasksStatus from '../../hooks/useUpdateShipmentPendingTasksStatus';

import { ReopenTasksContext } from './context';
import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

function ReopenTasks() {
	const [selectedTasks, setSelectedTasks] = useState(new Map());
	const [showModal, setShowModal] = useState(false);

	const {
		loading,
		getPendingTasks,
		data: pendingTasks,
		setFilters,
	} = useListShipmentPendingTasks();
	const { updatingTasks, updateTasks } = useUpdateShipmentPendingTasksStatus();

	const contextValue = useMemo(
		() => ({ selectedTasks, setSelectedTasks }),
		[selectedTasks, setSelectedTasks],
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		const val = new FormData(e.target);
		const payload = Array.from(val?.entries())?.reduce((acc, [taskId, remark]) => (
			[...acc, {
				pending_task_id  : taskId,
				reopening_reason : remark,
				shipment_id      : selectedTasks?.get(taskId)?.shipment_id,
			}]), []);

		updateTasks({ objects: payload }, () => { getPendingTasks(); setShowModal(false); });
	};

	useEffect(() => {
		setSelectedTasks(new Map());
	}, [pendingTasks]);

	return (
		<div>
			<SearchShipment
				setFilters={setFilters}
				keyName="serial_id"
				isMultiSelect={false}
				lowerLabel="choose serial id"
				placeholder="choose SID"
				upperLabel="Select SID"
			/>
			{loading
				? <Loader />
				: (
					<ReopenTasksContext.Provider value={contextValue}>
						<ShipmentList
							data={pendingTasks}
							loading={loading}
							setFilters={setFilters}
							setShowModal={setShowModal}
						/>
					</ReopenTasksContext.Provider>
				)}

			<Modal show={showModal} placement="top" size="xl" onClose={() => setShowModal(false)}>
				<Modal.Header title="Provide Remark" />
				<form onSubmit={handleSubmit}>
					<Modal.Body style={{ maxHeight: '500px', minHeight: '300px' }}>
						<div className={styles.remark_wrapper}>
							<span className={cl`${styles.serial_id} ${styles.bold}`}>
								Task Name
							</span>
							<span className={styles.bold}>Remark</span>
						</div>

						{Array.from(selectedTasks)?.map(([taskId, task]) => (
							<div key={`remark_row_${taskId}`} className={styles.remark_wrapper}>
								<span className={cl`${styles.serial_id} ${styles.bold}`}>
									{task?.label || task?.task?.split('_')?.join(' ')}
								</span>
								<Input name={taskId} placeholder="Add remark ..." required />
							</div>
						))}
					</Modal.Body>

					<Modal.Footer>
						<div className={styles.actions}>
							<div className={styles.cancel}>
								<Button
									onClick={() => setShowModal(false)}
									disabled={updatingTasks}
									themeType="secondary"
								>
									Cancel
								</Button>
							</div>

							<div>
								<Button
									disabled={updatingTasks}
									type="submit"
									themeType="accent"
								>
									Submit
								</Button>
							</div>
						</div>
					</Modal.Footer>
				</form>
			</Modal>
		</div>
	);
}

export default ReopenTasks;
