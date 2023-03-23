import { getFieldController } from '../../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

function FormComponent(props) {
	const { formProps, controls = [], data = {}, isEdit = '', isTop, updateLoading, createLoading } = props;
	const {
		control, formState: { errors },
	} = formProps;

	const transacting_accounts = data?.list?.['Transacting Accounts'] || [];

	const HEADING_MAPPING = {
		expertise_type: (singleField) => (
			<div className={styles.current_value}>
				Current value:
				{' '}
				{data?.list?.[singleField.label]?.[0].threshold_score || ''}
			</div>

		),
		accounts: (singleField) => (
			<div className={styles.current_value}>
				Current value:
				{transacting_accounts
					? transacting_accounts.find((account) => account?.threshold_score_type
                                 === singleField.label)?.threshold_score || '' : ''}
			</div>

		),

	};

	return (

		(controls.map((singleField) => {
			const el = { ...singleField };

			const Element = getFieldController(el.type);

			if (!Element) return null;

			return (
				<div className={`${isTop ? styles.row_level : styles.row_level_end}`}>
					{singleField.label}
					{' '}

					<div className={styles.supporting_text}>Score</div>

					<div>
						<Element
							{...singleField}
							key={singleField.label}
							control={control}
							id={singleField.name}
							disables={createLoading || updateLoading}

						/>

						{errors[singleField.name] && (
							<span className={styles.errors}>
								{errors[singleField.name].message}
							</span>
						)}

						{isEdit ? HEADING_MAPPING[isEdit](singleField) : ''}
					</div>
				</div>
			);
		}))

	);
}

export default FormComponent;
