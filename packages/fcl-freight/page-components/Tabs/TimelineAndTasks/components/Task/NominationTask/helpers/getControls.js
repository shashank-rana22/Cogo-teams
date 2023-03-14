const getControls = ({
	taskData,
	task,
	shipment_data = {},
	shipment_overall_data = {},
}) => {
	if (task.task === 'update_nomination_details') {
		const options = [];
		(taskData?.apis_data?.list_organization_users || []).forEach((user) => {
			options.push({
				label: user.name,
				value: user.user_id,
			});
		});

		const ccOptions = [
			{
				label: task?.stakeholder?.name,
				value: task?.stakeholder?.id,
			},
		];

		return [
			{
				name: 'agent_id',
				type: 'select',
				label: 'To',
				span: 8,
				options,
				placeholder: 'Select Agent',
				rules: { required: 'Agent is required' },
			},

			{
				name: 'cc',
				type: 'select',
				span: 8,
				disabled: true,
				options: ccOptions,
				label: 'CC',
				value: task?.stakeholder?.id,
			},

			{
				name: 'email_body',
				type: 'textarea',
				// eslint-disable-next-line max-len
				value: `We have received nomination from below customer for ${shipment_data?.origin_port?.display_name} to ${shipment_data?.destination_port?.display_name}`,
				span: 12,
				label: 'Email Body',
				placeholder: 'Add Email Body Here',
				rules: { required: 'Email Body is required' },
			},
			{
				name: 'shipper_details',
				type: 'text',
				label: 'Shipper Details',
				rules: { required: 'Shipper Details is required' },
				span: 4,
				value: shipment_overall_data?.importer_exporter?.business_name || '',
			},
			{
				name: 'consignee_details',
				type: 'text',
				label: 'Consignee Details',
				rules: { required: 'Consignee Details is required' },
				span: 4,
				value: shipment_overall_data?.importer_exporter?.business_name || '',
			},
			{
				name: 'commodity',
				type: 'text',
				rules: { required: 'Commodity is required' },
				label: 'Commodity',
				span: 4,
				value: shipment_data?.commodity_description || '',
			},
			{
				name: 'hs_code',
				type: 'text',
				rules: { required: 'HS Code is required' },
				label: 'HS Code',
				span: 4,
				value: shipment_data?.hs_code?.hs_code_name || '',
			},
			{
				name: 'cargo_weight',
				type: 'number',
				rules: { required: 'Cargo Wt. is required' },
				label: 'Cargo Weight (Per Container)',
				span: 4,
				value: shipment_data?.cargo_weight_per_container || '',
			},
			{
				name: 'free_days_detention_destination',
				type: 'number',
				rules: { required: 'Detention days is required' },
				label: 'Free Detention Days',
				span: 4,
				value: shipment_data?.free_days_detention_destination || '',
			},
		];
	}

	return [];
};

export default getControls;
