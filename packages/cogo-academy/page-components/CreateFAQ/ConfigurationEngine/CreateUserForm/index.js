import { Button } from '@cogoport/components';
import { SelectController, InputController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useEffect, useMemo } from 'react';

import useListCogoEntity from '../hooks/useListCogoEntities';

import styles from './styles.module.css';
import useCreateAudience from './useCreateAudience';
import createAudienceControls from './utils/createAudienceControls';

function CreateUserForm({ setConfigurationPage }) {
	const router = useRouter();

	const {
		createAudience,
		control,
		handleSubmit,
		// errors,
		// setValue,
		reset,
		watch,
	} = useCreateAudience({ setConfigurationPage });

	const {
		listCogoEntities,
		entity_data,
	} = useListCogoEntity();

	useEffect(() => {
		listCogoEntities();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const entity_options = [];

	entity_data.map((entityData) => {
		const { business_name = '', id = '' } = entityData || {};
		const options = {
			label : business_name,
			value : id,
		};
		entity_options.push(options);
		return entity_options;
	});

	const watchFunctions = watch('auth_function');
	const watchPlatform = watch('platform');

	const { controls } = createAudienceControls({ entity_options, watchFunctions });

	const onClickBackIcon = () => {
		reset();
		setConfigurationPage('dashboard');
		router.back();
	};

	const showElements = useMemo(() => controls.reduce((pv, cv) => {
		const { name = '' } = cv;

		let showElement = true;
		if (name === 'persona' && watchPlatform === 'admin') {
			showElement = false;
		}

		if (['auth_function', 'auth_sub_function'].includes(name)
        && ['app', 'partner'].includes(watchPlatform)) {
			showElement = false;
		}

		return { ...pv, [name]: showElement };
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, {}), [watchPlatform]);

	return (
		<div className={styles.container}>

			<div className={styles.back_div} role="presentation" onClick={onClickBackIcon}>
				<IcMArrowBack width={20} height={20} />
				<div className={styles.back}>Back to Dashboard</div>
			</div>

			<div className={styles.header}>Add User Group</div>

			{(Object.keys(controls) || []).map((controlItem) => {
				const { name = '', label = '' } = controls[controlItem] || {};

				const DynamicController = name === 'name' ? InputController : SelectController;

				if (showElements[name]) {
					return (
						<div>
							<div className={styles.label}>
								{label}
							</div>

							<DynamicController
								{...controls[controlItem]}
								control={control}
								name={name}
							/>
						</div>
					);
				}
				return null;
			})}

			<div className={styles.button_container}>
				<Button
					themeType="tertiary"
					className={styles.cancel_button}
					onClick={onClickBackIcon}
					size="md"
				>
					cancel
				</Button>

				<Button
					size="md"
					onClick={handleSubmit(createAudience)}
				>
					save
				</Button>
			</div>

		</div>

	);
}

export default CreateUserForm;
