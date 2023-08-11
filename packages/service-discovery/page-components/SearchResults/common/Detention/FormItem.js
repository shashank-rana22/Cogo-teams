import { InputController } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import getErrorMessage from '../../../../configs/getErrorMessage';
import validate from '../../utils/validateNumber';

import styles from './styles.module.css';

const MAX_DAYS_FOR_COGO_ASSURED = 14;
const MAX_DAYS = 21;
const DEFAULT_DAYS_VALUE = 0;

function FormItem({
	name = '',
	control = () => {},
	howMuchToShowInDnD = {
		origin_detention      : true,
		origin_demurrage      : true,
		destination_detention : true,
		destination_demurrage : true,
	},
	minDays = {},
	errors = {},
	source = '',
}) {
	const isCogoAssured = source === 'cogo_assured_rate';

	const renderFormItem = (key) => {
		const rules = {
			validate : (val) => validate(val),
			max      : isCogoAssured && name === 'detention' ? MAX_DAYS_FOR_COGO_ASSURED : MAX_DAYS,
			min      : minDays[`${key}_${name}`] || DEFAULT_DAYS_VALUE,
		};

		const label = startCase(`${key}_${name}`);

		const errorMessage = getErrorMessage({
			error: errors?.[`${key}_${name}`],
			rules,
			label,
		});

		return (
			<div className={styles.form_item}>
				<div className={styles.label}>
					At
					{' '}
					{startCase(key)}
				</div>

				<InputController
					name={`${key}_${name}`}
					suffix={<span style={{ paddingRight: 12, fontSize: 12 }}>Days</span>}
					disabled={!howMuchToShowInDnD[`${key}_${name}`]}
					control={control}
					rules={rules}
				/>

				{errors[`${key}_${name}`] && (
					<div className={styles.error_message}>
						{errorMessage}
					</div>
				)}
			</div>
		);
	};

	return (
		<div className={styles.form_subgroup}>
			<div className={styles.sub_heading}>{` Total ${startCase(name)} Days `}</div>

			<div className={styles.form_item_wrapper}>
				{renderFormItem('origin')}
				{renderFormItem('destination')}
			</div>
		</div>
	);
}

export default FormItem;
