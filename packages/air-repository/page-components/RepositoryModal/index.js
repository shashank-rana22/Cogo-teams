import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

import Layout from '../../commons/Layout';
import repositoryControls from '../../configurations/repository-controls';
import useHandleRepository from '../../hooks/useHandleRepository';

import styles from './styles.module.css';

function RepositoryModal({
	showModal = false,
	setShowModal = () => {},
	listRepository = () => {},
	item = {},
	edit = false,
	setEdit = () => {},
}) {
	const { t } = useTranslation(['airRepository']);
	const { handleRepository, loading } = useHandleRepository(edit);

	const { control, handleSubmit, setValue, watch, formState:{ errors } } = useForm();
	const fields = repositoryControls(t);
	const mode = watch('booking_mode');

	const dataPayload = (poc) => ({
		name                : poc?.name,
		email               : poc?.email,
		mobile_country_code : poc?.mobile?.country_code,
		mobile_number       : poc?.mobile?.number,
	});

	const onSubmit = (values) => {
		const pocData = (values.pocs_data || []).map((poc) => dataPayload(poc));

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
				{edit ? t('airRepository:edit_text') : t('airRepository:create_text')}
				{' '}
				{t('airRepository:repository')}
			</div>
			<Layout fields={fields.basic} control={control} errors={errors} />
			{['email', 'email_and_platform'].includes(mode) && (
				<>
					<div className={styles.modal_header} style={{ marginTop: 24 }}>
						{t('airRepository:e-mail_information')}
					</div>
					<Layout fields={fields.email} control={control} errors={errors} />
				</>
			)}
			{['platform', 'email_and_platform'].includes(mode) && (
				<>
					<div className={styles.modal_header} style={{ marginTop: 24 }}>
						{t('airRepository:platform_information')}
					</div>
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
					{t('airRepository:cancel_button')}
				</Button>
				<Button size="md" disabled={loading} onClick={handleSubmit(onSubmit)}>
					{t('airRepository:apply_button')}
				</Button>
			</div>
		</Modal>
	);
}

export default RepositoryModal;
