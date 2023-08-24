import { cl } from '@cogoport/components';

import FieldArray from './FieldArray';
import FormElement from './FormElement';
import getWidthPercent from './getWidthPercent';
import styles from './styles.module.css';

function Layout({ controls = [], control = {}, errors = {} }) {
	return (
		<div className={styles.container}>
			{controls.map((ctrl) => {
				const { type = '', label = '', span = 6, removeLabelMargin = false, ...restCtrl } = ctrl || {};

				if (type === 'fieldArray') {
					return (
						<FieldArray
							ctrl={ctrl}
							key={ctrl.name}
							control={control}
							error={errors?.[ctrl.name]}
						/>
					);
				}

				const width = getWidthPercent(span);

				return (
					<div
						key={restCtrl.name}
						className={styles.element_container}
						style={{ width: `${width}%` }}
					>
						{label ? (
							<div
								className={cl`${styles.label} ${removeLabelMargin ? styles.removeLabelMargin : ''}`}
							>
								{label}
							</div>
						) : null}

						{type ? <FormElement control={control} {...restCtrl} type={type} /> : null}
					</div>
				);
			})}
		</div>
	);
}

export default Layout;
