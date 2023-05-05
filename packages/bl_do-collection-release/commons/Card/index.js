import { cl, Toast, Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import getAccordionAndButton from '../../helpers/getAccordionAndButton';
import { isCardCritical } from '../../helpers/isCardCritical';
// import usePendingTask from '../../../hooks/usePendingTask';
// import Accordion from '../Accordion';

import LocaionDetails from './LocationDetails';
import ServiceProvider from './ServiceProvider';
import ShipmentDetails from './ShipmentDetails';
import styles from './styles.module.css';

const stakeholderMappings = {
	service_ops2    : 'Document Desk Ops:',
	booking_agent   : 'KAM:',
	release_desk    : 'Release Ops:',
	collection_desk : 'Collection Ops:',
};

export default function Card({
	activeTab = '',
	item = {},
	stateProps = {},
	openItem = null,
	setOpenItem = () => {},
	refetchList = () => {},
	isCriticalVisible = false,
}) {
	const [confirmationModal, setConfirmationModal] = useState({
		show      : false,
		labelText : '',
	});

	const {
		showAccordion,
		actionButton,
		showDeliveryOrderTask,
		showInvoiceAndTask,
	} = getAccordionAndButton({
		activeTab,
		item,
	});

	const accordionOpen = item?.id === openItem?.id;

	const closeModal = () => {
		setConfirmationModal({ show: false });
	};

	// const handleAccordionOpen = () => {
	// 	if (accordionOpen) {
	// 		setOpenItem(null);
	// 	} else {
	// 		setOpenItem(item);
	// 		if (activeTab !== 'knockoff_pending') getShipmentPendingTask();
	// 	}
	// };

	const handleAction = () => {
		if (activeTab === 'knockoff_pending') {
			setConfirmationModal({
				show      : true,
				labelText : 'Do you want to Knock Off these invoices?',
			});
		} else if (
			activeTab === 'collected'
			&& item?.trade_type === 'import'
			&& isEmpty(item?.do_documents)
		) {
			Toast.error('DO document has not been uploaded');
		} else if (
			activeTab === 'collected'
			&& item?.trade_type === 'import'
			&& !isEmpty(item?.do_documents)
		) {
			setConfirmationModal({
				show      : true,
				labelText : 'Do you want to Release this document?',
			});
		} else {
			handleAccordionOpen();
		}
	};

	// const { loading, getShipmentPendingTask, pendingTasks, handleSubmit } =		usePendingTask({
	// 	activeTab,
	// 	item,
	// 	closeModal,
	// 	refetchList,
	// 	handleAccordionOpen,
	// 	showDeliveryOrderTask,
	// });

	// const tasks = pendingTasks || [];

	let cardClassName = !showAccordion ? 'no-accordion' : '';
	cardClassName
		+= isCriticalVisible && isCardCritical({ item }) ? ' card-critical' : '';

	if (activeTab === 'knockoff_awaiting') {
		actionButton.show = false;
	}

	return (
		<>
			<div className={cl`${styles.main_container} ${styles[cardClassName]}`}>
				<ShipmentDetails item={item} stateProps={stateProps} />

				<div className={styles.border_right} />

				<LocaionDetails item={item} stateProps={stateProps} />

				<div className={styles.border_right} />

				<ServiceProvider item={item} stateProps={stateProps} />

				<div className={styles.border_right} />

				<div className={cl`${styles.container} ${styles.action}`}>
					{actionButton?.show ? (
						<Button
							disabled={actionButton?.disabled}
							className={`primary lg ${actionButton?.class}`}
							onClick={handleAction}
						>
							{actionButton?.text}
						</Button>
					) : null}

					{(item?.stakeholders || []).map((stakeholder) => (
						<div className={cl`${styles.text} ${styles.thin} ${styles.small}`}>
							{stakeholderMappings[stakeholder?.stakeholder_type]}
							{' '}
							<div className={cl`${styles.text} ${styles.bold} ${styles.inline}`}>
								{stakeholder?.name}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* {showAccordion || showDeliveryOrderTask ? (
				<Accordion
					activeTab={activeTab}
					item={item}
					accordionOpen={accordionOpen}
					tasks={tasks}
					taskLoading={loading}
					handleAccordionOpen={handleAccordionOpen}
					handleSubmit={handleSubmit}
					refetchList={refetchList}
					getShipmentPendingTask={getShipmentPendingTask}
					showDeliveryOrderTask={showDeliveryOrderTask}
					showInvoiceAndTask={showInvoiceAndTask}
				/>
			) : null} */}

			{confirmationModal?.show && (
				<Modal
					show={confirmationModal?.show}
					onClose={closeModal}
					className="primary md"
					// afterOpen={getShipmentPendingTask}
				>
					<Modal.Header>
						<div className={styles.label}>{confirmationModal?.labelText}</div>
					</Modal.Header>

					<Modal.Footer>
						<div className={cl`${styles.container} ${styles.row}`}>
							<Button
								// disabled={loading}
								onClick={closeModal}
								className="primary md"
							>
								CANCEL
							</Button>
							<Button
								// disabled={loading}
								// onClick={handleSubmit}
								className="primary md"
							>
								CONFIRM
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			)}
		</>
	);
}
