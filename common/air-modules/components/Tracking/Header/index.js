import { Popover, Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import RaiseQuery from './RaiseQuery';
import RaiseQuerySuccessModal from './RaiseQuerySuccessModal';
import styles from './styles.module.css';

function Header({
	airwayBillNo = '',
	shipmentId = '',
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [showModal, setShowModal] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.row_container}>
				<div className={styles.text}>Tracking Information</div>
				<div className={styles.airway_bill_no_head}>
					Airway Bill no:
					{' '}
					<div className={styles.airway_bill_no}>{airwayBillNo || 'NA'}</div>
				</div>
			</div>
			<Popover
				theme="light"
				animation="shift-away"
				content={<RaiseQuery shipmentId={shipmentId} setIsOpen={setIsOpen} setShowModal={setShowModal} />}
				visible={isOpen}
				interactive
				placement="bottom"
			>
				<Button
					size="md"
					themeType="accent"
					onClick={() => setIsOpen((prev) => !prev)}
				>
					Raise a query?
				</Button>
			</Popover>

			<Modal show={showModal} size="sm" className={styles.modal_styles}>
				<Modal.Body>
					<RaiseQuerySuccessModal setShowModal={setShowModal} />
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default Header;
