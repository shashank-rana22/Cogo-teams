import { format, startCase } from '@cogoport/utils';

import ANNOUNCEMENT_TYPE_MAPPING from '../../../constants/ANNOUNCEMENT_TYPE_MAPPING.json';

const getSingleCardOptions = ({ data = {} }) => {
	const options = [
		{ label: 'Title', value: startCase(data?.title) },
		{
			label : 'Validity',
			value : `${format(data?.validity_start, 'dd MMM yyyy hh:mm a')} - 
                     ${format(data?.validity_end, 'dd MMM yyyy hh:mm a')}`,
		},
		{ label: 'Created By', value: 'Khushal Paliwal' },
		{ label: 'Type', value: ANNOUNCEMENT_TYPE_MAPPING[data?.announcement_type] },
		{ label: 'Status', value: data?.status },
		{ label: 'Actions', value: 1 },
	];

	return options;
};
export default getSingleCardOptions;
