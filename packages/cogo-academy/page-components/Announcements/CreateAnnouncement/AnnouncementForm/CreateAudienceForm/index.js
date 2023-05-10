import { Button } from '@cogoport/components';
import { SelectController, InputController } from '@cogoport/forms';
import getCountryOptions from '@cogoport/globalization/utils/getCountryOptions';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

import styles from './styles.module.css';
import useCreateAudience from './useCreateAudience';
import getAudienceControls from './utils/getAudienceControls';

function CreateAudienceForm(props) {
	const {
		setShowCreateAudience,
		fetchAudiences = () => {},
	} = props;

	const [{ data }] = useRequest({
		method : 'get',
		url    : '/list_cogo_entities',
		params : {
			filters: {
				status: 'active',
			},
			page_limit : 100,
			page       : 1,
		},
	}, { manual: false });

	const entity_data = data?.list || [];

	const {
		createAudience,
		control,
		handleSubmit,
		errors,
		setValue,
		watch,
		loading: createAudienceLoading,
	} = useCreateAudience({
		fetchAudiences,
		setShowCreateAudience,
	});

	const countryOptions = getCountryOptions();

	const entity_options = entity_data.map((entityData) => ({
		label : entityData.business_name,
		value : entityData.id,
	}));

	const watchFunctions = watch('auth_function');
	const watchPlatform = watch('platform');

	const { controls } = getAudienceControls({ entity_options, watchFunctions, countryOptions });

	useEffect(() => {
		setValue('auth_sub_function', null);
	}, [watchFunctions, setValue]);

	const onClickBackIcon = () => {
		setShowCreateAudience(false);
	};

	const hiddenElements = {
		work_scope        : watchPlatform === 'admin',
		persona           : ['app', 'all', 'admin'].includes(watchPlatform),
		auth_function     : ['app', 'partner'].includes(watchPlatform),
		auth_sub_function : ['app', 'partner'].includes(watchPlatform) || watchFunctions === 'all',
	};

	const showElements = controls.reduce((pv, cv) => {
		const { name = '' } = cv;

		return { ...pv, [name]: !hiddenElements[name] };
	}, {});
	const CONTROLS_MAPPING = {
		text   : InputController,
		select : SelectController,
	};

	return (
		<div className={styles.container}>
			{(Object.keys(controls) || []).map((controlItem) => {
				const { name = '', label = '', type = '' } = controls[controlItem] || {};
				const DynamicController = CONTROLS_MAPPING[type];
				if (!showElements[name]) return null;

				return (
					<div key={name}>
						<div className={styles.label}>
							{label}
						</div>
						<div className={styles.controller_wrapper}>
							<DynamicController
								{...controls[controlItem]}
								control={control}
								name={name}
							/>
						</div>

						{errors[name]
							&& (
								<div className={styles.error_message}>
									{' '}
									{errors[name]?.message}
								</div>
							)}

					</div>
				);
			})}

			<div className={styles.button_container}>

				<Button
					type="button"
					themeType="tertiary"
					className={styles.cancel_button}
					onClick={onClickBackIcon}
					size="md"
					disabled={createAudienceLoading}
				>
					CANCEL
				</Button>

				<Button
					type="submit"
					size="md"
					onClick={handleSubmit(createAudience)}
					loading={createAudienceLoading}
				>
					SAVE
				</Button>
			</div>

		</div>

	);
}

export default CreateAudienceForm;
