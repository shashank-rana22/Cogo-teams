const HEADER_STYLES = {
	borderRadius : '8px 8px 0px 0px',
	borderBottom : '2px solid #F68B21',
	background   : 'white',
	color        : 'black',
	fontSize     : '14px',
	fontStyle    : 'normal',
	fontFamily   : 'Poppins',
	padding      : '20px',
};

const BODY_STYLES = {
	color      : '#333333',
	background : 'white',
	fontWeight : '400',
	fontSize   : '14px',
	lineHeight : '32px',
	fontFamily : 'Poppins',
	fontStyle  : 'normal',
	padding    : '0px 16px',
};

export const CYCLE_LIST_CONFIG = {
	showHeader   : true,
	headerStyles : HEADER_STYLES,
	bodyStyles   : BODY_STYLES,
	fields       : [
		{
			label : 'Cycle Name',
			key   : 'name',
			span  : 1.5,
			func  : 'renderName',
		},
		{
			label : 'Type',
			key   : 'cycleType',
			func  : 'renderType',
			span  : 1.5,
		},
		{
			label : 'Frequency',
			key   : 'frequency',
			func  : 'renderFrequency',
			span  : 1.5,
		},
		{
			label   : 'Created On',
			key     : 'createdAt',
			func    : 'renderCreatedOn',
			sorting : { name: 'createdAt' },
			span    : 1.5,
		},

		{
			label   : 'Last Edited On',
			key     : 'updatedAt',
			func    : 'renderUpdatedAt',
			sorting : { name: 'updatedAt' },
			span    : 1.5,
		},
		{
			label : 'Actions',
			func  : 'renderActions',
			span  : 1.5,
		},
		{
			key  : '',
			func : 'viewExecutions',
			span : 1.5,
		},
	],
};
