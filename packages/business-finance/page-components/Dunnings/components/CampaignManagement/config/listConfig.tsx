const HEADER_STYLES = {
	borderRadius : '8px',
	background   : '#ffe9d5',
	color        : 'black',
	fontSize     : '12px',
	fontStyle    : 'normal',
	fontFamily   : 'Poppins',
	padding      : '20px 4px',
	fontWeight   : 600,
};

const BODY_STYLES = {
	color      : '#333333',
	background : 'white',
	fontWeight : '400',
	fontSize   : '12px',
	lineHeight : '24px',
	fontFamily : 'Poppins',
	fontStyle  : 'normal',
	padding    : '0px 8px',
};

export const LIST_CONFIG = {
	showHeader   : true,
	headerStyles : HEADER_STYLES,
	bodyStyles   : BODY_STYLES,
	fields       : [
		{
			label : 'Name',
			key   : 'name',
			span  : 1.5,
			func  : 'renderName',
		},
		{
			label : 'Type',
			key   : 'dunningCycleType',
			func  : 'renderCycleType',
			span  : 1.5,
		},
		{
			label : 'Frequency',
			key   : 'Frequency',
			func  : 'renderFrequency',
			span  : 1.5,
		},
		{
			label   : 'Created On',
			key     : 'CreatedOn',
			func    : 'renderCreatedOn',
			sorting : { name: 'createdAt' },
			span    : 1.5,
		},

		{
			label   : 'Last Edited On',
			key     : 'LastEditedOn',
			func    : 'renderUpdatedAt',
			sorting : { name: 'updatedAt' },
			span    : 1.5,
		},
		{
			label : 'Status',
			key   : 'status',
			func  : 'renderStatus',
			span  : 1.5,
		},
		{
			key  : '',
			func : 'viewMore',
			span : 1.5,
		},
	],
};
