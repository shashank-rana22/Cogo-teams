// eslint-disable-next-line import/no-unresolved
import { Button } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import useGetFaq from '../hooks/useGetFaq';

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

	const { general } = useSelector((state) => state);

	const { update = '', id } = general.query;

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

	const { fetchFaq, data, loading } = useGetFaq();

	useEffect(() => {
		if (update && id) {
			fetchFaq();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [general.query?.id]);

	useEffect(() => {
		setValue('name', data?.display_name);
		setValue('description', data?.description);
	}, [data?.description, data?.display_name, loading, setValue]);

	return (
		<div className={styles.container} style={style}>

			{!displayBackButton
				? (
					<div className={styles.back_div} role="presentation" onClick={onClickBackIcon}>
						<IcMArrowBack width={20} height={20} />
						<div className={styles.back}>Back to Dashboard</div>
					</div>
				) : null}

			{source !== 'create' ? (
				<div>
					<div className={styles.add_topic}>
						{id ? 'Update' : 'Add'}
						{' '}
						{startCase(queryValue)}
					</div>
				</div>
			) : null}

			<div
				className={styles.add_name}
				style={{ marginTop: source === 'create' ? 0 : undefined }}
			>
				{startCase(queryValue)}
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

				{errors?.name && (
					<div className={styles.errors}>
						{errors.name?.message}
					</div>
				)}

			</div>

			<div className={styles.user_tag}>
				{startCase(queryValue)}
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

				/>
			</div>

			{!displayBackButton
			&& (
				<div className={styles.btn_row}>
					<div>
						<Button
							size="md"
							themeType="secondary"
							onClick={onClickBackIcon}
						>
							Cancel
						</Button>
					</div>

					<div className={styles.save_btn}>
						<Button
							size="md"
							themeType="primary"
							onClick={handleSubmit(createFaqComponent)}
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
