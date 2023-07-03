import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import Layout from '../../common/Layout';
import fields from '../../configurations/controls';
import useHandleOperators from '../../hooks/useHandleOperators';

import styles from './styles.module.css';

function OperatorsModal({
	item,
	show,
	setShow,
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
		status             : edit,
		is_nvocc           : operatorType === 'shipping_line',
	};

	const {
		handleOperators,
		loading,
	} = useHandleOperators({
		item,
		edit,
		setShow,
		setEdit,
		refetch,
		setPage,
		setFinalList,
		page,
	});

	(fields || []).forEach((ctrl, index) => {
		if (ctrl.name === 'operator_type') {
			fields[index].disabled = edit;
		}
	});

	useEffect(() => {
		if (edit) {
			fields.forEach((c) => {
				setValue(c.name, item[c.name]);
			});
			setValue('is_nvocc', String(item.is_nvocc));
		}
	}, [item, edit, setValue]);

	return (
		<Modal
			show={show}
			onClose={() => { setShow(false); setEdit(false); }}
			className={styles.modal_container}
		>
			<div className={styles.modal_header}>
				{edit ? 'Edit' : 'Create'}
				{' '}
				Operator
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
					onClick={() => { setShow(false); }}
				>
					Cancel
				</Button>
				<Button size="md" disabled={loading} onClick={handleSubmit(handleOperators)}>
					Apply
				</Button>
			</div>
		</Modal>
	);
}

export default OperatorsModal;
