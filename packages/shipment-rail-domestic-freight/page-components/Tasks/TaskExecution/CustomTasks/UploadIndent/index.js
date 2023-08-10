import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useUpdateShipmentPendingTask from '../../../../../hooks/useUpdateShipmentPendingTask';

import manualUploadControls from './helpers/manualUploadControls';
import IndentForm from './IndentForm';
import styles from './styles.module.css';

function UploadIndent({
	task = {},
	onCancel = () => {},
	refetch = () => {},
	services = [],
}) {
	const [showModal, setShowModal] = useState(false);
	const [indentURL, setIndentURL] = useState('');

	const callBack = () => {
		refetch();
		onCancel();
	};

	const {
		apiTrigger:updatePendingTask = () => {},
		loading,
	} = useUpdateShipmentPendingTask({ refetch: callBack });

	const { control, formState: { errors }, handleSubmit, watch, setValue } = useForm({
		defaultValues: {
			documents: [{
				url         : '',
				description : '',
			}],
		},
	});

	useEffect(() => {
		if (!isEmpty(indentURL)) {
			setValue('documents.0.url', {
				fileName : `indent_note_${Date.now()}.pdf`,
				finalUrl : indentURL,
			});
		}
	}, [indentURL, setValue]);

	const formValues = watch();

	const onSubmit = (values) => {
		const payload = {
			id   : task?.id,
			data : {},
		};

		const documents = (values?.documents || []).map((documentItem) => {
			if (typeof documentItem?.url === 'object') {
				return {
					document_type : 'indent',
					document_url  : documentItem?.url?.finalUrl,
					file_name     : documentItem?.url?.fileName,
					data          : {
						url         : documentItem?.url?.finalUrl,
						description : documentItem?.description,
					},
				};
			}
			const file_name = (decodeURI(documentItem?.url) || '').split('/').pop();
			return {
				document_type : 'indent',
				document_url  : documentItem?.url,
				file_name,
				data          : {
					url         : documentItem?.url,
					description : documentItem?.description,
				},
			};
		});

		payload.data.documents = documents;

		updatePendingTask(payload);
	};

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
					onClick={handleSubmit(onSubmit)}
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
