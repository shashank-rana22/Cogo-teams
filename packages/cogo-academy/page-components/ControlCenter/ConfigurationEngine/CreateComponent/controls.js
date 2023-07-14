import { startCase } from '@cogoport/utils';

const getControls = ({ queryValue }) => {
	const controls = [
		{
			name        : 'name',
			type        : 'text',
			label       : `${startCase(queryValue || '')} Name`,
			placeholder : 'Enter Name...',
			rules       : {
				required: 'Name is required',
			},
		},
		{
			name        : 'description',
			type        : 'text',
			label       : `${startCase(queryValue || '')} Description *`,
			placeholder : 'Enter Description...',
		},
	];

	return { controls };
};

export default getControls;
