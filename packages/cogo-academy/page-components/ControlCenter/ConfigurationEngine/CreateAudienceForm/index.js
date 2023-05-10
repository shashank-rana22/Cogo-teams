import { Button } from '@cogoport/components';
import { SelectController, InputController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';

import useListCogoEntity from '../hooks/useListCogoEntities';

import styles from './styles.module.css';
import useCreateAudience from './useCreateAudience';
import useGetAudienceOptions from './useGetAudienceOptions';

function CreateAudienceForm(props) {
	const {
		source = '',
		setShowCreateAudienceModal,
		setConfigurationPage,
		displayBackButton,
		customStyle,
		fetchAudiences = () => {},
	} = props;

	const {
		createAudience,
		loading:createAudienceLoading,
	} = useCreateAudience({
		setConfigurationPage,
		fetchAudiences,
		source,
		setShowCreateAudienceModal,
	});

	const {
		entity_data,
	} = useListCogoEntity();

	const {
		showElements,
		onClickBackIcon,
		control,
		handleSubmit,
		errors,
		controls,
	} = useGetAudienceOptions({
		entity_data,
		setConfigurationPage,
		setShowCreateAudienceModal,
		source,
	});

	const renderFields = () => (Object.keys(controls) || []).map((controlItem) => {
		const { name = '', label = '' } = controls[controlItem] || {};

		const DynamicController = name === 'name' ? InputController : SelectController;

		if (showElements[name]) {
			return (
				<div key={name}>
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

					{errors[name]
						&& (
							<div className={styles.error_message}>
								{errors[name]?.message}
							</div>
						)}
				</div>
			);
		}
		return null;
	});

	return (
		<div className={styles.container}>
			{
				!displayBackButton && (
					<div className={styles.back_div} role="presentation" onClick={onClickBackIcon}>
						<IcMArrowBack width={20} height={20} />
						<div className={styles.back}>Back to Dashboard</div>
					</div>
				)
			}

			{source !== 'create' ? (
				<div className={styles.header}>Add Audience</div>
			) : null}

			{renderFields()}

			<div className={styles.button_container} style={customStyle?.buttonContainerStyle || {}}>
				<Button
					themeType="tertiary"
					className={styles.cancel_button}
					onClick={onClickBackIcon}
					size="md"
					disabled={createAudienceLoading}
				>
					CANCEL
				</Button>

				<Button
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
