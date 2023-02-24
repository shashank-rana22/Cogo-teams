import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import EDIT_CONFIG_CONTROLS_MAPPING from '../../../../../../../constants/edit-config-controls-mapping';

import styles from './styles.module.css';

function CardItem(item) {
	const { name, controls } = item;

	console.log('controls', controls);

	return (
		<div className={styles.card_item}>
			<div className={styles.name_container}>
				<div className={styles.parameter_name}>{startCase(name)}</div>
				<div className={styles.icon_container}>
					<Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit" placement="top">
						<div><IcMInfo width={14} height={14} /></div>
					</Tooltip>

				</div>
			</div>

			<div className={styles.controls_container}>
				{controls.map((control) => {
					const { name: controlName, current_value } = control;

					return (
						<div className={styles.field_container}>
							<span className={styles.label}>
								{/* {EDIT_CONFIG_CONTROLS_MAPPING[controlName].label}
								{' '} */}
							</span>
						</div>
					);
				})}
			</div>

		</div>
	);
}

export default CardItem;
