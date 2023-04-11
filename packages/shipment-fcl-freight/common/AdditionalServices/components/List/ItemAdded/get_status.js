import STATUS_ITEMS from '../../../constants/STATUS_ITEMS';

const getStaus = ({ serviceListItem }) => {
	let status = STATUS_ITEMS.disputed;

	if (!serviceListItem?.is_rate_available) {
		status = STATUS_ITEMS.price_pending;
	}
	if (serviceListItem?.is_rate_available && !serviceListItem?.price) {
		status = STATUS_ITEMS.price_recieved;
	}
	if (
		(!!serviceListItem?.price || !!serviceListItem?.price_discounted)
		&& serviceListItem?.state === 'requested_for_importer_exporter'
	) {
		status = STATUS_ITEMS.customer_confirmation_pending;
	}
	if (serviceListItem?.state === 'quoted_by_service_provider') {
		status = STATUS_ITEMS.charges_incurred;
	}
	if (serviceListItem?.state === 'accepted_by_importer_exporter') {
		status = STATUS_ITEMS.approved;
	}
	if (serviceListItem?.state === 'cancelled_by_supplier') {
		status = STATUS_ITEMS.cancelled_by_supplier;
	}
	if (serviceListItem?.state === 'cancelled') {
		status = STATUS_ITEMS.cancelled_by_customer;
	}
	if (serviceListItem?.state === 'requested_for_service_provider') {
		status = STATUS_ITEMS.requested_for_service_provider;
	}
	if (serviceListItem?.state === 'amendment_requested_by_importer_exporter') {
		status = STATUS_ITEMS.amendment_requested_by_importer_exporter;
	}
	return status;
};

export default getStaus;
