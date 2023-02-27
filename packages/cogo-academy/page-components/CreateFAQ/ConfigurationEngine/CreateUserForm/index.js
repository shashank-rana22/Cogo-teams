import { Button } from '@cogoport/components';
import { SelectController, InputController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useEffect, useMemo } from 'react';

import useGetAudience from '../hooks/useGetFaqAudience';
import useListCogoEntity from '../hooks/useListCogoEntities';

import styles from './styles.module.css';
import useCreateAudience from './useCreateAudience';
import createAudienceControls from './utils/createAudienceControls';

function CreateUserForm({
	source = '',
	setShowCreateAudienceModal,
	setConfigurationPage,
	displayBackButton,
	customStyle,
	fetchAudiences = () => {},
}) {
	const router = useRouter();
	const { general } = useSelector((state) => state);
	const { id:audienceId, update } = general.query || {};

	const {
		createAudience,
		control,
		handleSubmit,
		// errors,
		setValue,
		reset,
		watch,
	} = useCreateAudience({
		setConfigurationPage,
		fetchAudiences,
		source,
		setShowCreateAudienceModal,
	});

	const { fetchAudience = () => {}, data, loading } = useGetAudience();

	const {
		listCogoEntities,
		entity_data,
	} = useListCogoEntity();

	useEffect(() => {
		listCogoEntities();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (update && audienceId) {
			fetchAudience();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [audienceId]);

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

	useEffect(() => {
		(Object.keys(controls) || []).forEach((controll) => {
			const { name:controlName } = controls[controll] || {};
			setValue(controlName, data?.[controlName]);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	const onClickBackIcon = () => {
		if (source === 'create') {
			setShowCreateAudienceModal(false);
		} else {
			reset();
			setConfigurationPage('dashboard');
			router.back();
		}
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
			{
				displayBackButton ? (
					null
				) : (
					<div className={styles.back_div} role="presentation" onClick={onClickBackIcon}>
						<IcMArrowBack width={20} height={20} />
						<div className={styles.back}>Back to Dashboard</div>
					</div>
				)
			}

			{source !== 'create' ? (
				<div className={styles.header}>
					{audienceId ? 'Update' : 'Add'}
					{' '}
					User Group
				</div>
			) : null}

			{(Object.keys(controls) || []).map((controlItem) => {
				const { name = '', label = '' } = controls[controlItem] || {};

				const DynamicController = name === 'name' ? InputController : SelectController;

				if (showElements[name]) {
					return (
						<div>
							<div className={styles.label}>
								{label}
							</div>
							<div className={styles.controller_wrapper} style={customStyle?.controllerStyle || {}}>
								<DynamicController
									{...controls[controlItem]}
									control={control}
									name={name}
								/>
							</div>

						</div>
					);
				}
				return null;
			})}

			<div className={styles.button_container} style={customStyle?.buttonContainerStyle || {}}>
				<Button
					themeType="tertiary"
					className={styles.cancel_button}
					onClick={onClickBackIcon}
					size="md"
				>
					CANCEL
				</Button>

				<Button
					size="md"
					onClick={handleSubmit(createAudience)}
				>
					SAVE
				</Button>
			</div>

		</div>

	);
}

export default CreateUserForm;
