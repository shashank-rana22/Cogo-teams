import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { getApiErrorString, isEmpty } from '@cogoport/utils';

import getOrganizationDetails from '../configs/controls/getOrganizationDetails';

const useSaveConvenienceRateCustomConfig = (props) => {
	const router = useRouter();
	const { convenience_rate_id, service } = router?.query || {};

	const {
		activeList = 'active',
		itemValue,
		organizationDetails,
		onClosingForm,
		defaultConfigFeeUnit = '',
	} = props;

	const { organization_data = [], id: item_id } = itemValue || {};

	const controls = getOrganizationDetails({
		values: itemValue,
		organizationDetails,
		service,
	});

	const isUpdatable = !isEmpty(itemValue);

	const apiName = isUpdatable
		? 'update_convenience_rate_custom_configuration'
		: 'create_convenience_rate_custom_configuration';

	const [{ loading }, trigger] = useRequest({
		url    : `/${apiName}`,
		method : 'POST',
	}, { manual: true });

	const DEFAULT_VALUES = {};

	const { control, formState:{ errors = {} } = {}, handleSubmit, watch } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	const onSave = async (values = {}) => {
		const { fees = {}, organization_ids = [], slab_details = [] } = values;

		const org_ids = (organization_data || []).map(
			(data) => data?.organization_id,
		);

		const deleted_organization_ids = (org_ids || []).filter(
			(id) => !(organization_ids || []).includes(id),
		);

		try {
			const containerSlabs = slab_details.map((container_slab) => ({
				fee_currency      : container_slab?.fee_currency || undefined,
				fee_unit          : container_slab.fee_unit || undefined,
				fee_value         : container_slab.fee_value || undefined,
				slab_lower_limit  : container_slab.slab_lower_limit || undefined,
				maximum_fee_value : container_slab.maximum_fee_value || undefined,
				minimum_fee_value : container_slab.minimum_fee_value || undefined,
				slab_unit         : container_slab.slab_unit || undefined,
				slab_upper_limit  : container_slab.slab_upper_limit || undefined,
				is_default        : container_slab.fee_unit === defaultConfigFeeUnit,
			}));

			const payload = {
				deleted_organization_ids,
				slab_details                      : containerSlabs,
				status                            : activeList,
				id                                : item_id,
				...fees,
				...(!isEmpty(organization_ids) ? { organization_ids } : {}),
				convenience_rate_configuration_id : convenience_rate_id,
			};

			await trigger({
				params: payload,
			});

			Toast.success(
				`Custom rate ${isUpdatable ? 'updated' : 'created'} sucessfully`,
				{
					autoClose: 3000,
				},
			);

			onClosingForm();
		} catch (error) {
			Toast.error(getApiErrorString(error.data));
		}
	};

	const onClickDeactivate = async () => {
		try {
			const watchFees = watch('fees');
			const watchOrgIds = watch('organization_ids');

			const org_ids = (organization_data || []).map(
				(data) => data?.organization_id,
			);

			const deleted_organization_ids = (org_ids || []).filter(
				(id) => !(watchOrgIds || []).includes(id),
			);

			await trigger({
				data: {
					id                                : item_id,
					convenience_rate_configuration_id : convenience_rate_id,
					organization_ids                  : watchOrgIds,
					deleted_organization_ids,
					...(itemValue?.status === 'inactive'
						? { slab_details: itemValue?.slab_details }
						: {}),
					status: itemValue?.status === 'active' ? 'inactive' : 'active',
					...watchFees,
				},
			});

			Toast.success(
				`Custom configuration ${
					itemValue?.status === 'active' ? 'deactivated' : 'activated'
				} successfully`,
			);

			onClosingForm();
		} catch (error) {
			Toast.error(getApiErrorString(error.data));
		}
	};

	return {
		onSave,
		loading,
		controls,
		control,
		errors,
		handleSubmit,
		onClosingForm,
		isUpdatable,
		onClickDeactivate,
		configStatus: itemValue?.status,
	};
};

export default useSaveConvenienceRateCustomConfig;
