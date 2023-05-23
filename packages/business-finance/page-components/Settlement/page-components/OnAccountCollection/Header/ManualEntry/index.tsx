import { Button, Modal } from '@cogoport/components';

import { UploadFileInterface } from '../../interface';

import CreateRequest from './CreateRequest';

function ManualEntry({ showModal, setShowModal, refetch }:UploadFileInterface) {
	return (
		<div>
			<Modal
				show={showModal.manual_entry}
				size="lg"
				placement="center"
				closeOnOuterClick={false}
				onClose={() => setShowModal({ manual_entry: false })}
			>
				<Modal.Header title="Manual Entry" />

				<Modal.Body>
					<CreateRequest
						refetch={refetch}
						show={showModal.manual_entry}
						onClose={() => setShowModal({ manual_entry: false })}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						size="md"
						style={{ marginRight: 10 }}
						themeType="secondary"
					>
						Cancel
					</Button>

					<Button
						size="md"
						type="submit"
					>
						Submit
					</Button>
				</Modal.Footer>

			</Modal>

		</div>
	);
}
export default ManualEntry;
