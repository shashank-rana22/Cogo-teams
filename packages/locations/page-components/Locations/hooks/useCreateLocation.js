import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';

const useCreateLocation = () => {
	const { t } = useTranslation(['locations']);

	const [{ loading }, trigger] = useRequest({
		url    : '/create_location',
		method : 'post',
	}, { manual: true });

	const {
		handleSubmit, control, formState: { errors },
		watch,
	} = useForm();

	const onCreate = async ({ data:{ values = [] } }) => {
		console.log(values);
		const NEW_ALIASES = [];
		values?.aliases_attributes?.forEach((aliases) => {
			NEW_ALIASES.push(aliases.name);
		});
		const {
			name, type,
			address,
			status, region_id,
			local_languages,
			latitude, longitude,
			flag_icon_url, flag_image_url,
			country_id, country_code,
			zone_id,
		} = values;
		const formattedValues = {
			aliases_attributes : NEW_ALIASES,
			name,
			type,
			address,
			status,
			region_id,
			local_languages,
			latitude,
			longitude,
			flag_icon_url      : flag_icon_url?.finalUrl,
			flag_image_url     : flag_image_url?.finalUrl,
			country_id,
			country_code,
			zone_id,
			// subdistrict_id     : '',

		};
		// formattedValues.is_icd = formattedValues.is_icd === 'Yes';

		// const payload = { ...formattedValues:formattedValues };

		try {
			const res = await trigger({ data: formattedValues });
			if (res?.data) {
				Toast.success(t('locations:location_created_successfully'));
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
		onCreate,
	};
};

export default useCreateLocation;
