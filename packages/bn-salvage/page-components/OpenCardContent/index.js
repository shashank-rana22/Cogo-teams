import { Button } from '@cogoport/components';
import { useContext } from 'react';

import { BNSalvageContext } from '../../context/BNSalvageContext';

import ActionModals from './ActionModals';
import ShipmentInfo from './ShipmentInfo';
import styles from './styles.module.css';
import Timeline from './Timeline';

const actionButtons = [
	{ label: 'View', modalKey: 'view_document' },
	{ label: 'Extend Expiry', modalKey: 'extend_expiry' },
	{ label: 'Move To Expired', modalKey: 'move_to_expired' },
];

export default function OpenCardContent({ item }) {
	const { showModal, setShowModal } = useContext(BNSalvageContext);

	return (
		<div className={styles.open_card_container}>
			<p>
				Booking No.:&nbsp;
				<span className={styles.booking_no}>{item?.document_number}</span>
			</p>
			<ShipmentInfo item={item} />

			<Timeline item={item} />

			<div className={styles.btn_container}>
				{actionButtons.map((btn) => (
					<Button
						key={btn.modalKey}
						themeType="secondary"
						onClick={() => setShowModal(btn.modalKey)}
					>
						{btn.label}
					</Button>
				))}
			</div>

			{showModal && actionButtons.some((btn) => btn.modalKey === showModal) ? (
				<ActionModals modalKey={showModal} item={item} />
			) : null}
		</div>
	);
}
