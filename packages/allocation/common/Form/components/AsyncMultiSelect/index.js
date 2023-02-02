import { MultiSelect } from '@cogoport/components';
import { useGetAsyncOptions } from '@cogoport/forms';
import { asyncFieldsPartnerUsers } from '@cogoport/forms/utils/getAsyncFields';
import { isEmpty } from '@cogoport/utils';

const keyAsyncFieldsParamsMapping = {
	partner_users: asyncFieldsPartnerUsers,
};

function AsyncMultiSelect({ asyncKey, initialCall, params, getModifiedOptions, ...rest }) {
	const defaultParams = keyAsyncFieldsParamsMapping[asyncKey]?.() || {};

	const getAsyncOptionsProps = useGetAsyncOptions({
		...defaultParams,
		initialCall,
		params   : params || defaultParams.params,
		labelKey : rest.labelKey || defaultParams.labelKey,
		valueKey : rest.valueKey || defaultParams.valueKey,
	});

	if (typeof getModifiedOptions === 'function' && !isEmpty(getAsyncOptionsProps.options)) {
		getAsyncOptionsProps.options = getModifiedOptions({ options: getAsyncOptionsProps.options });
	}

	return (
		<MultiSelect
			{...rest}
			{...getAsyncOptionsProps}
		/>
	);
}

export default AsyncMultiSelect;
