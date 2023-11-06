import { Button, ButtonIcon } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';
import { useEffect } from 'react';

import FormItem from './FormItem';
import styles from './styles.module.css';

const DEFAULT_DAYS_VALUE = 0;

const SERVICES_MAPPING = {
	origin_detention      : 'EDT',
	destination_detention : 'DET',
	origin_demurrage      : 'EDE',
	destination_demurrage : 'DEA',
};

function Detention({
	heading = '',
	setShow = () => {},
	detentionValues = {},
	setDetentionValues = () => {},
}) {
	const { control, handleSubmit, setValue, formState:{ errors } } = useForm();

	useEffect(() => {
		Object.keys(SERVICES_MAPPING).forEach((key) => setValue(key, detentionValues?.[key] || DEFAULT_DAYS_VALUE));
	}, [detentionValues, setValue]);

	const onClickSave = (values) => {
		setDetentionValues(values);
		setShow(false);
	};

	return (
		<div className={styles.container}>
			<ButtonIcon
				className={styles.close_button}
				size="md"
				icon={<IcMCross />}
				themeType="primary"
				onClick={() => setShow(false)}
			/>

			{heading ? (
				<strong className={styles.heading}>{heading}</strong>
			) : null}

			<div className={styles.form}>
				{['detention'].map((name) => ( // demurrage also possible
					<FormItem
						key={name}
						name={name}
						control={control}
						errors={errors}
					/>
				))}
			</div>

			<div className={styles.button_container}>
				<Button
					type="button"
					size="md"
					themeType="accent"
					onClick={handleSubmit(onClickSave)}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default Detention;
