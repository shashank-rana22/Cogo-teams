import {
	IcMArrowUp,
	IcMArrowDown,
	IcMFtaskCompleted,
	IcMDocument,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

const textMapping = {
	collection_pending : 'Mark BL as \'Under Collection\'',
	under_collection   : 'Upload Scanned Copy of Document',
	collected          : 'Select Release Mode',
	released           : 'Mark BL as Delivered',
	surrendered        : 'Enter Tracking Details',
};

export default function AccordionText({
	activeTab = '',
	accordionOpen = false,
	handleAccordionOpen = () => {},
	showDeliveryOrderTask = false,
	showInvoiceAndTask = false,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.text_container}>
				{showInvoiceAndTask ? (
					<>
						<IcMFtaskCompleted
							width={20}
							height={20}
							style={{ marginRight: 4 }}
						/>
						Next Task:
						{' '}
						<Text>
							{!showDeliveryOrderTask
								? textMapping?.[activeTab]
								: 'Upload Delivery Order'}
						</Text>
					</>
				) : (
					<>
						<IcMDocument
							fill="#393f70"
							height={20}
							width={20}
							style={{ marginRight: 4 }}
						/>
						INVOICE
					</>
				)}
			</div>

			<div className={styles.action_container} onClick={handleAccordionOpen}>
				{accordionOpen ? 'Hide' : 'View'}
				{' '}
				All
				{accordionOpen ? (
					<IcMArrowUp style={{ marginLeft: 4 }} />
				) : (
					<IcMArrowDown style={{ marginLeft: 4 }} />
				)}
			</div>
		</div>
	);
}
