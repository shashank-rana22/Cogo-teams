import { Button, Modal } from '@cogoport/components';

import getElementController from '../../configs/getElementController';

import styles from './styles.module.css';

const RenderModalBody = ({ controls, control, errors }) => (controls || []).map((controlItem) => {
	const { type, label: controlLabel, name } = controlItem || {};

	if (!type) return null;

	const DynamicController = getElementController(type);

	return (
		<div key={name}>
			<div className={styles.label}>
				{controlLabel}
			</div>

			<div>
				<DynamicController
					{...controlItem}
					control={control}
					name={name}
				/>
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
}) {
	return (
		<div>
			<Modal
				size="md"
				show={showModal}
				onClose={() => setShowModal(false)}
				placement="center"
			>
				<Modal.Header title={`Add ${label}`} />

				<Modal.Body>
					<RenderModalBody controls={controls} control={control} errors={errors} />
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
