import { Button, Modal } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import getElementController from '../../../../configs/getElementController';

import styles from './styles.module.css';

const CHECK_USE_TYPE_UPDATE = 'Update';

const MAPPING = {
	squad       : 'employee',
	tribe       : 'squad',
	chapter     : 'sub_chapter',
	sub_chapter : 'employee',
};

const RenderModalBody = ({ controls, control, errors }) => (controls || []).map((controlItem) => {
	const { type, label: controlLabel, name } = controlItem || {};

	if (!type) return null;

	const DynamicController = getElementController(type);

	if (!DynamicController) return null;

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
	type,
	setValue,
}) {
	const componentName = `${label}_name`;
	const componentLeader = `${label}_leader`;
	const subComponent = MAPPING?.[label];
	const subComponents = `${MAPPING?.[label]}s`;

	useEffect(() => {
		if (!isEmpty(showModal) && type === CHECK_USE_TYPE_UPDATE) {
			const ARRAY_OF_IDS = showModal?.[subComponents].map((obj) => obj?.id);

			setValue(componentName, showModal?.[componentName]);
			setValue(componentLeader, showModal?.[componentLeader]?.id);
			setValue(`${subComponent}_ids`, ARRAY_OF_IDS);
		}
	}, [componentLeader, componentName, setValue, showModal, subComponent, subComponents, type]);

	return (
		<div>
			<Modal
				size="md"
				show={showModal}
				onClose={() => setShowModal(false)}
				placement="center"
			>
				<Modal.Header title={`${type} ${startCase(label)}`} />

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
						{type}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default CreateConfigurationModal;
