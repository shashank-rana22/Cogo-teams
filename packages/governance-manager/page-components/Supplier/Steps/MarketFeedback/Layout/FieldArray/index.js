/* eslint-disable import/no-cycle */
import { useFieldArray } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTranslation } from 'next-i18next';

import EachField from './EachField';
import styles from './styles.module.css';

function FieldArrayController({ control, name, controls, error = [] }) {
	const ONE = GLOBAL_CONSTANTS.one;
	const { fields, append } = useFieldArray({ control, name });
	const { t } = useTranslation(['governanceManager']);
	return (
		<>
			<div className={styles.main_container}>
				{fields.map((field, index) => (
					<EachField
						key={field.id}
						controls={controls}
						control={control}
						index={index}
						error={error?.[index]}
						parentName={name}
					/>
				))}
			</div>
			<div className={styles.flex_right}>
				<button className={styles.add_more} onClick={() => append(ONE)}>
					{t('supplier_page_market_feedback_layout_field_array_add_more')}
				</button>
			</div>
		</>

	);
}

export default FieldArrayController;
