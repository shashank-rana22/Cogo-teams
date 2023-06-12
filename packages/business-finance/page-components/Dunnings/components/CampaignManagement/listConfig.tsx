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

export const listConfig = () => ({
	showHeader   : true,
	headerStyles : HEADER_STYLES,
	bodyStyles   : BODY_STYLES,
	fields       : [
		{
			label : 'Name',
			key   : 'name',
			span  : 1.6,
		},
		{
			label : 'Type',
			key   : 'Type',
			span  : 1.6,
		},
		{
			label : 'Frequency',
			key   : 'Frequency',
			span  : 1.6,
		},
		{
			label : 'Created On',
			key   : 'CreatedOn',
			span  : 1.6,
		},

		{
			label : 'Last Edited On',
			key   : 'LastEditedOn',
			span  : 1.6,
		},
		{
			label : 'Actions',
			func  : 'renderActions',
			span  : 1.6,
		},
		{
			key  : '',
			func : 'viewMore',
			span : 1.6,
		},
	],
});
