import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const isEqualDate = ({ date, selectedItem }) => formatDate({
	date       : selectedItem,
	formatType : 'date',
	dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM YYYY'],
}) === formatDate({
	date,
	formatType : 'date',
	dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM YYYY'],
});

const isEqualWeek = ({ date, endDate, selectedItem }) => (selectedItem.getTime() >= date.getTime())
	&& (selectedItem.getTime() <= endDate?.getTime());

const isEqualMonth = ({ date, selectedItem }) => selectedItem.getMonth() === date.getMonth()
	&& selectedItem.getFullYear() === date.getFullYear();

const getEqualDateFunction = ({ date, endDate, selectedItem }) => {
	const DATE_FUNCTION = {
		day   : isEqualDate({ date, selectedItem }),
		week  : isEqualWeek({ date, endDate, selectedItem }),
		month : isEqualMonth({ date, selectedItem }),
	};

	return DATE_FUNCTION;
};

const checkForActiveItem = ({ date, endDate, timeline, selectedItem }) => (
	getEqualDateFunction({ date, endDate, selectedItem })[timeline]
);

export default checkForActiveItem;
