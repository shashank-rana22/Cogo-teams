import { Select } from '@cogoport/components';
import { useGetAsyncOptions } from '@cogoport/forms';
import { asyncFieldsOrganizations } from '@cogoport/forms/utils/getAsyncFields';
import { isEmpty } from '@cogoport/utils';

const keyAsyncFieldsParamsMapping = {
	organizations: asyncFieldsOrganizations,
};

function AsyncSelect({ asyncKey, initialCall, params, getModifiedOptions, ...rest }) {
	const defaultParams = keyAsyncFieldsParamsMapping[asyncKey]?.() || {};

	const getAsyncOptionsProps = useGetAsyncOptions({
		...(defaultParams),
		initialCall,
		params,
		labelKey : rest.labelKey || defaultParams.labelKey,
		valueKey : rest.valueKey || defaultParams.valueKey,
	});

	if (typeof getModifiedOptions === 'function' && !isEmpty(getAsyncOptionsProps.options)) {
		getAsyncOptionsProps.options = getModifiedOptions({ options: getAsyncOptionsProps.options });
	}

	return (
		<Select
			{...rest}
			{...getAsyncOptionsProps}
		/>
	);
}

export default AsyncSelect;
