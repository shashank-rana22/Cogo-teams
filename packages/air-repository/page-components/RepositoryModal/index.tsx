import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import Layout from '../../commons/Layout';
import repositoryControls from '../../configurations/repository-controls';
import useCreateRepository from '../../hooks/useCreateRepository';

import styles from './styles.module.css';

interface ModalProps {
	showModal: boolean;
	setShowModal: React.FC;
	listRepository: React.FC;
}

function RepositoryModal({ showModal, setShowModal, listRepository }:ModalProps) {
	const { createRepository, loading } = useCreateRepository();

	const { control, handleSubmit, reset, setValue, watch, formState:{ errors } } = useForm();
	const fields = repositoryControls();
	const mode = watch('mode');

	const onSubmit = (values) => {
		const payload = { ...values, performed_by_id: '' };
		createRepository(payload, listRepository);
	};

	return (
		<Modal
			show={showModal}
			onClose={() => setShowModal(false)}
			className={styles.modal_container}
		>
			<div className={styles.modal_header}>Create Repository</div>
			<Layout fields={fields.basic} control={control} errors={errors} />
			{['email', 'both'].includes(mode) && (
				<>
					<div className={styles.modal_header} style={{ marginTop: 24 }}>E-mail Information</div>
					<Layout fields={fields.email} control={control} errors={errors} />
				</>
			)}
			{['platform', 'both'].includes(mode) && (
				<>
					<div className={styles.modal_header} style={{ marginTop: 24 }}>Platform Information</div>
					<Layout fields={fields.platform} control={control} errors={errors} />
				</>
			)}
			<div className={styles.modal_footer}>
				<Button
					size="md"
					themeType="secondary"
					disabled={loading}
					style={{ marginRight: 12 }}
					onClick={() => setShowModal(false)}
				>
					Cancel
				</Button>
				<Button size="md" disabled={loading} onClick={handleSubmit(onSubmit)}>
					Apply
				</Button>
			</div>
		</Modal>
	);
}

export default RepositoryModal;
