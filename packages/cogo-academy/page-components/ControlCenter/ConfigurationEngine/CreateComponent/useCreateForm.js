import { InputController } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useGetFaq from '../hooks/useGetFaq';

import getControls from './controls';
import styles from './styles.module.css';

const useCreateForm = (props) => {
	const {
		source = '',
		queryValue = '',
		setConfigurationPage,
		control,
		setValue = () => {},
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
	return {
		onClickBackIcon,
		renderFields,
		id,
	};
};

export default useCreateForm;
