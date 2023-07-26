import { cl, Toast, Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import getFormattedPayload from '../../helpers/formatPayload';
import getAccordionAndButton from '../../helpers/getAccordionAndButton';
import { isCardCritical } from '../../helpers/isCardCritical';
import useListTasks from '../../hooks/useListTasks';
import useUpdateTask from '../../hooks/useUpdateTask';
import Accordion from '../Accordion';

import { ASSIGNED_STAKEHOLDER_MAPPING, TASK_FILTER, SUCCESS_MSG, STAKEHOLDER_MAPPING }
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
		assigned_stakeholder : ASSIGNED_STAKEHOLDER_MAPPING[stateProps.inner_tab],
		task                 : TASK_FILTER[stateProps.inner_tab],
		shipment_id          : item?.id,
		status             		: 'pending',
	};

	if (
		['under_collection', 'collected', 'knockoff_pending'].includes(stateProps.inner_tab)
	) {
		restFilters.task = TASK_FILTER[stateProps.inner_tab][stateProps.activeTab][item?.trade_type];
	}

	const {
		showAccordion,
		actionButton,
		showDeliveryOrderTask,
		showInvoiceAndTask,
		showTask,
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
				labelText : 'Do you want to Knock Off these invoices ?',
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
		Toast.success(SUCCESS_MSG[stateProps.inner_tab]);
		closeModal();
		refetch();
		handleAccordionOpen();
	};

	const { updateTask } = useUpdateTask({ refetch: taskRefetch });

	const handleSubmit = ({ formValues = {}, taskConfig = {} }) => {
		const payload = getFormattedPayload({
			inner_tab    : stateProps.inner_tab,
			active_tab   : stateProps.activeTab,
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
		.filter((stakeholder) => (stakeholder.service_id === item.freight_service?.id || item.loacl_service?.id)
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
							<div className={cl`${styles.text} ${styles.thin} ${styles.small}`} key={uuid()}>
								{STAKEHOLDER_MAPPING[stakeholder?.stakeholder_type]}
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
					showTask={showTask}
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
								themeType="secondary"
								className={styles.cancel_button}
							>
								CANCEL
							</Button>
							<Button
								disabled={loading}
								onClick={handleSubmit}
								themeType="primary"
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
