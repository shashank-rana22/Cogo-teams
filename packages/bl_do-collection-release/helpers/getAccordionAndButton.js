import { isEmpty } from '@cogoport/utils';

const ACTION_BUTTON_MAPPING = {
	knockoff_pending   : 'Knock Off',
	collection_pending : 'Collect Document',
	under_collection   : 'Mark Collected',
	collected          : 'Release',
	released           : 'Mark Delivered',
	surrendered        : 'Surrender',
};

const conditionMapping = {
	fcl_freight_import : ['fcl_freight_local'],
	fcl_freight_export : ['fcl_freight', 'fcl_freight_local'],
	lcl_freight_import : ['lcl_freight_local'],
	lcl_freight_export : ['lcl_freight', 'lcl_freight_local'],
	fcl_local_import   : ['fcl_freight_local'],
	fcl_local_export   : ['fcl_freight_local'],
};

const getAccordionAndButton = ({ activeTab = '', item = {}, stateProps = {} }) => {
	let showAccordion = true;
	let showInvoiceAndTask = false;
	let showTask = false;
	let showDeliveryOrderTask = false;
	const actionButton = {
		show     : activeTab !== 'knockoff_pending',
		text     : ACTION_BUTTON_MAPPING[activeTab],
		disabled : false,
	};

	const { invoice_data = [] } = item;
	let bldoDoc = [];
	if (stateProps.activeTab === 'bl') {
		bldoDoc = item.bill_of_ladings || [];
	} else {
		bldoDoc = item.delivery_orders || [];
	}

	const isOldCollectionParty = (invoice_data || []).some(
		(inv) => inv.created_at < '2023-02-27',
	);

	let showKnockOff = isOldCollectionParty || false;

	if (!isOldCollectionParty) {
		const filteredInvoiceData = invoice_data?.filter(
			(inv) => inv?.service_name?.some((e) => conditionMapping[
				`${stateProps.shipment_type}_${item?.trade_type}`
			]?.includes(e))
				&& !['reimbursement', 'credit_note'].includes(inv?.invoice_type)
				&& inv.status !== 'init',
		);

		const checkInvoices = filteredInvoiceData?.every(
			(ele) => ele?.created_at > '2023-02-27'
				&& ['FULL', 'OVERPAID'].includes(ele?.payment_status),
		);

		showKnockOff = invoice_data && checkInvoices && !isEmpty(filteredInvoiceData);
	}

	switch (activeTab) {
		case 'knockoff_awaiting': {
			showAccordion = false;
			break;
		}
		case 'knockoff_pending': {
			if (showKnockOff) {
				actionButton.show = true;
			}
			if (isEmpty(invoice_data)) {
				actionButton.show = false;
			}
			break;
		}
		case 'collection_pending':
		case 'under_collection': {
			showInvoiceAndTask = true;
			break;
		}
		case 'collected': {
			if (bldoDoc.some((doc) => doc.status !== 'approved')) {
				showAccordion = false;
				actionButton.disabled = true;
				actionButton.text = 'Awaiting Approval';
				actionButton.class = 'awaiting';
			}

			if (bldoDoc.every((doc) => doc.status === 'approved')) {
				showAccordion = false;
				actionButton.disabled = true;
				actionButton.text = 'Awaiting Approval for Release';
				actionButton.class = 'awaiting';
			}
			if (bldoDoc.some((doc) => doc.status === 'release_pending')) {
				if (item?.trade_type !== 'import') {
					showAccordion = true;
				}
				if (item?.trade_type === 'import') {
					showDeliveryOrderTask = true;
				}
				actionButton.disabled = false;
				actionButton.text = 'Release';
				actionButton.class = 'release';
				showTask = true;
			}

			break;
		}
		case 'released': {
			if (
				item?.trade_type === 'import'
				|| (item?.status || []).includes('delivered')
			) {
				showAccordion = false;
				actionButton.show = false;
			}
			showTask = true;
			break;
		}
		case 'surrendered': {
			if (bldoDoc.every((doc) => doc.status === 'surrendered')) {
				showAccordion = false;
				actionButton.disabled = true;
				actionButton.text = 'BL SURRENDERED';
				actionButton.class = 'surrendered';
			}
			showTask = true;
			break;
		}
		case 'on_hold': {
			showAccordion = false;
			actionButton.show = false;
			break;
		}
		default: {
			break;
		}
	}

	return {
		showAccordion,
		actionButton,
		showInvoiceAndTask,
		showDeliveryOrderTask,
		showTask,
	};
};

export default getAccordionAndButton;
