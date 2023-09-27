import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';

const useCreateUpdate = () => {
	const { t } = useTranslation(['locations']);

	const [{ loading }, trigger] = useRequest({
		url    : '/create_location',
		method : 'post',
	}, { manual: true });

	const {
		handleSubmit, getValues, control, formState: { errors },
		watch,
	} = useForm();

	const onCreate = async ({ data }) => {
		console.log(data);
		const NEW_ALIASES = [];
		data?.aliases_attributes.forEach((aliases) => {
			NEW_ALIASES.push({ name: aliases.name });
		});
		const formattedValues = {
			aliases_attributes: NEW_ALIASES,
			actual_location_type:
			'sd',
			address:
			'sd',
			continent_id:
			'4de32623-213a-4023-89d0-337390fd8fc3',
			country_id:
			'9a28b04b-4c9f-4301-942a-fe4c6a30e84b',
			is_icd:
			false,
			latitude:
			'12',
			local_languages:
			'["english"]',
			longitude:
			'12',
			meta_data:
			{},
			name:
			's',
			region_id:
			'25dae478-6c15-413c-b558-4f54534c0cc3',
			status:
			'active',
			trade_id:
			'a89d24bc-715b-4d11-b2ff-d33164015fdd',
			type:
			'city',
			zone_id:
			'1ae7237e-77f5-43c0-807f-2124836c7369',
			subdistrict_id:
'e68485e9-c0eb-40b1-86d1-1e14b9190f9a',
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

export default useCreateUpdate;
