import { toast } from '@cogoport/front/components';
import useForm from '@cogoport/front/hooks/useFormCogo';
import useAxios from 'axios-hooks';

import useGetEntityStakeholderMappings from './useGetEntityStakeholderMappings';

const controls = [
	{
		name         : 'cogo_serial_id',
		label        : 'Cogo Shipment ID',
		placeholder  : 'e.g. 123321',
		type         : 'number',
		showOptional : false,
		className    : 'primary lg',
		span         : 4,
		rules        : { required: 'Shipment ID is required' },
	},
	{
		name        : 'entity_type',
		label       : 'Email Type',
		placeholder : 'e.g. booking note',
		type        : 'select',
		theme       : 'admin',
		options     : [
			{ label: 'Bill of lading', value: 'bill_of_lading' },
			{ label: 'Booking Note', value: 'booking_note' },
		],
		showOptional : false,
		className    : 'primary lg',
		span         : 4,
	},
	// {
	// 	name: 'entity_name',
	// 	label: 'Cogo Organization',
	// 	placeholder: 'e.g. maersk',
	// 	type: 'select',
	// 	theme: 'admin',
	// 	options: [{ label: 'Maersk', value: 'maersk' }],
	// 	showOptional: false,
	// 	className: 'primary lg',
	// 	span: 4,
	// },
];

/**
 * Single utility hook to classify mails
 */

const useClassifyMail = ({ onClassify }) => {
	const [classifyMailApi, triggerClassifyMail] = useAxios(
		{
			url    : `${process.env.COGO_LENS_URL}/update_rpa_mail`,
			method : 'POST',
		},
		{ manual: true },
	);

	const { options } = useGetEntityStakeholderMappings();

	const { fields, handleSubmit, watch } = useForm(controls);

	/**
	 *
	 * @param {*} id
	 */
	const classifyMail = async ({ mail_id, formValues }) => {
		try {
			await triggerClassifyMail({
				data: {
					mail_id,
					...formValues,
					cogo_serial_id: Number(formValues?.cogo_serial_id),
				},
			});
			toast.success('Email Classified successfully !!!');
			onClassify();
		} catch (err) {
			console.log(err);
		}
	};

	fields.entity_type.options = options;

	return {
		classifyMailApi,
		classifyMail,
		fields,
		handleSubmit,
		watch,
		controls,
	};
};

export default useClassifyMail;
