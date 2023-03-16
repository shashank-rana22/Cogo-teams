import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import getElementController from '../../../../../../configs/getElementController';
import useCreateQuestionSet from '../../../../hooks/useCreateQuestionSet';

import getControls from './controls';
import styles from './styles.module.css';

const constants = ['name', 'topic', 'question_count', 'cogo_entity_id'];

function BasicDetailsForm({ setQuestionSetId, getTestQuestionTest, data, questionSetId }) {
	const [showForm, setShowForm] = useState(false);

	const { control, formState:{ errors }, handleSubmit, setValue } = useForm();

	const controls = getControls();

	const {
		loading,
		createQuestionSet,
	} = useCreateQuestionSet();

	const onSubmit = (values) => {
		createQuestionSet({ values, setQuestionSetId, getTestQuestionTest });
	};

	const editForm = () => {
		['name', 'topic', 'audience_ids', 'cogo_entity_id'].forEach((item) => {
			setValue(item, data?.[item]);
		});

		setShowForm(true);
	};

	if (!isEmpty(questionSetId) && !showForm) {
		return (
			<div className={`${styles.container} ${styles.flex_row}`}>
				{constants.map((item) => (
					<div className={styles.flex_container}>
						<div className={styles.label}>{startCase(item)}</div>
						<div className={styles.value}>{data?.[item]}</div>
					</div>
				))}

				<div className={styles.button_container}>
					<IcMEdit className={styles.button} onClick={() => editForm()} />
					<div className={styles.vertical_line} />
					<IcMDelete className={styles.button} />
				</div>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
			<div className={styles.form_component}>
				{controls.map((controlItem) => {
					const { type, label, name } = controlItem || {};

					const Element = getElementController(type);

					return (
						<div className={styles.control_container}>
							<div className={styles.label}>
								{label}
							</div>

							<div className={styles.control}>
								<Element control={control} {...controlItem} />
								{errors[name] && <div className={styles.error_msg}>This is required</div>}
							</div>
						</div>
					);
				})}
			</div>

			<div className={styles.button_container}>
				{questionSetId ? (
					<Button
						loading={loading}
						size="sm"
						type="button"
						themeType="secondary"
						onClick={() => setShowForm(false)}
					>
						Cancel
					</Button>
				) : null}

				<Button loading={loading} size="sm" type="submit">
					{questionSetId ? 'Edit' : 'Create'}
				</Button>
			</div>
		</form>
	);
}

export default BasicDetailsForm;
