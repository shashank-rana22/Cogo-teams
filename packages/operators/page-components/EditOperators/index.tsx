import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import Layout from '../../common/Layout';
import fields from '../../configurations/controls';
import useEditOperators from '../../hooks/useEditOperators';

import styles from './styles.module.css';

function EditOperators({
	item,
	edit,
	setEdit,
	refetch,
	setPage,
	setFinalList,
	page,
}) {
	const { control, watch, handleSubmit, setValue, formState:{ errors } } = useForm();

	const operatorType = watch('operator_type');

	const showElements = {
		iata_code          : operatorType === 'airline',
		icao_code          : operatorType === 'airline',
		airway_bill_prefix : operatorType === 'airline',
		is_nvocc           : operatorType === 'shipping_line',
	};

	const {
		handleEditOperators,
		loading,
	} = useEditOperators({
		setEdit,
		refetch,
		item,
		setPage,
		setFinalList,
		page,
	});

	(fields || []).forEach((ctrl, index) => {
		if (ctrl.name === 'operator_type') {
			fields[index].disabled = true;
		}
	});

	console.log('item', item);

	useEffect(() => {
		if (edit) {
			setValue('logo_url', '');
			fields.forEach((c) => {
				setValue(c.name, item[c.name]);
			});

			// console.log('item.logo_url', item.logo_url);

			setValue('is_nvocc', String(item.is_nvocc));
			// setValue('logo_url', String(item.logo_url));
		}
	}, [item, edit, setValue]);

	return (
		<Modal
			show={edit}
			onClose={() => { setEdit(false); }}
			className={styles.modal_container}
		>
			<div className={styles.modal_header}>
				Edit Operators
			</div>
			<Layout
				fields={fields}
				control={control}
				errors={errors}
				showElements={showElements}
			/>
			<div className={styles.modal_footer}>
				<Button
					size="md"
					themeType="secondary"
					disabled={loading}
					style={{ marginRight: 12 }}
					onClick={() => { setEdit(false); }}
				>
					Cancel
				</Button>
				<Button size="md" disabled={loading} onClick={handleSubmit(handleEditOperators)}>
					Apply
				</Button>
			</div>
		</Modal>
	);
}

export default EditOperators;
