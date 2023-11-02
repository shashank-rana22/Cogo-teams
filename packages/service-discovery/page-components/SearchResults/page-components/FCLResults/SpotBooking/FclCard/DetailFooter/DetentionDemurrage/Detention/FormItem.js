import { InputController } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import getErrorMessage from '../../../../../../../../../configs/getErrorMessage';
import validate from '../../../../../../../utils/validateNumber';

import styles from './styles.module.css';

const MAX_DAYS = 21;
const DEFAULT_DAYS_VALUE = 0;

function FormSingleItem({
	name = '',
	keyName = '',
	errors = {},
	control = () => {},
}) {
	const rules = {
		validate : (val) => validate(val),
		max      : MAX_DAYS,
		min      : DEFAULT_DAYS_VALUE,
		required : true,
	};

	const label = startCase(`${keyName}_${name}`);

	const errorMessage = getErrorMessage({
		error: errors?.[`${keyName}_${name}`],
		rules,
		label,
	});

	return (
		<div className={styles.form_item}>
			<div className={styles.label}>
				At
				{' '}
				{startCase(keyName)}
			</div>

			<InputController
				name={`${keyName}_${name}`}
				suffix={<span style={{ paddingRight: 12, fontSize: 12 }}>Days</span>}
				control={control}
				rules={rules}
			/>

			{errors[`${keyName}_${name}`] && (
				<div className={styles.error_message}>
					{errorMessage}
				</div>
			)}
		</div>
	);
}

function FormItem({
	name = '',
	control = () => {},
	errors = {},
}) {
	const commonProps = { name, errors, control };

	return (
		<div className={styles.form_subgroup}>
			<div className={styles.sub_heading}>{` Total ${startCase(name)} Days `}</div>

			<div className={styles.form_item_wrapper}>
				<FormSingleItem keyName="origin" {...commonProps} />
				<FormSingleItem keyName="destination" {...commonProps} />
			</div>
		</div>
	);
}

export default FormItem;
