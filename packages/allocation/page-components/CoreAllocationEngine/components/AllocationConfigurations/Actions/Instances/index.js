import { Modal } from '@cogoport/components';

import ListInstances from './ListInstances';

function Instances({ item = {} }) {
	return (
		<>
			<Modal.Header title="Instances" />

			<Modal.Body>
				<ListInstances item={item} />
			</Modal.Body>
		</>
	);
}

export default Instances;
