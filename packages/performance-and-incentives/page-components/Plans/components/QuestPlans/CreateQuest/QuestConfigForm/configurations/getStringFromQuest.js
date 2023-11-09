import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const getStringFromQuest = ({ data = {}, blockId = {}, questData = {} }) => {
	const { name, date_range } = questData;

	const formattedStringArray = Object.keys(data).map((key) => {
		const sub_block_name = blockId?.[key] === 'Default' ? '' : `${blockId?.[key]}:`;

		const some = (data?.[key] || []).map((item) => {
			const { agent_scoring_parameter_id = '', value = '' } = item || {};

			return `${sub_block_name} ${agent_scoring_parameter_id}: ${value}`;
		});

		return some.join(', ');
	});

	const start_date = formatDate({
		date       : date_range?.startDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		formatType : 'date',
	});

	const end_date = formatDate({
		date       : date_range?.endDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		formatType : 'date',
	});

	const formattedString = {
		value : `<b>${name}:</b> from <b>${start_date}</b> to <b>${end_date}</b> ${formattedStringArray.join(' + ')}`,
		label : `${name}: from ${start_date} to ${end_date} ${formattedStringArray.join(' + ')}`,
	};

	return formattedString;
};

export default getStringFromQuest;
