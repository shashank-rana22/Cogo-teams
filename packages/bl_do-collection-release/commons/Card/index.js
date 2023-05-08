import { cl, Toast, Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import getAccordionAndButton from '../../helpers/getAccordionAndButton';
import { isCardCritical } from '../../helpers/isCardCritical';
import useListTasks from '../../hooks/useListTasks';
// import usePendingTask from '../../../hooks/usePendingTask';
import Accordion from '../Accordion';

import LocaionDetails from './LocationDetails';
import ServiceProvider from './ServiceProvider';
import ShipmentDetails from './ShipmentDetails';
import styles from './styles.module.css';

const taskFilter = {
	knockoff_pending: {
		import: [
			'generate_do_noc_certificate',
			'generate_do_certificate',
			'upload_security_dd',
			'knockoff_invoices',
		],
		export: 'knockoff_invoices',
	},
	collection_pending : 'update_collection_details',
	under_collection   : {
		import : 'upload_endorsed_bill_of_lading',
		export : 'upload_bill_of_lading',
	},
	collected: {
		import : ['mark_do_released', 'upload_delivery_order'],
		export : 'mark_bl_released',
	},
	released    : 'mark_bl_delivered',
	surrendered : 'mark_bl_surrendered',
};

const assigned_stakeholder_mapping = {
	knockoff_pending   : 'collection_desk',
	collection_pending : 'collection_desk',
	under_collection   : undefined,
	collected          : 'release_desk',
	released           : 'release_desk',
	surrendered        : 'collection_desk',
};

const stakeholderMappings = {
	service_ops2    : 'Document Desk Ops:',
	booking_agent   : 'KAM:',
	release_desk    : 'Release Ops:',
	collection_desk : 'Collection Ops:',
};

export default function Card({
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

	const restFilters = {
		assigned_stakeholder : assigned_stakeholder_mapping[stateProps.activeTab],
		task                 : taskFilter[stateProps.activeTab],
	};

	if (
		['under_collection', 'collected', 'knockoff_pending'].includes(stateProps.activeTab)
	) {
		restFilters.task = taskFilter[stateProps.activeTab][item?.trade_type];
	}

	const {
		showAccordion,
		actionButton,
		showDeliveryOrderTask,
		showInvoiceAndTask,
	} = getAccordionAndButton({
		activeTab: stateProps.activeTab,
		item,
	});

	const accordionOpen = item?.id === openItem?.id;

	const closeModal = () => {
		setConfirmationModal({ show: false });
	};

	const { list, loading, listTasks } = useListTasks({
		prefix        : stateProps.shipment_type,
		defaultParams : {
			page_limit : 100,
			sort_type  : 'asc',
		},
		defaultFilters: {
			shipment_id : item?.id,
			status      : 'pending',
			...restFilters,
		},
	});

	const handleAccordionOpen = () => {
		if (accordionOpen) {
			setOpenItem(null);
		} else {
			setOpenItem(item);
			if (stateProps.inner_tab !== 'knockoff_pending') listTasks();
		}
	};

	const handleAction = () => {
		if (stateProps.inner_tab === 'knockoff_pending') {
			setConfirmationModal({
				show      : true,
				labelText : 'Do you want to Knock Off these invoices?',
			});
		} else if (
			stateProps.inner_tab === 'collected'
			&& item?.trade_type === 'import'
			&& isEmpty(item?.do_documents)
		) {
			Toast.error('DO document has not been uploaded');
		} else if (
			stateProps.inner_tab === 'collected'
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

	console.log('list ', list);

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

	if (stateProps.inner_tab === 'knockoff_awaiting') {
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

					<div className={styles.stakeholders}>
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
			</div>

			{showAccordion || showDeliveryOrderTask ? (
				<Accordion
					activeTab={stateProps.inner_tab}
					item={item}
					accordionOpen={accordionOpen}
					tasks={list || []}
					taskLoading={loading}
					handleAccordionOpen={handleAccordionOpen}
					// handleSubmit={handleSubmit}
					refetchList={refetchList}
					getShipmentPendingTask={listTasks}
					showDeliveryOrderTask={showDeliveryOrderTask}
					showInvoiceAndTask={showInvoiceAndTask}
				/>
			) : null}

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
