// eslint-disable-next-line import/no-unresolved
import { Button } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function CreateForm({
	viewType = 'topic',
	setConfigurationPage,
	onClickSaveButton,
	handleSubmit,
	control,
	errors,
}) {
	const router = useRouter();
	console.log('errors', errors);

	const onClickBackIcon = () => {
		setConfigurationPage('dashboard');
		router.back();
	};

	return (
		<div className={styles.container}>
			<div className={styles.back_div} role="presentation" onClick={onClickBackIcon}>
				<IcMArrowBack width={20} height={20} />
				<div className={styles.back}>Back to Dashboard</div>
			</div>

			<div>
				<div className={styles.add_topic}>
					Add
					{' '}
					{startCase(viewType)}
				</div>
			</div>

			<div className={styles.add_name}>
				{startCase(viewType)}
				{' '}
				Name
			</div>

			<div className={styles.name_input}>
				{' '}
				<InputController
					control={control}
					name="name"
					type="text"
					placeholder="Enter Name..."
					rules={{ required: 'Name is required.' }}
				/>
			</div>

			<div className={styles.user_tag}>
				{startCase(viewType)}
				{' '}
				Description
				{' '}
				<span className={styles.optional}>( optional )</span>
			</div>

			<div className={styles.select_tags}>
				<InputController
					control={control}
					name="description"
					type="text"
					placeholder="Enter Description..."
					rules={{ required: 'Email is required.' }}
				/>
			</div>

			<div className={styles.btn_row}>
				<div><Button size="md" themeType="secondary" onClick={onClickBackIcon}>Cancel</Button></div>

				<div className={styles.save_btn}>
					<Button size="md" themeType="primary" onClick={handleSubmit(onClickSaveButton)}>
						Save
					</Button>
				</div>
			</div>
		</div>
	);
}

export default CreateForm;
