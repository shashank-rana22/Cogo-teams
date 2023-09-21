const FIRST_ID = 1;
const SECOND_ID = 2;
const THIRD_ID = 3;

export const getCardDataFromId = (id) => {
	let tabName = '';
	let tabToOpen = '';
	let timelineItem = '';

	const fillData = ({ tabNameValue, tabToOpenValue, timelineItemValue }) => {
		tabName = tabNameValue;
		tabToOpen = tabToOpenValue;
		timelineItem = timelineItemValue;
	};

	switch (id) {
		case (FIRST_ID):
			fillData({
				tabNameValue      : 'collectionPartyTab',
				tabToOpenValue    : 'billingPartyTab',
				timelineItemValue : 'collectionPartyCheck',
			});
			break;

		case (SECOND_ID):
			fillData({
				tabNameValue      : 'billingPartyTab',
				tabToOpenValue    : 'invoiceDetailsTab',
				timelineItemValue : 'billingPartyCheck',
			});
			break;

		case (THIRD_ID):
			fillData({
				tabNameValue      : 'invoiceDetailsTab',
				tabToOpenValue    : 'lineItemsTab',
				timelineItemValue : 'invoiceDetailsCheck',
			});
			break;

		default:
			tabToOpen = 'No Next Tab';
	}

	return { tabName, tabToOpen, timelineItem };
};
