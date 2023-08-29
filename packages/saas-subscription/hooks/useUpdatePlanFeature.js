import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

import getAddonConfig from '../configuration/addonConfig';
import { getUpdatePlanFeatureConfig } from '../configuration/planFeatureConfig';
import getUpdateAddonControl, { ADDON_DEFAULT_VALUE } from '../configuration/updateAddonControl';
import getUpdatePlanFeatureControl, { PLAN_FEATURE_DEFAULT_VALUE } from '../configuration/updatePlanFeatureControl';

const createDrafultValue = (list, name) => {
	if (name === 'addon') {
		const defaultValue = list.map((item) => ({
			product_id : item?.saas_product_id,
			count      : item?.unit_count,
			discount   : item?.discount_percent || GLOBAL_CONSTANTS.zeroth_index,
		}));
		return ({
			updateAddon: defaultValue,
		});
	}

	const defaultValue = list.map((item) => ({
		value        : item?.value,
		display_name : item?.display_name,
		sequence     : item?.sequence,
	}));
	return ({
		updatePlanFeature: defaultValue,
	});
};

const getFeatureMapping = (info, name, t) => ({
	addon: {
		name         : 'updateAddon',
		title        : 'Add Add-ons',
		configs      : getAddonConfig({ t }),
		formControls : getUpdateAddonControl({ t }),
		defaultValue : createDrafultValue(info, name),
		appendValue  : ADDON_DEFAULT_VALUE,
	},
	planFeature: {
		name         : 'updatePlanFeature',
		title        : 'Add Plan Feature',
		configs      : getUpdatePlanFeatureConfig({ t }),
		formControls : getUpdatePlanFeatureControl({ t }),
		defaultValue : createDrafultValue(info, name),
		appendValue  : PLAN_FEATURE_DEFAULT_VALUE,
	},
});

const useUpdatePlanFeature = ({ planId = '', setFeatureModal }) => {
	const [{ loading: addonLoading }, addonTrigger] = useRequest({
		url    : '/update_saas_product_plan_mapping',
		method : 'post',
	}, { manual: true });

	const [{ loading }, trigger] = useRequest({
		url    : '/update_saas_plan_details',
		method : 'post',
	}, { manual: true });

	const modalCloseHandler = (value = false) => {
		setFeatureModal({ openModal: false, apiCall: value });
	};

	const updateAddonHandler = async (data) => {
		try {
			await addonTrigger({
				data: {
					saas_plan_id : planId,
					addons       : data?.updateAddon,
				},
			});
			modalCloseHandler(true);
			Toast.success('SuccessFully updated Add-ons');
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	const updateFeatureHandler = async (data) => {
		try {
			await trigger({
				data: {
					saas_plan_id : planId,
					plan_details : data?.updatePlanFeature,
				},
			});
			modalCloseHandler(true);
			Toast.success('SuccessFully updated Plan Feature');
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	const submitHandlerMapping = {
		addon       : updateAddonHandler,
		planFeature : updateFeatureHandler,
	};

	return {
		updateAddonHandler,
		updateFeatureHandler,
		getFeatureMapping,
		submitHandlerMapping,
		modalCloseHandler,
		loading: loading || addonLoading,
	};
};

export default useUpdatePlanFeature;
