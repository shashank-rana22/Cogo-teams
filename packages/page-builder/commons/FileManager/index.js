import { Modal, Button } from '@cogoport/components';

function FileManager(props) {
	const { setShowFileManager } = props;

	return (
		<>
			<Modal.Header title="File Manager" />

			<Modal.Body />

			{/* <Modal.Footer>
				<Button
					size="md"
					themeType="secondary"
					style={{ marginRight: '8px' }}
				>
					Cancel
				</Button>

				<Button
					size="md"
					type="submit"
				>
					Upload
				</Button>
			</Modal.Footer> */}

		</>
	);
}

export default FileManager;
