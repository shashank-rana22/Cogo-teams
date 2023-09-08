import { Table, Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const COLUMNS = [
	{ Header: 'Cargo ID', accessor: 'cargoId' },
	{ Header: 'Services', accessor: 'services' },
];

function CargoAcknowledgmentModal({
	setShowCargoAcknowledgmentModal = () => {},
	cargoData = [],
}) {
	const TABLE_DATA = [];
	cargoData?.warehouseInventories?.forEach((item) => {
		TABLE_DATA.push({
			cargoId  : item?.cargoNumber,
			services : item?.services,
		});
	});

	return (
		<Modal
			show={!isEmpty(cargoData)}
			onClose={() => setShowCargoAcknowledgmentModal(false)}
			className={styles.modal_styled}
			placement="center"
			closeOnOuterClick
		>
			<Modal.Header title="Cargo Details" />
			<Modal.Body>
				<Table columns={COLUMNS} data={TABLE_DATA} />
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.modal_footer}>
					<div className={styles.footer_note}>Note: Please print the labels of above cargo&apos;s</div>
					<Button
						onClick={() => setShowCargoAcknowledgmentModal(false)}
					>
						OK
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default CargoAcknowledgmentModal;
