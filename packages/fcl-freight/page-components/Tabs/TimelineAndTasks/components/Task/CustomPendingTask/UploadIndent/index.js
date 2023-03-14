import React, { useState, useEffect } from 'react';
import useFormCogo from '@cogoport/front/hooks/useFormCogo';
import { Button, Modal } from '@cogoport/front/components/admin';
import { IcMDocument } from '@cogoport/icons-react';
import FormLayout from '../../../../../commons/Layout';
import ModalContent from './ModalContent';
import controls from './configs/controlsUploadIndent';
import useCompleteTask from './hooks/useCompleteTask';
import { Container } from './styles';

function UploadIndent({
	task = {},
	services = [],
	onCancel = () => {},
	refetch = () => {},
}) {
	const [showModal, setShowModal] = useState(false);
	const [indentURL, setIndentURL] = useState('');

	const { loading, updateTask } = useCompleteTask();

	const {
		fields,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useFormCogo(controls);

	useEffect(() => {
		if (indentURL?.length > 0) {
			setValue('documents.0.url', {
				name: `indent_note_${Date.now()}.pdf`,
				success: true,
				url: indentURL,
			});
		}
	}, [indentURL]);

	const callback = () => {
		refetch();
		onCancel();
	};

	const submitTask = (val) => {
		updateTask({ task, val, callback });
	};

	return (
		<Container>
			<FormLayout
				fields={fields}
				controls={controls}
				themeType="admin"
				errors={errors}
			/>
			<div>
				<Button className="secondary md" onClick={() => setShowModal(true)}>
					<IcMDocument height={20} width={20} />
					&nbsp; Auto-Generate Indent
				</Button>
			</div>
			<div className="button-wrapper">
				<Button
					className="secondary md"
					onClick={() => onCancel()}
					disabled={loading}
				>
					Cancel
				</Button>
				<Button
					className="primary md right"
					onClick={handleSubmit(submitTask)}
					disabled={loading}
				>
					Submit
				</Button>
			</div>

			{showModal && (
				<Modal
					show={showModal}
					onClose={() => setShowModal(false)}
					fullscreen
					className="primary"
					position="full-screen"
				>
					<ModalContent
						showModal={showModal}
						setShowModal={setShowModal}
						services={services}
						setIndentURL={setIndentURL}
					/>
				</Modal>
			)}
		</Container>
	);
}

export default UploadIndent;
