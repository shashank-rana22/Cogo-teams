import { useState } from 'react';

const GetOperatorsConfig = ({ formValues, formType = 'rfq' }) => {
	const [prefferedCache, setPrefferedCache] = useState(false);
	const [excludedCache, setExcludedCache] = useState(false);

	const rfqMapping = {
		preferred_shipping_lines : 'excluded_shipping_lines',
		excluded_shipping_lines  : 'preferred_shipping_lines',
		excluded_air_lines       : 'preferred_air_lines',
		preferred_air_lines      : 'excluded_air_lines',
	};

	const contractMapping = {
		exclude_operator_ids   : 'preferred_operator_ids',
		preferred_operator_ids : 'exclude_operator_ids',
	};

	const lockRateMapping = {
		exclude_shipping_line_ids   : 'preferred_shipping_line_ids',
		preferred_shipping_line_ids : 'exclude_shipping_line_ids',
	};

	const optionsMapping = {
		contract  : contractMapping,
		lock_rate : lockRateMapping,
		rfq       : rfqMapping,
	};

	const keysMapping = optionsMapping[formType] || rfqMapping;

	const updateCache = async (itemName) => {
		if (
			[
				'preferred_shipping_lines',
				'preferred_air_lines',
				'preferred_operator_ids',
				'preferred_shipping_line_ids',
			].includes(itemName)
		) {
			setPrefferedCache(true);
			setExcludedCache(false);
		}
		if (
			[
				'excluded_shipping_lines',
				'excluded_air_lines',
				'exclude_operator_ids',
				'exclude_shipping_line_ids',
			].includes(itemName)
		) {
			setPrefferedCache(false);
			setExcludedCache(true);
		}
	};

	const params = (itemName) => {
		if (Object.keys(keysMapping).includes(itemName)) {
			return {
				params: {
					filters: {
						exclude_ids: formValues?.[keysMapping[itemName]],
					},
				},
			};
		}

		return {};
	};

	const getCacheOptions = (itemName) => {
		if (
			[
				'preferred_shipping_lines',
				'preferred_air_lines',
				'preferred_operator_ids',
				'preferred_shipping_line_ids',
			].includes(itemName)
		) {
			return prefferedCache;
		}
		if (
			[
				'excluded_shipping_lines',
				'excluded_air_lines',
				'exclude_operator_ids',
				'exclude_shipping_line_ids',
			].includes(itemName)
		) {
			return excludedCache;
		}
		return true;
	};

	return {
		prefferedCache,
		excludedCache,
		keysMapping,
		params,
		updateCache,
		getCacheOptions,
	};
};

export default GetOperatorsConfig;
