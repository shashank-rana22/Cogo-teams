import { Button } from '@cogoport/components';
import {
	InputController, useForm, SelectController,
} from '@cogoport/forms';
import { useState } from 'react';

import fields from '../../../configurations/create-form';

import styles from './styles.module.css';

function UpdateStatusForm({ item:propItem }) {
	const item = {
		...(propItem || {}),
		aliases_attributes: propItem?.aliases || [],
	};

	const {
		handleSubmit, getValues, control, formState: { errors },
	} = useForm();

	const [message, setMessage] = useState({ type: null, message: null });

	const getElementController = (type = 'text') => {
		switch (type) {
			case 'text':
				return InputController;

			case 'select':
				return SelectController;

			default:
				return null;
		}
	};

	const [prefilledValues, setPrefilledValues] = useState({
		trade_id     : item?.trade_id,
		continent_id : item.continent_id,
	});

	const formatAliasis = (newAliases = []) => {
		const oldAliases = item?.aliases_attributes;
		const deletedAliases = oldAliases.filter(
			(aliases) => !newAliases.find((newAlias) => aliases.id === newAlias.id),
		);
		const formattedDeleted = deletedAliases.map((aliases) => ({
			...aliases,
			_destroy: true,
		}));
		return [...newAliases, ...formattedDeleted];
	};
	const onCreate = async () => {
		const formattedValues = getValues();
		formattedValues.is_icd = formattedValues.is_icd === 'Yes';

		const payload = item.id
			? {
				...formattedValues,
				...prefilledValues,
				id: item.id,
				// aliases_attributes,
			}
			: { ...formattedValues, ...prefilledValues };

		console.log(payload, 'resss');

		const res = await createUpdateApi(
			{ endpoint: '/create_location', method: 'post' },
			{ ...payload },
		);
		if (res.hasError) {
			setMessage({ type: 'error', message: res.messages });
		} else {
			setMessage({
				type    : 'success',
				message : `Location ${item?.id ? 'updated' : 'created'} successfully.`,
			});
		}
	};

	return (
		<div className={styles.form}>
			<form onSubmit={handleSubmit(onCreate)}>
				<h2>Edit Location</h2>
				<div className={styles.content}>
					{fields?.map((field) => {
						const { condition, ...rest } = field;
						const Element = getElementController(rest.type);
						if (!Element) return null;
						return (
							<div className={styles.list}>
								<h3>{field?.label}</h3>
								<Element
									control={control}
									id={`rnp_role_list_create_role_form_${field?.name}_input`}
									{...rest}
								/>
								<div className={styles.error}>{errors?.[field?.name]?.message}</div>
							</div>
						);
					})}
				</div>
				<Button className={styles.button} type="submit">Update</Button>
			</form>
		</div>
	);
}
export default UpdateStatusForm;
