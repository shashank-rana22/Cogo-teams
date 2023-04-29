import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useEffect, useMemo } from 'react';

import createAudienceControls from './utils/createAudienceControls';

const useGetAudienceOptions = ({
	entity_data,
	countries,
	setConfigurationPage,
	setShowCreateAudienceModal,
	source,
}) => {
	const router = useRouter();

	const { control, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm();

	const entity_options = entity_data.map(({ business_name = '', id = '' }) => ({
		label : business_name,
		value : id,
	}));

	const watchFunctions = watch('auth_function');
	const watchPlatform = watch('platform');

	const indiaOption = countries.find((country) => country.country_code === 'IN');

	const countryOptions = [{
		label : indiaOption?.name,
		value : indiaOption?.id,
	}];

	countries.filter((country) => country.country_code !== 'IN').map((country) => {
		const option = { label: country.name, value: country.id };

		countryOptions.push(option);

		return countryOptions;
	});

	const { controls } = createAudienceControls({ entity_options, watchFunctions, countryOptions });

	useEffect(() => {
		setValue('auth_sub_function', null);
	}, [setValue, watchFunctions]);

	const onClickBackIcon = () => {
		if (source === 'create') {
			setShowCreateAudienceModal(false);
		} else {
			reset();
			setConfigurationPage('dashboard');
			router.back();
		}
	};

	const hiddenElements = useMemo(() => ({
		work_scope        : watchPlatform === 'admin',
		persona           : ['app', 'all', 'admin'].includes(watchPlatform),
		auth_function     : ['app', 'partner'].includes(watchPlatform),
		auth_sub_function : ['app', 'partner'].includes(watchPlatform) || watchFunctions === 'all',
	}), [watchFunctions, watchPlatform]);

	const showElements = useMemo(
		() => controls.reduce((pv, cv) => {
			const { name = '' } = cv;

			return { ...pv, [name]: !hiddenElements[name] };
		}, {}),

		[controls, hiddenElements],
	);

	return {
		entity_options,
		showElements,
		onClickBackIcon,
		control,
		handleSubmit,
		errors,
		controls,
	};
};

export default useGetAudienceOptions;
