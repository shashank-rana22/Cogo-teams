import { Table, Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const COLUMNS = [
	{ Header: 'Cargo ID', accessor: 'cargoId' },
	{ Header: 'Services', accessor: 'services' },
];

function CargoAcknowledgmentModal({
	showCargoAcknowledgmentModal = [],
	setShowCargoAcknowledgmentModal = () => {},
	cargoData = [],
}) {
	const DATA = [];
	cargoData?.forEach((item) => {
		DATA.push({
			cargoId  : item?.cargoNumber,
			services : item?.services,
		});
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
				<Table columns={COLUMNS} data={DATA} />
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
