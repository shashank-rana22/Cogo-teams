import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import Layout from '../../common/Layout';
import fields from '../../configurations/controls';
import useCreateOperators from '../../hooks/useCreateOperators';

import styles from './styles.module.css';

function CreateOperators({
	show,
	setShow,
	refetch,
	setPage,
	setFinalList,
	page,
}) {
	const { control, watch, handleSubmit, formState:{ errors } } = useForm();

	const operatorType = watch('operator_type');

	const showElements = {
		iata_code          : operatorType === 'airline',
		icao_code          : operatorType === 'airline',
		airway_bill_prefix : operatorType === 'airline',
		status             : false,
		is_nvocc           : operatorType === 'shipping_line',
	};

	const {
		handleCreateOperators,
		loading,
	} = useCreateOperators({
		setShow,
		refetch,
		setPage,
		setFinalList,
		page,
	});

	(fields || []).forEach((ctrl, index) => {
		if (ctrl.name === 'operator_type') {
			fields[index].disabled = false;
		}
	});

	return (
		<Modal
			show={show}
			onClose={() => { setShow(false); }}
			className={styles.modal_container}
		>
			<div className={styles.modal_header}>
				Create Operators
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
				<Button size="md" disabled={loading} onClick={handleSubmit(handleCreateOperators)}>
					Apply
				</Button>
			</div>
		</Modal>
	);
}

export default CreateOperators;
