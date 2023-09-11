import { Modal, Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React, { useState, useRef } from 'react';

import LevelForm from '../../Controller/CustomTable/ColumnCard/LevelForm';
import useCreateRequest from '../hooks/useCreateLevel';

import CreateRequest from './CreateRequest';
import Heading from './Header';
import styles from './styles.module.css';

function CreateLevelModal({
	refetch = () => {},
}) {
	const { t } = useTranslation(['incidentManagement']);
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
							title={t('incidentManagement:create_level_title')}
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
						{t('incidentManagement:cancel_btn')}
					</Button>
					<Button
						size="md"
						loading={loading || updating}
						onClick={onSubmit}
					>
						{t('incidentManagement:create_btn')}
					</Button>
				</Modal.Footer>
			</Modal>
			<Button onClick={() => { setShowCreateModal(true); }}>
				{t('incidentManagement:create_btn')}
			</Button>
		</>
	);
}

export default CreateLevelModal;
