import { Button, Modal } from '@cogoport/components';

import getElementController from '../../configs/getElementController';

import styles from './styles.module.css';

const RenderModalBody = ({ controls, control }) => (controls || []).map((controlItem) => {
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
}) {
	const title = `Add ${label}`;

	return (
		<div>
			<Modal
				size="md"
				show={showModal}
				onClose={() => setShowModal(false)}
				placement="center"
			>
				<Modal.Header title={title} />

				<Modal.Body>
					<RenderModalBody controls={controls} control={control} />
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
