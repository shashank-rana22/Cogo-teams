import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import Layout from '../../commons/Layout';
import repositoryControls from '../../configurations/repository-controls';
import useHandleRepository from '../../hooks/useHandleRepository';

import styles from './styles.module.css';

type TypeObject = string | Array<object> | object[] | React.FC ;
interface NestedObj {
	[key: string]: TypeObject;
}

interface ModalProps {
	showModal: boolean;
	setShowModal: React.FC;
	listRepository: React.FC;
	item:NestedObj;
	edit:boolean;
	setEdit:React.FC;
}

function RepositoryModal({
	showModal = false,
	setShowModal = () => {},
	listRepository = () => {},
	item = {},
	edit = false,
	setEdit = () => {},
}:ModalProps) {
	const { handleRepository, loading } = useHandleRepository(edit);

	const { control, handleSubmit, setValue, watch, formState:{ errors } } = useForm();
	const fields = repositoryControls();
	const mode = watch('booking_mode');

	const onSubmit = (values) => {
		const pocData = (values.pocs_data || []).map((poc) => {
			const pocDataItem = ({
				name                : poc?.name,
				email               : poc?.email,
				mobile_country_code : poc?.mobile?.country_code,
				mobile_number       : poc?.mobile?.number,
			});
			return pocDataItem;
		});

		const payload = { ...values, pocs_data: pocData, id: item?.id, action_name: edit ? 'update' : undefined };
		handleRepository({ payload, listRepository, setShowModal }).then(() => {
			if (edit) {
				setEdit(false);
			}
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

			const pocData = (item.pocs_data || []).map((poc) => {
				const pocDataItem = ({
					name   : poc?.name,
					email  : poc?.email,
					mobile : { country_code: poc?.mobile_country_code, number: poc?.mobile_number },
				});
				return pocDataItem;
			});
			setValue('pocs_data', pocData);
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
			{['email', 'email_and_platform'].includes(mode) && (
				<>
					<div className={styles.modal_header} style={{ marginTop: 24 }}>E-mail Information</div>
					<Layout fields={fields.email} control={control} errors={errors} />
				</>
			)}
			{['platform', 'email_and_platform'].includes(mode) && (
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
