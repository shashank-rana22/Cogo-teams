import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import addonConfig from '../configuration/addonConfig';
import { updatePlanFeatureConfig } from '../configuration/planFeatureConfig';
import updateAddonControl, { addonDefaultValue } from '../configuration/updateAddonControl';
import updatePlanFeatureControl, { planFeatureDefaultValue } from '../configuration/updatePlanFeatureControl';

const createDrafultValue = (list, name) => {
	if (name === 'addon') {
		const defaultValue = list.map((item) => ({
			product_id : item?.saas_product_id,
			count      : item?.unit_count,
			discount   : item?.discount_percent || 0,
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

const getFeatureMapping = (info, name) => ({
	addon: {
		name         : 'updateAddon',
		title        : 'Add Add-ons',
		configs      : addonConfig,
		formControls : updateAddonControl,
		defaultValue : createDrafultValue(info, name),
		appendValue  : addonDefaultValue,
	},
	planFeature: {
		name         : 'updatePlanFeature',
		title        : 'Add Plan Feature',
		configs      : updatePlanFeatureConfig,
		formControls : updatePlanFeatureControl,
		defaultValue : createDrafultValue(info, name),
		appendValue  : planFeatureDefaultValue,
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
