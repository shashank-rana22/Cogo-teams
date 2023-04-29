import { Button } from '@cogoport/components';
import React, { useEffect } from 'react';

import getElementController from '../../hooks/getController';
import useEditOperators from '../../hooks/useEditOperators';

import styles from './styles.module.css';

function EditOperators({
	item,
	setEdit,
	refetch,
	setPage,
	setFinalList,
	page,
}) {
	const {
		handleEditOperators,
		control,
		fields,
		setValue,
		handleSubmit,
		showElements,
		onError,
		errors,
		loading,
	} = useEditOperators({
		setEdit,
		refetch,
		item,
		setPage,
		setFinalList,
		page,
	});

	(fields || []).forEach((ctrl:any, index) => {
		if (ctrl.name === 'operator_type') {
			fields[index].disabled = true;
		}
	});

	useEffect(() => {
		fields.forEach((c) => {
			setValue(c.name, item[c.name]);
		});
		setValue('is_nvocc', String(item.is_nvocc));
		setValue('logo_url', String(item.logo_url));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item, fields]);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Edit Operators</div>

			<div className={styles.flex}>
				<form onSubmit={handleSubmit(handleEditOperators, onError)}>
					<div className={styles.content}>
						{fields.map((field) => {
							const show = !(field.name in showElements)
							|| showElements[field.name];
							const { ...rest } = field;
							const Element = getElementController(rest.type);
							return show ? (
								<div className={styles.list}>
									<h4>{field.label}</h4>
									<Element
										width="100%"
										control={control}
										{...rest}
									/>
									<div className={styles.error}>{errors[field.name]?.message}</div>
								</div>
							) : null;
						})}
					</div>
					<div className={styles.button_container}>
						<Button
							className="primary md"
							onClick={handleSubmit(handleEditOperators, onError)}
						>
							{!loading ? 'Submit' : 'Submiting'}
						</Button>
					</div>
				</form>
			</div>

		</div>
	);
}

export default EditOperators;
