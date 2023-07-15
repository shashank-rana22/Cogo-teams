import { Modal, Button } from '@cogoport/components';
import React, { useState, useRef } from 'react';

import LevelForm from '../../Controller/CustomTable/ColumnCard/LevelForm';
import useCreateRequest from '../hooks/useCreateLevel';

import CreateRequest from './CreateRequest';
import Heading from './Header';
import styles from './styles.module.css';

function CreateLevelModal({
	refetch = () => { },
}) {
	const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);

	const {
		controls, formProps, onSubmit, createApi, onCancel, updating,
	} = useCreateRequest({ refetch, setShowCreateRoleModal });
	const { handleSubmit } = formProps;

	const ref = useRef();

	const { loading } = createApi;

	return (
		<>
			<Modal
				scroll={false}
				size="lg"
				className={styles.modal_container}
				show={showCreateRoleModal}
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
				<form
					id="create_form"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Modal.Body>
						<CreateRequest
							formProps={formProps}
							controls={controls}
						/>
						<LevelForm ref={ref} background="#fff" />
					</Modal.Body>
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
							type="submit"
						>
							Create
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
			<Button onClick={() => { setShowCreateRoleModal(true); }}>
				Create
			</Button>
		</>
	);
}

export default CreateLevelModal;
