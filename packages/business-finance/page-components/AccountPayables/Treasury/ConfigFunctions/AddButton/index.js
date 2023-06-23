import { Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import SaveAndAllotAmount from './SaveAndAllotAmount';

function AddButton({ itemData, refetch }) {
	const [showModel, setShowModal] = useState(false);
	return (
		<>
			<Button
				onClick={() => {
					setShowModal(true);
				}}
				className="secondary sm"
			>
				Add
			</Button>
			<Modal
				show={showModel}
				onClose={() => {
					setShowModal(false);
				}}
				width={800}
			>
				{showModel && (
					<SaveAndAllotAmount
						itemData={itemData}
						setShowModal={setShowModal}
						refetch={refetch}
					/>
				)}
			</Modal>
		</>
	);
}
export default AddButton;
