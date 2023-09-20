import { Modal, Button } from '@cogoport/components';

import { PORT_PAIR_SERVICES } from '../../../../common/SERVICES';

import Footer from './Footer';
import LocationPairs from './LocationPairs';
import Locations from './Locations';

function ModalComponent({ data = {}, show = false, setShow = () => {} }) {
	return (
		<Modal size="md" show={show} onClose={() => setShow(false)} placement="top" style={{ width: 1000 }}>
			<Modal.Header title="Location Pairs" />
			<Modal.Body>
				<div>
					{PORT_PAIR_SERVICES.includes(data?.service) ? (
						<LocationPairs locationPairs={data?.service_expertise || []} />
					) : (
						<Locations locations={data?.service_expertise || []} />
					)}
				</div>
				<hr />
				<Footer item={data} />
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => setShow(false)}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default ModalComponent;
