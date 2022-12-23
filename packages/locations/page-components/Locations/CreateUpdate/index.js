import { Button } from '@cogoport/components';
import {
	InputController, useForm, SelectController,
} from '@cogoport/forms';
import { useState } from 'react';

import fields from '../../../configurations/create-form';

import createUpdateApi from './createUpdateApiNew';
import styles from './styles.module.css';

function CreateUpdateForm({ item:propItem }) {
	const item = {
		...(propItem || {}),
		aliases_attributes: propItem?.aliases || [],
	};

	const {
		handleSubmit, getValues, control, formState: { errors },
		watch,
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

	const watchType = watch('type');

	console.log('watchType', watchType);

	return (
		<form style={{ height: 500 }} onSubmit={handleSubmit(onCreate)}>
			<h2>Create Location</h2>
			<div className={styles.content}>
				{fields?.map((field) => {
					const { condition = {}, ...rest } = field;
					const Element = getElementController(rest.type);
					if (!Element) return null;

					if (!('condition' in field) || condition?.type?.includes(watchType)) {
						return (
							<div className={styles.list}>
								<h4>{field?.label}</h4>
								<Element
									width="100%"
									control={control}
									id={`rnp_role_list_create_role_form_${field?.name}_input`}
									{...rest}
								/>
								<div className={styles.error}>{errors?.[field?.name]?.message}</div>
							</div>
						);
					}

					// if (!condition?.type) {
					// 	return (
					// 		<div className={styles.list}>
					// 			<h4>{field?.label}</h4>
					// 			<Element
					// 				control={control}
					// 				id={`rnp_role_list_create_role_form_${field?.name}_input`}
					// 				{...rest}
					// 			/>
					// 			<div className={styles.error}>{errors?.[field?.name]?.message}</div>
					// 		</div>
					// 	);
					// }
				})}
			</div>
			<Button className={styles.button} type="submit">Submit</Button>
		</form>
	);
}
export default CreateUpdateForm;
