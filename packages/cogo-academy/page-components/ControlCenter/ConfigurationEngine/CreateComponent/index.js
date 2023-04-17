import { Button } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import useGetFaq from '../hooks/useGetFaq';

import getControls from './controls';
import styles from './styles.module.css';

function CreateForm(props) {
	const {
		source = '',
		queryValue = '',
		setConfigurationPage,
		handleSubmit,
		control,
		createFaqComponent,
		setValue = () => {},
		style = {},
		setShow = () => {},
		displayBackButton,
		errors,
		reset,
	} = props;

	const router = useRouter();
	const general = useSelector((state) => state?.general);

	const { fetchFaq, data, loading } = useGetFaq();

	const { display_name, description } = data || {};

	const { update = '', id } = general.query;

	const { controls } = getControls({ queryValue });

	const onClickBackIcon = () => {
		if (displayBackButton) {
			setShow(false);
			setValue('name', '');
			setValue('description', '');
			return;
		}
		reset();
		setConfigurationPage('dashboard');
		router.back();
	};

	useEffect(() => {
		if (update && id) {
			fetchFaq();
		}
	}, [fetchFaq, general.query.id, id, update]);

	useEffect(() => {
		setValue('name', display_name);
		setValue('description', description);
	}, [description, display_name, loading, setValue]);

	const renderFields = () => (Object.keys(controls) || []).map((controlItem) => {
		const { name = '', label = '' } = controls[controlItem] || {};

		return (
			<div>
				<div className={styles.user_tag}>
					{label}
				</div>

				<div className={styles.name_input} style={{ marginTop: source === 'create' ? 0 : undefined }}>
					<InputController
						{...controls[controlItem]}
						control={control}
						name={name}
					/>
				</div>

				{errors[name] && (
					<div className={styles.errors}>
						{' '}
						{errors[name]?.message}
					</div>
				)}

			</div>
		);
	});

	return (
		<div className={styles.container} style={style}>

			{!displayBackButton
				&& (
					<div className={styles.back_div} role="presentation" onClick={onClickBackIcon}>
						<IcMArrowBack width={20} height={20} />
						<div className={styles.back}>Back to Dashboard</div>
					</div>
				) }

			{source !== 'create' && (
				<div className={styles.add_topic}>
					{id ? 'Update' : 'Add'}
					{' '}
					{startCase(queryValue || '')}
				</div>
			) }

			{renderFields()}

			{!displayBackButton
			&& (
				<div className={styles.btn_row}>

					<Button
						size="md"
						themeType="secondary"
						onClick={onClickBackIcon}
						type="button"
					>
						Cancel
					</Button>

					<div className={styles.save_btn}>
						<Button
							size="md"
							themeType="primary"
							onClick={handleSubmit(createFaqComponent)}
							button="submit"
						>
							Save
						</Button>
					</div>
				</div>
			)}

		</div>
	);
}

export default CreateForm;
