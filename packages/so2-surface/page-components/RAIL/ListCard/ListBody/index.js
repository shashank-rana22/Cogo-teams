import ListInvoicePart from './InvoicePart';
import ListLeftPart from './ListLeftPart';
import ListMiddlePart from './ListMiddlePart';
import ListRightPart from './ListRightPart';
import styles from './styles.module.css';

function ListBody({ item = {} }) {
	const shipmentType = item?.shipment_type;
	const mainService = item?.rail_domestic_freight_services?.find((service) => service?.main_service_id === null);
	const data = { ...(mainService || {}), source: item?.source };
	return (
		<div className={styles.list_body}>
			<ListLeftPart item={item} />
			<ListMiddlePart item={item} />
			<ListInvoicePart item={item} />
			<ListRightPart item={data} shipmentType={shipmentType} />
		</div>
	);
}
export default ListBody;
