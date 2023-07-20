export const uploadHistoryConfig = {
	showHeader   : true,
	pageLimit    : 20,
	headerStyles : {
		borderRadius : '8px',
		background   : 'none',
		color        : 'black',
		marginLeft   : '8px',
	},
	bodyStyles: {
		color      : ' #333333',
		fontWeight : '400',
		fontSize   : '12px',
		borderTop  : '1.8px solid #F68B21',
	},
	fields: [
		{
			key   : 'fileName',
			label : 'File Name',
			func  : 'renderDownloadUploadHistoryFile',
			span  : 5,
		},
		{
			label : 'File Status',
			key   : 'status',
			span  : 2.5,
			func  : 'renderStatusDownload',
		},

		{
			label   : 'Uploaded Date',
			key     : 'createdAt',
			span    : 2.5,
			sorting : { name: 'uploadDateSortType' },
		},
		{
			label : 'Uploaded By',
			key   : 'createdBy',
			span  : 2,
		},
	],
};
