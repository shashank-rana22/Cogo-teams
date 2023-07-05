import { Button } from '@cogoport/components';
import { useState } from 'react';

import SaveAndAllotAmount from './SaveAndAllotAmount';

function AddButton({ itemData, refetch }) {
	const [showModel, setShowModal] = useState(false);

	const buttonName = itemData?.pendingRequestsCount ? 'View' : 'Add';

	return (
		<>
			<Button
				onClick={() => {
					setShowModal(true);
				}}
			>
				{buttonName}
			</Button>

			{showModel && (
				<SaveAndAllotAmount
					showModel={showModel}
					itemData={itemData}
					setShowModal={setShowModal}
					refetch={refetch}
				/>
			)}

		</>
	);
}
export default AddButton;
