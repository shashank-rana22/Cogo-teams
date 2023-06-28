import { Button } from '@cogoport/components';
import React from 'react';

import getElementController from '../../hooks/getController';
import useCreateOperators from '../../hooks/useCreateOperators';

import styles from './styles.module.css';

function CreateOperators({
	setShow,
	refetch,
	setPage,
	setFinalList,
	setShowLoading = () => {},
	page,
}) {
	const {
		handleCreateOperators,
		control,
		fields,
		handleSubmit,
		showElements,
		onError,
		errors,
		loading,
	} = useCreateOperators({
		setShow,
		refetch,
		setPage,
		setFinalList,
		setShowLoading,
		page,
	});

	(fields || []).forEach((ctrl, index) => {
		if (ctrl.name === 'operator_type') {
			fields[index].disabled = false;
		}
	});

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Create Operators</div>

			<div className={styles.flex}>
				<form onSubmit={handleSubmit(handleCreateOperators, onError)}>
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
							onClick={handleSubmit(handleCreateOperators, onError)}
						>
							{!loading ? 'Submit' : 'Submiting'}
						</Button>
					</div>
				</form>
			</div>

		</div>
	);
}

export default CreateOperators;
