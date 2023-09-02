import { Modal, Button } from '@cogoport/components';
import React, { useState, useRef } from 'react';

import LevelForm from '../../Controller/CustomTable/ColumnCard/LevelForm';
import useCreateRequest from '../hooks/useCreateLevel';

import CreateRequest from './CreateRequest';
import Heading from './Header';
import styles from './styles.module.css';

function CreateLevelModal({
	refetch = () => {},
}) {
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [level, setLevel] = useState(null);
	const ref = useRef();

	const lineItemsRef = useRef();

	const {
		controls, onSubmit, loading, onCancel, updating,
	} = useCreateRequest({ refetch, setShowCreateModal, ref, lineItemsRef });

	return (
		<>
			<Modal
				scroll={false}
				size="lg"
				className={styles.modal_container}
				show={showCreateModal}
				onClose={onCancel}
				placement="center"
			>
				<Modal.Header
					title={(
						<Heading
							title="Create Level"
						/>
					)}
				/>
				{showCreateModal ? (
					<Modal.Body>

						<CreateRequest
							ref={ref}
							controls={controls}
							setLevel={setLevel}
						/>
						<LevelForm ref={lineItemsRef} background="#fff" level={level} />

					</Modal.Body>
				) : null}
				<Modal.Footer>
					<Button
						size="md"
						style={{ marginRight: 10 }}
						themeType="secondary"
						onClick={onCancel}
					>
						Cancel
					</Button>
					<Button
						size="md"
						loading={loading || updating}
						onClick={onSubmit}
					>
						Create
					</Button>
				</Modal.Footer>
			</Modal>
			<Button onClick={() => { setShowCreateModal(true); }}>
				Create
			</Button>
		</>
	);
}

export default CreateLevelModal;
