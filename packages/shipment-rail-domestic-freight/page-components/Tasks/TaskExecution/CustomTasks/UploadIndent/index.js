import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';
import { useState, useEffect } from 'react';

import useUpdateShipmentPendingTask from '../../../../../hooks/useUpdateShipmentPendingTask';

import manualUploadControls from './helpers/manualUploadControls';
import IndentForm from './IndentForm';
import styles from './styles.module.css';

function UploadIndent({
	task = {}, // todo
	onCancel = () => {},
	refetch = () => {}, // todo
	services = [],
}) {
	const [showModal, setShowModal] = useState(false);
	const [indentURL, setIndentURL] = useState('');

	const { apiTrigger:updatePendingTask = () => {}, loading } = useUpdateShipmentPendingTask({}); // need to see

	const { control, formState: { errors }, handleSubmit, watch, setValue } = useForm({
		defaultValues: {
			documents: [{
				url         : '',
				description : '',
			}],
		},
	});

	useEffect(() => {
		if (indentURL?.length > 0) {
			setValue('documents.0.url', {
				fileName : `indent_note_${Date.now()}.pdf`,
				finalUrl : indentURL,
			});
		}
	}, [indentURL, setValue]);

	const formValues = watch();

	return (
		<div className={styles.container}>
			<div>
				<Layout
					fields={manualUploadControls}
					control={control}
					errors={errors}
					formValues={formValues}
				/>
			</div>

			<div className={styles.generate_button}>
				<Button
					themeType="primary"
					onClick={() => setShowModal(true)}
				>
					Auto-Generate Indent
				</Button>
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					onClick={onCancel}
					disabled={loading}
				>
					CANCEL
				</Button>

				<Button
					themeType="primary"
					disabled={loading}
					// onClick={handleSubmit(onSubmit)}
				>
					SUBMIT
				</Button>
			</div>

			{showModal
				? (
					<Modal
						onClose={() => setShowModal(false)}
						show={showModal}
						size="fullscreen"
						scroll
					>
						<Modal.Header title="Indent Document" />
						<Modal.Body>
							<IndentForm
								showModal={showModal}
								setShowModal={setShowModal}
								services={services}
								setIndentURL={setIndentURL}
							/>
						</Modal.Body>
					</Modal>
				) : null}
		</div>
	);
}

export default UploadIndent;
