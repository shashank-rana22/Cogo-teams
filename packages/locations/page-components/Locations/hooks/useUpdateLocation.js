import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';

const useUpdateLocation = () => {
	const { t } = useTranslation(['locations']);

	const [{ loading }, trigger] = useRequest({
		url    : '/update_location',
		method : 'post',
	}, { manual: true });

	const {
		handleSubmit, control, formState: { errors },
		watch,
	} = useForm();

	const apiTrigger = async ({ data:{ values = {} }, id }) => {
		console.log(values);
		const NEW_ALIASES = [];
		const {
			performed_by_id,
			performed_by_type,
			name,
			display_name,
			type,
			actual_location_type,
			postal_code,
			status,
			latitude,
			longitude,
			address,
			flag_icon_url,
			flag_image_url,
			zone_id,
			region_id,
			city_id,
			cluster_id,
			pincode_id,
			locality_id,
			continent_id,
			trade_id,
			site_code,
			port_code,
			district_id,
			subdistrict_id,
			country_id,
		} = values;

		values?.aliases_attributes?.map((aliases) => (
			NEW_ALIASES.push({ name: aliases?.name })
		));
		const formattedValues = {
			locality_id        : id,
			id,
			aliases_attributes : NEW_ALIASES,
			name,
			type,
		};
		// formattedValues.is_icd = formattedValues.is_icd === 'Yes';

		// const payload = { ...formattedValues:formattedValues };

		try {
			const res = await trigger({ data: formattedValues });
			if (res?.data) {
				Toast.success(t('locations:location_updated_successfully'));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return {
		handleSubmit,
		errors,
		watch,
		control,
		loading,
		apiTrigger,
	};
};

export default useUpdateLocation;
