import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import getElementController from '../../configs/getElementController';

import styles from './styles.module.css';

const RenderModalBody = ({ controls, control, errors }) => (controls || []).map((controlItem) => {
	const { type, label: controlLabel, name } = controlItem || {};

	if (!type) return null;

	const DynamicController = getElementController(type);

	return (
		<div key={name}>
			<div className={styles.label}>{controlLabel}</div>

			<div>
				<DynamicController {...controlItem} control={control} name={name} />
			</div>

			{errors[name] ? (
				<div className={styles.error_message}>
					{' '}
					{errors[name]?.message}
				</div>
			) : null}
		</div>
	);
});

function CreateConfigurationModal({
	showModal,
	setShowModal,
	label = '',
	controls,
	control,
	onClickSubmitButton = () => {},
	loading,
	handleSubmit,
	errors,
	Type,
	setValue,
}) {
	// console.log(showModal);
	useEffect(() => {
		if (!isEmpty(showModal) && Type === 'Update') {
			setValue('squad_name', showModal?.squad_name);
			setValue('squad_leader_id', showModal?.squad_leader?.id);
			setValue('employee_ids', showModal?.employees);

			setValue('tribe_name', showModal?.tribe_name);
			setValue('tribe_leader_id', showModal?.tribe_leader?.id);
			setValue('"squad_ids"', showModal?.squad);

			setValue('chapter_name', showModal?.chapter_name);
			setValue('chapter_leader_id', showModal?.chapter_leader?.id);
			setValue('"sub_chapter_ids"', showModal?.sub_chapter);

			setValue('"sub_chapter_name', showModal?.sub_chapter_name);
			setValue('sub_chapter_leader_id', showModal?.sub_chapter_leader?.id);
			setValue('employee_ids', showModal?.employee);
		}
	}, [setValue, showModal, Type]);

	return (
		<div>
			<Modal
				size="md"
				show={showModal}
				onClose={() => setShowModal(false)}
				placement="center"
			>
				<Modal.Header title={`${Type} ${label}`} />

				<Modal.Body>
					<RenderModalBody
						controls={controls}
						control={control}
						errors={errors}
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button
						themeType="primary"
						onClick={handleSubmit(onClickSubmitButton)}
						loading={loading}
					>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default CreateConfigurationModal;
