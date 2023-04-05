import { handleError } from '@cogoport/forms';
import React from 'react';

import getElementController from '../getController';

import styles from './styles.module.css';

function Item(props) {
	const {
		type,
		control,
		span,
		error,
		rules,
	} = props || {};

	const errorOriginal = handleError({
		error,
		rules,
	});
	const Element = getElementController(type);

	const flex = ((span || 12) / 12) * 100 - 1;

	return (
		<div className={styles.element} style={{ width: `${flex}%`, padding: '4px' }}>
			<Element
				{...props}
				control={control}
				size="sm"
			/>
			<p style={{
				fontStyle     : 'normal',
				fontSize      : '12px',
				lineHeight    : '16px',
				letterSpacing : '0.02em',
				paddingLeft   : '4px',
				margin        : '0px',
				color         : '#cb6464',
			}}
			>
				{errorOriginal}

			</p>
		</div>
	);
}

export default Item;
