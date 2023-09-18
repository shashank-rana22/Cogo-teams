import { Modal, Button } from '@cogoport/components';

import Footer from './Footer';
import LocationPairs from './LocationPairs';
import Locations from './Locations';

const PORT_PAIR_SERVICES = [
	'fcl_freight',
	'lcl_freight',
	'ftl_freight',
	'ltl_freight',
	'air_freight',
	'haulage_freight',
];

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
