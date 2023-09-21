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
	setIsEdit = () => { },
	locations_prefill = [],
	service_data = {},
	// data = {},
}) {
	const controls = getControls({ organization_id: org_id });
	const {
		control, formValues: { errors = {} } = {},
		handleSubmit,
	} = useForm({ defaultValues: { location_pairs: locations_prefill } });

	const { apiTrigger: addUpdateHandle = () => { } } = useUpdateOrganizationService();

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
		const locationPairs = formattedData?.service_data?.location_pairs.map((item) => {
			const keys = Object.keys(item);
			if (keys.includes('location_id')) {
				return {
					location_id : item?.location_id,
					trade_type  : item?.trade_type,
					total_teus  : item?.total_teus,
					user_id     : item?.user_id,
				};
			}
			return {
				origin_location_id      : item?.origin_location_id,
				destination_location_id : item?.destination_location_id,
				total_teus              : item?.total_teus,
				user_id                 : item?.user_id,
			};
		});
		formattedData.service_data.location_pairs = locationPairs;
		formattedData.service_data = { ...service_data, ...formattedData.service_data };

		await addUpdateHandle({
			data: {
				service_data          : formattedData?.service_data,
				service               : service_type,
				organization_id       : org_id,
				delete_rest_expertise : false,
			},
		});
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
