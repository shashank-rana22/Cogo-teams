import { useTranslation } from 'next-i18next';

import CONSTANTS from '../../../constants/constants';
import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import styles from './styles.module.css';

const { TOTAL_SPAN, FLEX_ONE, FLEX_HUNDRED } = CONSTANTS;

function Item({
	type = '',
	control = {},
	span = 1,
	label = '',
	error = {},
	heading = '',
	rules = {},
	...props
}) {
	const { t } = useTranslation(['operators']);
	const errorOriginal = getErrorMessage({
		error,
		rules,
		label,
		t,
	});

	if (!type) {
		return null;
	}

	const Element = getElementController(type);

	const flex = ((span || TOTAL_SPAN) / TOTAL_SPAN) * FLEX_HUNDRED - FLEX_ONE;

	return (
		<div className={styles.element} style={{ width: `${flex}%` }}>
			<div className={styles.item_heading}>
				{heading}
			</div>
			{type === 'checkbox' ? (
				<div className={styles.item_flex}>
					<Element
						{...props}
						rules={rules}
						control={control}
					/>
					<h4 className={styles.item_label}>
						{label}
					</h4>

				</div>
			) : (
				<>
					<h4 className={styles.item_label}>
						{label}
					</h4>
					<Element
						{...props}
						rules={rules}
						control={control}
					/>
				</>
			)}
			<p className={styles.error}>
				{errorOriginal}
			</p>
		</div>
	);
}

export default Item;