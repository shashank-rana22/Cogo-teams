import { Modal, Textarea, Button } from '@cogoport/components';
import { useState } from 'react';

function ModalComp({
	show = false, setShow = () => {},
	title = '', organization_id = '', submitForm = () => {}, service = '',
}) {
	const [comment, setComment] = useState('');
	const [reason, setReason] = useState('');
	const submit = () => {
		setShow(false);
		if (title === 'information') {
			submitForm({
				data: {
					delete_rest_expertise      : false,
					more_info_required_comment : comment,
					organization_id,
					service,
					status                     : 'more_info_required',
				},
			});
		} else {
			submitForm({
				data: {
					delete_rest_expertise : false,
					rejection_reason      : reason,
					organization_id,
					service,
					status                : 'inactive',
				},
				reload: true,
			});
		}
	};
	return (
		<Modal size="md" show={show} onClose={() => setShow(false)} placement="top">
			<Modal.Header title={title === 'information' ? 'MORE INFORMATION REQUIRED' : 'REASON FOR REJECTION'} />
			<Modal.Body>
				<Textarea size="lg" onChange={title === 'information' ? setComment : setReason} />
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={submit}>
					{title === 'information' ? 'ASK FOR INFORMATION' : 'REJECT'}

				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default ModalComp;
