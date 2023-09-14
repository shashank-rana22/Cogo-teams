import { cl } from '@cogoport/components';

import getElementController from '../../../../../../../../../../forms/getElementController';
import getErrorMessage from '../getErrorMessage';

import styles from './styles.module.css';

const TOTAL_SPAN = 12;

const FLEX_HUNDRED = 100;

const removeTypeField = (controlItem) => {
	const { type, ...rest } = controlItem;
	return rest;
};

function Item(props) {
	const {
		type = '',
		control,
		span,
		label = '',
		error = {},
		rules = {},
		className = '',
	} = props || {};

	const errorOriginal = getErrorMessage({
		error,
		rules,
		label,
	});

	if (!type) return null;

	const Element = getElementController(type);

	if (!Element) {
		return null;
	}

	const flex = ((span || TOTAL_SPAN) / TOTAL_SPAN) * FLEX_HUNDRED;

	return (
		<div className={cl`${styles.element} ${className}`} style={{ width: `${flex}%` }}>
			{label ? (<h4 className={styles.label}>{label}</h4>) : null}

			<Element
				size={type === 'pills' ? 'md' : 'sm'}
				{...removeTypeField(props)}
				control={control}
				label={label}
			/>

			{errorOriginal ? <p className={styles.errors}>{errorOriginal}</p> : null}
		</div>
	);
}

export default Item;
