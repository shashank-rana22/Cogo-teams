import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

const STATUS_PILL_MAPPING = {
	uploaded: {
		label : 'Uploaded',
		color : '#fef199',
	},

	processing: {
		label : 'Processing',
		color : '#cfeaed',
	},
	WRONG_UPLOAD: {
		label : 'Wrong Upload',
		color : '#f8aea8',
	},
	WRONG_DOING: {
		label : 'Wrong Doing',
		color : '#f8aea8',
	},
	success: {
		label : 'Processed',
		color : '#c4dc91',
	},
};

const FILE_STATS_MAPPING = {
	unique_leads_created_count     : 'Unique Leads Created',
	leads_updated_count            : 'Leads Updated',
	shipment_records_created_count : 'Shipment Records Created',
	processed_records_count        : 'Processed Records',
	not_processed_records_count    : 'Not Processed Records',
};

const ICON_MAPPING = {
	asc: {
		setSort   : 'desc',
		Component : IcMArrowRotateUp,
	},
	desc: {
		setSort   : 'asc',
		Component : IcMArrowRotateDown,
	},
};

function getConstants() {
	return {
		STATUS_PILL_MAPPING,
		FILE_STATS_MAPPING,
		ICON_MAPPING,
	};
}

export default getConstants;
