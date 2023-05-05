import AccordionContent from './AccordionContent';
import AccordionText from './AccordionText';
import Invoices from './Invoices';
import styles from './styles.module.css';

export default function Accordion({
	activeTab = '',
	item = {},
	accordionOpen = false,
	tasks = [],
	taskLoading = false,
	handleAccordionOpen = () => {},
	handleSubmit = () => {},
	refetchList = () => {},
	getShipmentPendingTask = () => {},
	showDeliveryOrderTask = false,
	showInvoiceAndTask = false,
}) {
	return (
		<div className={styles.main_container}>
			{activeTab === 'knockoff_pending' ? (
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
					activeTab={activeTab}
					accordionOpen={accordionOpen}
					handleAccordionOpen={handleAccordionOpen}
					showDeliveryOrderTask={showDeliveryOrderTask}
					showInvoiceAndTask={showInvoiceAndTask}
				/>
			)}
			{accordionOpen && activeTab !== 'knockoff_pending' ? (
				<AccordionContent
					activeTab={activeTab}
					item={item}
					tasks={tasks}
					taskLoading={taskLoading}
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
