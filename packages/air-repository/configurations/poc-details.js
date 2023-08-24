export const pocDetailsFields = (t = () => {}) => ({
	fields: [
		{
			key   : 'name',
			label : t('airRepository:poc_name_field_label'),
			span  : 4,
		},
		{
			key   : 'email',
			label : t('airRepository:poc_email_field_label'),
			span  : 4,
		},
		{
			key   : 'contact',
			label : t('airRepository:poc_contact_field_label'),
			span  : 4,
			func  : 'handleContact',
		},
	],
});
