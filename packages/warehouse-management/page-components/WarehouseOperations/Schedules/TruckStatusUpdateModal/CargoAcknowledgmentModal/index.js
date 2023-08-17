import { Table, Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function CargoAcknowledgmentModal({
	showCargoAcknowledgmentModal = [],
	setShowCargoAcknowledgmentModal = () => {},
	cargoData = [],
}) {
	const columns = [
		{ Header: 'Cargo ID', accessor: 'cargoId' },
		{ Header: 'Services', accessor: 'services' },
	];
	const DATA = [];
	cargoData.forEach((item) => {
		const MP = {};
		MP.cargoId = item?.cargoNumber;
		MP.services = item?.services;
		DATA.push(MP);
	});

	return (
		<Modal
			show={!isEmpty(showCargoAcknowledgmentModal)}
			onClose={() => setShowCargoAcknowledgmentModal({})}
			className={styles.modal_styled}
			placement="center"
			closeOnOuterClick
		>
			<Modal.Header title="Cargo Details" />
			<Modal.Body>
				<Table columns={columns} data={DATA} />
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.modal_footer}>
					<div className={styles.footer_note}>Note: Please print the labels of above cargo&apos;s</div>
					<Button
						onClick={() => setShowCargoAcknowledgmentModal({})}
					>
						OK
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default CargoAcknowledgmentModal;
