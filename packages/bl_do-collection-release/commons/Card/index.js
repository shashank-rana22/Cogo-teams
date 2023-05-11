import { cl, Toast, Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import getFormattedPayload from '../../helpers/formatPayload';
import getAccordionAndButton from '../../helpers/getAccordionAndButton';
import { isCardCritical } from '../../helpers/isCardCritical';
import useListTasks from '../../hooks/useListTasks';
import useUpdateTask from '../../hooks/useUpdateTask';
import Accordion from '../Accordion';

import { assigned_stakeholder_mapping, taskFilter, successMsg, stakeholderMappings }
	from './cardConstants';
import LocationDetails from './LocationDetails';
import ServiceProvider from './ServiceProvider';
import ShipmentDetails from './ShipmentDetails';
import styles from './styles.module.css';

export default function Card({
	item = {},
	stateProps = {},
	setStateProps = () => {},
	openItem = null,
	setOpenItem = () => {},
	refetch = () => {},
	isCriticalVisible = false,
}) {
	const [confirmationModal, setConfirmationModal] = useState({
		show      : false,
		labelText : '',
	});

	const restFilters = {
		assigned_stakeholder : assigned_stakeholder_mapping[stateProps.inner_tab],
		task                 : taskFilter[stateProps.inner_tab],
		shipment_id          : item?.id,
		status         					 : 'pending',
	};

	if (
		['under_collection', 'collected', 'knockoff_pending'].includes(stateProps.inner_tab)
	) {
		restFilters.task = taskFilter[stateProps.inner_tab][item?.trade_type];
	}

	const {
		showAccordion,
		actionButton,
		showDeliveryOrderTask,
		showInvoiceAndTask,
	} = getAccordionAndButton({
		activeTab: stateProps.inner_tab,
		item,
		stateProps,
	});

	const accordionOpen = item?.id === openItem?.id;

	const closeModal = () => {
		setConfirmationModal({ show: false });
	};

	const { list, loading, listTasks } = useListTasks({
		prefix        : stateProps.shipment_type,
		defaultParams : {
			sort_by    : 'updated_at',
			sort_type  : 'desc',
			page_limit : 100,
		},
		filters: restFilters,
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
			listTasks();
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

	const taskRefetch = () => {
		Toast.success(successMsg[stateProps.inner_tab]);
		closeModal();
		refetch();
		handleAccordionOpen();
	};

	const { updateTask } = useUpdateTask({ refetch: taskRefetch });

	const handleSubmit = ({ formValues = {}, taskConfig = {} }) => {
		const payload = getFormattedPayload({
			inner_tab    : stateProps.inner_tab,
			item,
			formValues,
			taskConfig,
			pendingTasks : list,
		});

		if (payload) {
			updateTask(payload);
		}
	};

	const stakeholders = (item?.stakeholders || [])
		.filter((stakeholder) => (stakeholder.service_id === item?.freight_service?.id)
		|| (stakeholder?.service_id === null));

	let cardClassName = !showAccordion ? 'no-accordion' : '';
	cardClassName
		+= isCriticalVisible && isCardCritical({ item }) ? ' card-critical' : '';

	if (stateProps.inner_tab === 'knockoff_awaiting') {
		actionButton.show = false;
	}

	return (
		<>
			<div className={cl`${styles.main_container} ${styles[cardClassName]}`}>
				<div className={styles.header}>{stateProps.trade_type}</div>

				<ShipmentDetails item={item} stateProps={stateProps} />

				<div className={styles.border_right} />

				<LocationDetails item={item} stateProps={stateProps} />

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
						{(stakeholders || []).map((stakeholder) => (
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
					item={item}
					accordionOpen={accordionOpen}
					tasks={list || []}
					taskLoading={loading}
					setStateProps={setStateProps}
					stateProps={stateProps}
					handleAccordionOpen={handleAccordionOpen}
					handleSubmit={handleSubmit}
					refetch={refetch}
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
					afterOpen={listTasks}
				>
					<Modal.Header />

					<Modal.Body>
						<div className={styles.label}>{confirmationModal?.labelText}</div>
					</Modal.Body>

					<Modal.Footer>
						<div className={cl`${styles.container} ${styles.row}`}>
							<Button
								disabled={loading}
								onClick={closeModal}
								className="primary md"
							>
								CANCEL
							</Button>
							<Button
								disabled={loading}
								onClick={handleSubmit}
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
