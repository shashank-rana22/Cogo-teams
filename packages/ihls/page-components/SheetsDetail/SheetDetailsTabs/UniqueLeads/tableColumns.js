import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';

const orgTypeMapping = (item) => {
	const TYPE = [];
	const MAPPING = {
		is_importer : 'Importer',
		is_exporter : 'Exporter',
		is_cha      : 'CHA',
	};
	Object.keys(MAPPING).forEach((key) => {
		if (item[key]) {
			TYPE.push(MAPPING[key]);
		}
	});
	return isEmpty(TYPE) ? '-' : TYPE.join(', ');
};
export const tabColumns = [
	{ Header: '#', accessor: (item) => (item?.id || '-') },
	{ Header: 'Name', accessor: (item) => (item?.name || '-') },
	{ Header: 'PAN', accessor: (item) => (item?.registration_number || '-') },
	{ Header: 'IEC', accessor: (item) => (item?.iec || '-') },
	{ Header: 'Type', accessor: (item) => (orgTypeMapping(item) || '-') },
	{
		Header   : 'Created At',
		accessor : (item) => (formatDate({
			date       : (item?.created_at),
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		})) || '-',
	},
	{
		Header   : 'Updated At',
		accessor : (item) => (formatDate({
			date       : (item?.updated_at) || (item?.created_at),
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		})) || '-',
	},

];
