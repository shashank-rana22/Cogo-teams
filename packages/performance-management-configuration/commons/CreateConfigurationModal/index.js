import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import getElementController from '../../configs/getElementController';

import styles from './styles.module.css';

const CHECK_USE_TYPE_UPDATE = 'Update';

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
		if (!isEmpty(showModal) && Type === CHECK_USE_TYPE_UPDATE) {
			if (showModal?.squad_name) {
				const ARRAY_OF_IDS = showModal.employees.map((obj) => obj.id);

				setValue('squad_name', showModal?.squad_name);
				setValue('squad_leader_id', showModal?.squad_leader?.id);
				setValue('employee_ids', ARRAY_OF_IDS);
			}

			if (showModal?.tribe_name) {
				const ARRAY_OF_IDS = showModal.squads.map((obj) => obj.id);

				setValue('tribe_name', showModal?.tribe_name);
				setValue('tribe_leader_id', showModal?.tribe_leader?.id);
				setValue('"squad_ids"', ARRAY_OF_IDS);
			}

			if (showModal?.chapter_name) {
				const ARRAY_OF_IDS = showModal.sub_chapters.map((obj) => obj.id);

				setValue('chapter_name', showModal?.chapter_name);
				setValue('chapter_leader_id', showModal?.chapter_leader?.id);
				setValue('"sub_chapter_ids"', ARRAY_OF_IDS);
			}

			if (showModal?.sub_chapter_name) {
				const ARRAY_OF_IDS = showModal.employees.map((obj) => obj.id);

				setValue('"sub_chapter_name', showModal?.sub_chapter_name);
				setValue('sub_chapter_leader_id', showModal?.sub_chapter_leader?.id);
				setValue('employee_ids', ARRAY_OF_IDS);
			}
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
						{Type}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default CreateConfigurationModal;
