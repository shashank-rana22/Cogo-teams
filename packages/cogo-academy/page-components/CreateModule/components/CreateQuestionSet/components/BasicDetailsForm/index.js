import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCrossInCircle, IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import getElementController from '../../../../../../configs/getElementController';
import LoadingState from '../../../../commons/LoadingState';
import useCreateQuestionSet from '../../../../hooks/useCreateQuestionSet';

import getControls from './controls';
import styles from './styles.module.css';

const constants = ['name', 'topic', 'question_count', 'cogo_entity_id'];

function BasicDetailsForm({
	setQuestionSetId,
	getTestQuestionTest,
	data,
	questionSetId,
	setEditDetails,
	loading:listLoading,
	mode,
}) {
	const [showForm, setShowForm] = useState(false);

	const { control, formState:{ errors }, handleSubmit, setValue } = useForm();

	const controls = getControls({ mode });

	const { cogo_entity_object } = data || {};

	const {
		loading,
		createQuestionSet,
	} = useCreateQuestionSet();

	const onSubmit = (values) => {
		createQuestionSet({
			values,
			setQuestionSetId,
			getTestQuestionTest,
			type: isEmpty(questionSetId) ? 'create' : 'edit',
			questionSetId,
			setEditDetails,
			setShowForm,
		});
	};

	const editForm = () => {
		['name', 'topic', 'audience_ids'].forEach((item) => {
			setValue(item, data?.[item]);
		});

		setValue('cogo_entity_id', cogo_entity_object.id);

		setShowForm(true);
	};

	const handleDeleteQuestionSet = () => {
		createQuestionSet({ questionSetId, type: 'delete' });
	};

	if (listLoading) {
		return (
			<LoadingState rowsCount={1} />
		);
	}

	if (!isEmpty(questionSetId) && !showForm) {
		return (
			<div className={`${styles.container} ${styles.flex_row}`}>
				{constants.map((item) => (
					<div className={styles.flex_container}>
						<div className={styles.label}>{startCase(item)}</div>
						<div className={styles.value}>
							{item === 'cogo_entity_id' ? cogo_entity_object?.business_name : data?.[item]}
						</div>
					</div>
				))}

				<div className={styles.button_container}>
					<IcMEdit className={styles.button} onClick={() => editForm()} />
					<div className={styles.vertical_line} />
					<IcMDelete className={styles.button} onClick={() => handleDeleteQuestionSet()} />
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

			<div
				role="presentation"
				onClick={() => setShowForm(false)}
				className={styles.cancel_button}
			>
				<IcMCrossInCircle width={16} height={16} />
			</div>

			{mode !== 'view' ? (
				<div className={styles.button_container}>
					{!isEmpty(questionSetId) ? (
						<Button
							disabled={loading}
							size="sm"
							type="button"
							themeType="secondary"
							onClick={() => setShowForm(false)}
						>
							Cancel
						</Button>
					) : null}

					<Button loading={loading} size="sm" type="submit">
						{!isEmpty(questionSetId) ? 'Save' : 'Create'}
					</Button>
				</div>
			) : null}
		</form>
	);
}

export default BasicDetailsForm;
