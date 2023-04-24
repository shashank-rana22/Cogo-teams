import { Toast, Button, Modal } from '@cogoport/components';
import { TextAreaController, useForm } from '@cogoport/forms';
import React from 'react';

function UnableToDoTask({
	setShowUnableTo = () => {},
	showUnableTo = false,
}) {
	const { control, handleSubmit } = useForm();

	const loading = false;

	const onCreate = ({ remark }) => {
		Toast('Reason: ', remark);
	};

	return (
		<Modal
			show={showUnableTo}
			onClose={() => setShowUnableTo(false)}
		>
			<Modal.Header title="Unable to do Task" />

			<Modal.Body>
				<h4>Enter Reason</h4>
				<TextAreaController
					name="remark"
					placeholder="Type here..."
					control={control}
					style={{ height: '100px' }}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					className="secondary md"
					style={{ marginRight: '12px' }}
					onClick={() => setShowUnableTo(false)}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button disabled={loading} onClick={handleSubmit(onCreate)}>
					Submit
					{/* {loading ? 'Submiting...' : 'Submit'}  */}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default UnableToDoTask;
