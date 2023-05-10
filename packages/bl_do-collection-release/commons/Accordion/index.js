import AccordionContent from './AccordionContent';
import AccordionText from './AccordionText';
import Invoices from './Invoices';
import styles from './styles.module.css';

export default function Accordion({
	item = {},
	accordionOpen = false,
	tasks = [],
	taskLoading = false,
	setStateProps = {},
	stateProps = () => {},
	handleAccordionOpen = () => {},
	handleSubmit = () => {},
	refetchList = () => {},
	getShipmentPendingTask = () => {},
	showDeliveryOrderTask = false,
	showInvoiceAndTask = false,
}) {
	return (
		<div className={styles.main_container}>
			{stateProps.inner_tab === 'knockoff_pending' ? (
				<Invoices
					item={item}
					accordionOpen={accordionOpen}
					handleAccordionOpen={handleAccordionOpen}
					tasks={tasks}
					refetchList={refetchList}
					getShipmentPendingTask={getShipmentPendingTask}
					taskLoading={taskLoading}
				/>
			) : (
				<AccordionText
					stateProps={stateProps}
					accordionOpen={accordionOpen}
					handleAccordionOpen={handleAccordionOpen}
					showDeliveryOrderTask={showDeliveryOrderTask}
					showInvoiceAndTask={showInvoiceAndTask}
				/>
			)}
			{accordionOpen && stateProps.inner_tab !== 'knockoff_pending' ? (
				<AccordionContent
					item={item}
					tasks={tasks}
					taskLoading={taskLoading}
					stateProps={stateProps}
					setStateProps={setStateProps}
					handleSubmit={handleSubmit}
					handleAccordionOpen={handleAccordionOpen}
					refetchList={refetchList}
					showDeliveryOrderTask={showDeliveryOrderTask}
					showInvoiceAndTask={showInvoiceAndTask}
				/>
			) : null}
		</div>
	);
}
