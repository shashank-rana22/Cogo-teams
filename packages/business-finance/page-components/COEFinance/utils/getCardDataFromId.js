const FIRST_ID = 1;
const SECOND_ID = 2;
const THIRD_ID = 3;

export const getCardDataFromId = (id) => {
	let tabName = '';
	let tabToOpen = '';
	let timelineItem = '';

	const fillData = (TabName, TabToOpen, TimelineItem) => {
		tabName = TabName;
		tabToOpen = TabToOpen;
		timelineItem = TimelineItem;
	};

	switch (id) {
		case (FIRST_ID):
			fillData('collectionPartyTab', 'billingPartyTab', 'collectionPartyCheck');
			break;

		case (SECOND_ID):
			fillData('billingPartyTab', 'invoiceDetailsTab', 'billingPartyCheck');
			break;

		case (THIRD_ID):
			fillData('invoiceDetailsTab', 'lineItemsTab', 'invoiceDetailsCheck');
			break;

		default:
			tabToOpen = 'No Next Tab';
	}

	return { tabName, tabToOpen, timelineItem };
};
