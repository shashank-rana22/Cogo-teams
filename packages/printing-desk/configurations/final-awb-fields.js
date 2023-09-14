import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

export const finalAwbFields = ({ t = () => {} }) => {
	const fields = [
		{
			key    : 'serialId',
			label  : t('printingDesk:final_awb_fields_sid_label'),
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
			label : t('printingDesk:final_awb_fields_awb_label'),
			span  : 1,
		},
		{
			key    : 'blCategory',
			label  : t('printingDesk:final_awb_fields_awb_category_label'),
			span   : 1,
			render : (item) => (
				<div style={{ textTransform: 'uppercase' }}>
					{item.blCategory}
				</div>
			),
		},
		{
			key    : 'deadline',
			label  : t('printingDesk:final_awb_fields_due_on_label'),
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
			label : t('printingDesk:final_awb_fields_action_label'),
			span  : 1,
			func  : 'handleUpload',
		},
	];
	return fields;
};
