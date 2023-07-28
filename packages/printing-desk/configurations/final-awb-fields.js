import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

export const finalAwbFields = {
	fields: [
		{
			key    : 'serialId',
			label  : 'SID',
			span   : 1,
			render : (item) => (
				<div>
					#
					{item.serialId}
				</div>
			),
		},
		{
			key   : 'awbNumber',
			label : 'AWB',
			span  : 1,
		},
		{
			key    : 'blCategory',
			label  : 'AWB Category',
			span   : 1,
			render : (item) => (
				<div style={{ textTransform: 'uppercase' }}>
					{item.blCategory}
				</div>
			),
		},
		{
			key    : 'deadline',
			label  : 'Due On',
			span   : 1,
			render : (item) => (
				<div style={{ textTransform: 'uppercase' }}>
					{formatDate({
						date       : item?.deadline,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',

					})}
				</div>
			),
		},
		{
			key   : 'upload',
			label : 'Action',
			span  : 1,
			func  : 'handleUpload',
		},
	],
};
