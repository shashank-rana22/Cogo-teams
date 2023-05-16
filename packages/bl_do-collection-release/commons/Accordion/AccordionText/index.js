import {
	IcMArrowUp,
	IcMArrowDown,
	IcMFtaskCompleted,
	IcMDocument,
} from '@cogoport/icons-react';

import ClickableDiv from '../../ClickableDiv';

import styles from './styles.module.css';

const textMapping = {
	collection_pending : 'Mark BL as Under Collection',
	under_collection   : 'Upload Scanned Copy of Document',
	collected          : 'Select Release Mode',
	released           : 'Mark BL as Delivered',
	surrendered        : 'Enter Tracking Details',
};

export default function AccordionText({
	stateProps = {},
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
						<div className={styles.text}>
							{!showDeliveryOrderTask
								? textMapping?.[stateProps.inner_tab]
								: 'Upload Delivery Order'}
						</div>
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

			<ClickableDiv onClick={handleAccordionOpen}>
				<div className={styles.action_container}>
					{accordionOpen ? 'Hide' : 'View'}
					{' '}
					All
					{accordionOpen ? (
						<IcMArrowUp style={{ marginLeft: 4 }} />
					) : (
						<IcMArrowDown style={{ marginLeft: 4 }} />
					)}
				</div>
			</ClickableDiv>
		</div>
	);
}
