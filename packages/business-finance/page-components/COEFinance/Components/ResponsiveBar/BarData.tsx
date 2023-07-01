import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const BarData = ({ dashboardData }) => dashboardData.map((item) => {
	const spitedDate = item?.date?.split(' ');
	let formatedDate = item?.date;

	if (Array.isArray(spitedDate)) {
		spitedDate[0] = formatDate({
			date       : spitedDate[0],
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
			formatType : 'date',
		});
		spitedDate[2] = formatDate({
			date       : spitedDate[2],
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
			formatType : 'date',
		});
		formatedDate = spitedDate?.join('');
	}

	return	{
		date     : formatedDate,
		Uploaded : item?.uploadedCount,
		Approved : item?.approvedCount,
		Rejected : item?.rejectedCount,
	};
});

export default BarData;
