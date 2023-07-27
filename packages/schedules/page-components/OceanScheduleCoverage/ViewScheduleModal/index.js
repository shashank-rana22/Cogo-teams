import { Modal, Table } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';
import UpdateScheduleModal from './UpdateScheduleModal';

function ViewScheduleModal({ show, setShow, columnsForPattern }) {
	const [update, setUpdate] = useState(false);

	const modelTitle = (
		<div className={styles.heading}>
			Ocean Port Pair Schedule
		</div>
	);

	return (
		<>
			{!update && (
				<Modal
					size="md"
					show={show}
					onClose={() => setShow(null)}
					placement="center"
				>
					<Modal.Header title={modelTitle} />
					<Modal.Body>
						{columnsForPattern && show && (
							<Table
								columns={columnsForPattern}
								data={show?.patterns}
							/>
						)}
					</Modal.Body>
				</Modal>
			)}
			{update && (
				<UpdateScheduleModal setUpdate={setUpdate} update={update} />
			)}
		</>
	);
}
export default ViewScheduleModal;
