import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import Layout from '../../../../common/Layout';
import { PORT_PAIR_SERVICES } from '../../../../common/SERVICES';
import useUpdateOrganizationService from '../../../../hooks/useUpdateOrganizationService';

import getControls from './getControls';

function AddServices({
	service_type = '',
	org_id = '',
	selected = [],
	data = {},
	setIsEdit = () => { },
	locations_prefill = [],
}) {
	const controls = getControls({ organization_id: org_id });
	const {
		control, formValues: { errors = {} } = {},
		handleSubmit,
	} = useForm({ defaultValues: { location_pairs: locations_prefill } });

	const { onSubmit: addUpdateHandle = () => { } } = useUpdateOrganizationService();

	const fieldKey = PORT_PAIR_SERVICES.includes(service_type)
		? 'location_pairs'
		: 'locations';

	const selectedServices = selected.map((val) => {
		if (PORT_PAIR_SERVICES.includes(service_type)) {
			return {
				origin_location_id      : val?.origin_location_id,
				destination_location_id : val?.destination_location_id,
				total_teus              : '0 - 50',
			};
		}
		return {
			location_id : val?.location_id,
			trade_type  : val?.trade_type,
			total_teus  : '0 - 50',
		};
	});

	const onSubmit = async (values) => {
		const locations = [...selectedServices, ...values[fieldKey]];

		const formattedData = {
			service_data: { [fieldKey]: locations },
		};
		await addUpdateHandle({ service_data: formattedData, service_type, org_id, data });
		setIsEdit(false);
	};

	return (

		<div>
			<Layout control={control} errors={errors} controls={controls} />
			<div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
				<Button onClick={handleSubmit(onSubmit)}>
					Save
				</Button>
			</div>
		</div>

	);
}

export default AddServices;
