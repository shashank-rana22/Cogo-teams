import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import { Refetch } from '../../../commons/Interfaces';
import useRemoveBpr from '../../../hooks/useRemoveBpr';

import styles from './styles.module.css';

interface Row {
	id?: string;
	businessName?: string;
}

interface RemoveBprParams {
	refetch: Refetch;
	row: Row;
}

function RemoveBpr({ refetch, row } : RemoveBprParams) {
	const { id = '', businessName = 'N/A' } = row || {};
	const [showModal, setShowModal] = useState(false);
	const { dataRemove, loadingOnDelete } = useRemoveBpr({ refetch, id });

	return (
		<>
			<Button
				size="sm"
				onClick={() => setShowModal(!showModal)}
			>
				Remove
			</Button>

			<Modal show={showModal} onClose={() => setShowModal(!showModal)}>

				<Modal.Header title="Remove BPR" />
				<Modal.Body>
					<div className={styles.modal_body}>
						<div className={styles.text}>
							Are you sure you want to remove this Organization Name :
						</div>
						<div className={styles.name}>{businessName}</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						size="sm"
						style={{ marginRight: '10px' }}
						onClick={() => setShowModal(!showModal)}
					>
						Cancel
					</Button>
					<Button
						size="sm"
						onClick={dataRemove}
						loading={loadingOnDelete}
						disabled={loadingOnDelete}
					>
						Remove
					</Button>

				</Modal.Footer>
			</Modal>
		</>
	);
}

export default RemoveBpr;
