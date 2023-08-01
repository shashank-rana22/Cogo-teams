import { InputNumberController } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const suffix = <span style={{ paddingRight: 12, fontSize: 12 }}>Days</span>;

function FormItem({
	name,
	control,
	howMuchToShowInDnD = {
		origin_detention      : true,
		origin_demurrage      : true,
		destination_detention : true,
		destination_demurrage : true,
	},
}) {
	return (
		<div className={styles.form_subgroup}>
			<div className={styles.sub_heading}>{` Total ${startCase(name)} Days `}</div>

			<div className={styles.form_item_wrapper}>
				<div className={styles.form_item}>
					<div className={styles.label}>At Origin</div>

					<InputNumberController
						name={`origin_${name}`}
						suffix={suffix}
						max="21"
						min="0"
						disabled={!howMuchToShowInDnD[`origin_${name}`]}
						arrow={false}
						control={control}
					/>
				</div>

				<div className={styles.form_item}>
					<div className={styles.label}>At Destination</div>

					<InputNumberController
						name={`destination_${name}`}
						suffix={suffix}
						max="21"
						min="0"
						disabled={!howMuchToShowInDnD[`destination_${name}`]}
						arrow={false}
						control={control}
					/>
				</div>
			</div>
		</div>
	);
}

export default FormItem;
