import { Layout } from '@cogoport/air-modules';
import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';
import React, { useState, useEffect } from 'react';

import awbControls from '../../configurations/awb-controls';
import AWBDocument from '../AWBDocument';

import styles from './styles.module.css';

function EditAWB({
	item = {},
	edit = false,
	setEdit = () => {},
	listAPI = () => {},
}) {
	const { t } = useTranslation(['printingDesk']);
	const AWBCONTROLS = awbControls({ t });
	const [preview, setPreview] = useState(false);
	const [formData, setFormData] = useState({});

	const { control, handleSubmit, setValue, watch, formState:{ errors } } = useForm();

	const formValues = watch();

	const onSubmit = (value) => {
		setFormData(value);
		setPreview(true);
	};

	useEffect(() => {
		const taskItem = {
			...item,
			...item?.documentData,
		};
		AWBCONTROLS.forEach((ctrl) => {
			setValue(ctrl.name, taskItem[ctrl.name]);
		});
	}, [AWBCONTROLS, item, setValue]);

	useEffect(() => {
		let totalPackage = 0;
		(formValues.dimension || []).forEach((dimensionObj) => {
			totalPackage += Number(dimensionObj.packages_count);
		});
		setValue('totalPackagesCount', totalPackage || item?.totalPackagesCount);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(formValues.dimension)]);

	return (
		<>
			<Modal
				show={edit}
				onClose={() => { setEdit(false); }}
				className={styles.modal_container}
			>
				<Modal.Header title={t('printingDesk:edit_awb_modal_header')} />
				<Layout fields={AWBCONTROLS} control={control} errors={errors} />
				<div className={styles.modal_footer}>
					<Button
						size="md"
						themeType="secondary"
						style={{ marginRight: 12 }}
						onClick={() => { setEdit(false); }}
					>
						{t('printingDesk:edit_awb_cancel_button')}
					</Button>
					<Button size="md" onClick={handleSubmit(onSubmit)}>
						{t('printingDesk:edit_awb_preview_button')}
					</Button>
				</div>
			</Modal>
			{preview && (
				<AWBDocument
					item={item}
					formData={formData}
					back={preview}
					setBack={setPreview}
					setEdit={setEdit}
					listAPI={listAPI}
				/>
			)}
		</>
	);
}

export default EditAWB;
