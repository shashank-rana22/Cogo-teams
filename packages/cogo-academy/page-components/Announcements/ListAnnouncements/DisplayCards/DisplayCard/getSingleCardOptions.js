import { format, startCase } from '@cogoport/utils';

import ANNOUNCEMENT_TYPE_MAPPING from '../../../constants/ANNOUNCEMENT_TYPE_MAPPING.json';

const getSingleCardOptions = ({ data = {} }) => {
	const {
		title = '',
		validity_start = '',
		validity_end = '',
		announcement_type = '',
		status = '',
		author_info = {},
	} = data;

	const { name:author_name = '' } = author_info;

	const options = [
		{ label: 'Title', value: startCase(title) },
		{
			label : 'Validity',
			value : `${format(validity_start, 'dd MMM yyyy hh:mm a')} - 
                     ${format(validity_end, 'dd MMM yyyy hh:mm a')}`,
		},
		{ label: 'Created By', value: author_name },
		{ label: 'Type', value: ANNOUNCEMENT_TYPE_MAPPING[announcement_type] },
		{ label: 'Status', value: status },
		{ label: 'Actions', value: 1 },
	];

	return options;
};
export default getSingleCardOptions;
