import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import Layout from '../../commons/Layout';
import repositoryControls from '../../configurations/repository-controls';
import useHandleRepository from '../../hooks/useHandleRepository';

import styles from './styles.module.css';

interface NestedObj {
	[key: string]: string;
}

interface ModalProps {
	showModal: boolean;
	setShowModal: React.FC;
	listRepository: React.FC;
	item:NestedObj;
	edit:boolean;
	setEdit:React.FC;
}

function RepositoryModal({ showModal, setShowModal, listRepository, item, edit, setEdit }:ModalProps) {
	const { handleRepository, loading } = useHandleRepository(edit);

	const { control, handleSubmit, setValue, watch, formState:{ errors } } = useForm();
	const fields = repositoryControls();
	const mode = watch('mode');

	const onSubmit = (values) => {
		const payload = { ...values, id: item?.id, action_name: edit ? 'update' : undefined };
		handleRepository(payload, listRepository).then(() => {
			if (edit) {
				setEdit(false);
			}
			setShowModal(false);
		});
	};

	const finalFields = [
		...fields.basic,
		...fields.email,
		...fields.platform,
	];

	useEffect(() => {
		if (edit) {
			finalFields.forEach((c) => {
				setValue(c.name, item[c.name]);
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Modal
			show={showModal}
			onClose={() => { setShowModal(false); setEdit(false); }}
			className={styles.modal_container}
		>
			<div className={styles.modal_header}>
				{edit ? 'Edit' : 'Create'}
				{' '}
				Repository
			</div>
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
					onClick={() => { setShowModal(false); setEdit(false); }}
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
