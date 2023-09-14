import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

export const completedAwbFields = ({ t = () => {} }) => {
	const fields = [
		{
			key    : 'serialId',
			label  : t('printingDesk:completed_awb_fields_sid_label'),
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
			label : t('printingDesk:completed_awb_fields_awb_label'),
			span  : 1,
		},
		{
			key    : 'blCategory',
			label  : t('printingDesk:completed_awb_fields_awb_category_label'),
			span   : 1,
			render : (item) => (
				<div style={{ textTransform: 'uppercase' }}>
					{item.blCategory}
				</div>
			),
		},
		{
			key    : 'uploadedAt',
			label  : t('printingDesk:completed_awb_fields_uploaded_at_label'),
			span   : 1,
			render : (item) => (
				<div>
					{item?.uploadedAt ? formatDate({
						date       : item.uploadedAt,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})
						: '-'}
				</div>
			),
		},
		{
			key   : 'uploadedByUserName',
			label : t('printingDesk:completed_awb_fields_uploaded_by_label'),
			span  : 1,
		},
	];
	return fields;
};
