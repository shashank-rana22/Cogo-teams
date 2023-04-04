import { Button, Modal, Pill } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCrossInCircle, IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import LoadingState from '../../../../../../commons/LoadingState';
import getElementController from '../../../../../../configs/getElementController';
import useCreateQuestionSet from '../../../../hooks/useCreateQuestionSet';

import getControls from './controls';
import styles from './styles.module.css';

const constants = ['name', 'topic', 'question_count', 'cogo_entity_id'];

const getValue = ({ item, data }) => {
	const { cogo_entity_object } = data || {};

	if (item === 'cogo_entity_id') {
		return cogo_entity_object?.business_name;
	} if (item === 'topic') {
		return <Pill size="lg" color="#F3FAFA">{data?.[item]}</Pill>;
	}

	return data?.[item] || 0;
};

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

	const [showModal, setShowModal] = useState(false);

	const { cogo_entity_object } = data || {};

	const {
		loading,
		createQuestionSet,
	} = useCreateQuestionSet({
		setQuestionSetId,
		getTestQuestionTest,
		questionSetId,
		setEditDetails,
		setShowForm,
	});

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
		['name', 'topic'].forEach((item) => {
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
			<>
				<div className={`${styles.container} ${styles.flex_row}`}>
					{constants.map((item) => (
						<div key={item} className={styles.flex_container}>
							<div className={styles.label}>{startCase(item)}</div>
							<div className={styles.value}>
								{getValue({ item, data })}
							</div>
						</div>
					))}

					<div className={styles.button_container}>
						<IcMEdit className={styles.button} onClick={() => editForm()} />

						<div className={styles.vertical_line} />

						<IcMDelete
							className={styles.button}
							onClick={() => {
								setShowModal(true);
							}}
						/>
					</div>
				</div>
				<Modal
					size="sm"
					show={showModal}
					onClose={() => setShowModal(false)}
					placement="center"
					showCloseIcon={false}
				>
					<Modal.Header title="Are you sure you want to delete this?" />

					<Modal.Body>
						<div className={styles.btn_container}>
							<Button
								type="button"
								themeType="secondary"
								onClick={() => setShowModal(false)}
							>
								Cancel
							</Button>

							<Button
								type="button"
								style={{ marginLeft: '8px' }}
								onClick={() => {
									handleDeleteQuestionSet();
									setShowModal(false);
								}}
							>
								Delete
							</Button>
						</div>
					</Modal.Body>
				</Modal>
			</>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
			<div className={styles.form_component}>
				{controls.map((controlItem) => {
					const { type, label, name } = controlItem || {};

					const Element = getElementController(type);

					return (
						<div key={name} className={styles.control_container}>
							<div className={styles.label}>
								{label}
								<sup className={styles.sup}>*</sup>
							</div>

							<div className={styles.control}>
								<Element control={control} {...controlItem} />
								{errors[name] && <div className={styles.error_msg}>This is required</div>}
							</div>
						</div>
					);
				})}
			</div>

			{!isEmpty(questionSetId) ? (
				<div
					role="presentation"
					onClick={() => setShowForm(false)}
					className={styles.cancel_button}
				>
					<IcMCrossInCircle width={16} height={16} />
				</div>
			) : null}

			{mode !== 'view' ? (
				<div className={styles.button_container}>
					{!isEmpty(questionSetId) ? (
						<Button
							disabled={loading}
							size="md"
							type="button"
							themeType="secondary"
							onClick={() => setShowForm(false)}
						>
							Cancel
						</Button>
					) : null}

					<Button
						style={{ marginLeft: '16px' }}
						loading={loading}
						size="md"
						type="submit"
					>
						{!isEmpty(questionSetId) ? 'Save' : 'Create'}
					</Button>
				</div>
			) : null}
		</form>

	);
}

export default BasicDetailsForm;
