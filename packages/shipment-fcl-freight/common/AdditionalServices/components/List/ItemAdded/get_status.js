import STATUS_ITEMS from '../../../constants/STATUS_ITEMS';

const getStaus = ({ item }) => {
	let status = STATUS_ITEMS.disputed;

	if (!item?.is_rate_available) {
		status = STATUS_ITEMS.price_pending;
	}
	if (item?.is_rate_available && !item?.price) {
		status = STATUS_ITEMS.price_recieved;
	}
	if (
		(!!item?.price || !!item?.price_discounted) &&
		item.state === 'requested_for_importer_exporter'
	) {
		status = STATUS_ITEMS.customer_confirmation_pending;
	}
	if (item?.state === 'quoted_by_service_provider') {
		status = STATUS_ITEMS.charges_incurred;
	}
	if (item?.state === 'accepted_by_importer_exporter') {
		status = STATUS_ITEMS.approved;
	}
	if (item?.state === 'cancelled_by_supplier') {
		status = STATUS_ITEMS.cancelled_by_supplier;
	}
	if (item?.state === 'cancelled') {
		status = STATUS_ITEMS.cancelled_by_customer;
	}
	if (item?.state === 'requested_for_service_provider') {
		status = STATUS_ITEMS.requested_for_service_provider;
	}
	if (item?.state === 'amendment_requested_by_importer_exporter') {
		status = STATUS_ITEMS.amendment_requested_by_importer_exporter;
	}
	return status;
};

export default getStaus;
