import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';
import useCreateForm from './useCreateForm';

function CreateForm(props) {
	const {
		source = '',
		queryValue = '',
		handleSubmit,
		createFaqComponent,
		style = {},
		displayBackButton,
	} = props;

	const {
		onClickBackIcon,
		renderFields,
		id,
	} = useCreateForm(props);

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
