import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

import Layout from '../../common/Layout';
import fields from '../../configurations/controls';
import useHandleOperators from '../../hooks/useHandleOperators';

import styles from './styles.module.css';

const showElements = (type) => ({
	iata_code          : type === 'airline',
	icao_code          : type === 'airline',
	airway_bill_prefix : type === 'airline',
	is_nvocc           : type === 'shipping_line',
});

function OperatorsModal({
	item = {},
	setItem = () => {},
	show = false,
	setShow = () => {},
	edit = false,
	setEdit = () => {},
	refetch = () => {},
	setPage = () => {},
	setFinalList = () => {},
	page = 1,
}) {
	const { t } = useTranslation(['operators']);

	const { control, watch, handleSubmit, setValue, formState:{ errors } } = useForm();

	const operatorType = watch('operator_type');

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

	const fieldControls = fields(t);

	(fieldControls || []).forEach((ctrl, index) => {
		if (ctrl.name === 'operator_type') {
			fieldControls[index].disabled = edit;
		}
	});

	useEffect(() => {
		if (edit) {
			fieldControls.forEach((c) => {
				setValue(c.name, item[c.name]);
			});
			setValue('is_nvocc', String(item.is_nvocc));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item, edit, setValue]);

	return (
		<Modal
			show={show}
			onClose={() => { setShow(false); setEdit(false); setItem({}); }}
			className={styles.modal_container}
		>
			<Modal.Header title={`${edit
				? t('operators:operators_modal_edit_operator')
				: t('operators:operators_modal_create_operator')} ${t('operators:operators_modal_function_operator')}`}
			/>
			<Layout
				fields={fieldControls}
				control={control}
				errors={errors}
				showElements={{ ...showElements(operatorType), status: edit }}
			/>
			<div className={styles.modal_footer}>
				<Button
					size="md"
					themeType="secondary"
					disabled={loading}
					style={{ marginRight: 12 }}
					onClick={() => { setShow(false); setEdit(false); setItem({}); }}
				>
					{t('operators:cancel_button')}
				</Button>
				<Button
					size="md"
					disabled={loading}
					onClick={handleSubmit(handleOperators)}
				>
					{t('operators:apply_button')}
				</Button>
			</div>
		</Modal>
	);
}

export default OperatorsModal;
