import { Layout } from '@cogoport/air-modules';
import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState, useEffect } from 'react';

import awbControls from '../../configurations/awb-controls';
import AWBDocument from '../AWBDocument';

import styles from './styles.module.css';

function EditAWB({
	item = {},
	edit = false,
	setEdit = () => {},
	listAPI = () => {},
	editCopies = '',
	setEditCopies = () => {},
}) {
	const [preview, setPreview] = useState(false);
	const [formData, setFormData] = useState({});

	const { control, handleSubmit, setValue, watch, formState:{ errors } } = useForm();

	const formValues = watch();

	const onSubmit = (value) => {
		setFormData(value);
		setPreview(true);
		setEdit(false);
	};

	useEffect(() => {
		const taskItem = {
			...item,
			...item?.documentData,
		};
		awbControls.forEach((c) => {
			setValue(c.name, taskItem[c.name]);
		});
	}, [item, setValue]);

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
				<Modal.Header title="Edit AWB" />
				<Layout fields={awbControls} control={control} errors={errors} />
				<div className={styles.modal_footer}>
					<Button
						size="md"
						themeType="secondary"
						style={{ marginRight: 12 }}
						onClick={() => { setEdit(false); }}
					>
						Cancel
					</Button>
					<Button size="md" onClick={handleSubmit(onSubmit)}>
						Preview
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
					editCopies={editCopies}
					setEditCopies={setEditCopies}
				/>
			)}
		</>
	);
}

export default EditAWB;
