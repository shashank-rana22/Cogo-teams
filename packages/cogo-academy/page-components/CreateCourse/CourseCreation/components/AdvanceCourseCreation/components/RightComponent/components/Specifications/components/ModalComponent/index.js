import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import { getFieldController } from '../../../../../../../../../commons/getFieldController';
import controls from '../controls';
import useCreateTopicOrTag from '../useCreateTopicOrTag';

import styles from './styles.module.css';

function ModalComponent({ show = false, setShow, from = '' }) {
	const {
		control,
		formState: { errors = {} },
		handleSubmit,
	} = useForm();

	const {
		createTopicOrTag,
		loading,
	} = useCreateTopicOrTag({ setShow, from });

	const onSubmit = (values) => {
		createTopicOrTag({ values });
	};

	return (
		<Modal
			size="sm"
			show={show}
			onClose={(prev) => ({ ...prev, [from]: true })}
			closeOnOuterClick={false}
			showCloseIcon={false}
		>
			<Modal.Header title={from === 'topics' ? 'Add new topic here' : 'Add new tag here'} />

			<Modal.Body>
				<div className={styles.modal_container}>
					{controls.map((controlItem) => {
						const { type, label, name } = controlItem || {};

						const ModalElement = getFieldController(type);

						if (!Element) return null;

						return (
							<div key={name} className={`${styles.form_group} ${styles[name]}`}>
								<div className={styles.label}>{label}</div>

								<div className={`${styles.input_group} ${styles[name]}`}>
									<ModalElement
										{...controlItem}
										key={name}
										control={control}
										id={`${name}_input`}
									/>
								</div>

								{errors?.[name]?.message ? (
									<div className={styles.error_message}>
										{errors?.[name]?.message}
									</div>
								) : null}
							</div>
						);
					})}
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					themeType="secondary"
					style={{ marginRight: 8 }}
					disabled={loading}
					onClick={() => setShow(false)}
				>
					Cancel
				</Button>

				<Button
					type="button"
					loading={loading}
					onClick={handleSubmit(onSubmit)}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalComponent;
