import React from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import styles from './styles.module.css';

const TOTAL_SPANS = 12;
const TOTAL_PERCENT = 100;
const SUBTRACT_PERCENT = 1;

function Item(props) {
	const {
		type,
		control,
		span,
		label,
		error,
		heading,
		rules,
	} = props || {};

	const errorOriginal = getErrorMessage({
		error,
		rules,
		label,
	});
	const Element = getElementController(type);

	const flex = ((span || TOTAL_SPANS) / TOTAL_SPANS) * TOTAL_PERCENT - SUBTRACT_PERCENT;

	return (
		Element
			? (
				<div className={styles.element} style={{ width: `${flex}%`, padding: '4px' }}>
					<div style={{
						marginBottom: '6px', fontWeight: '600', fontSize: '13px',
					}}
					>
						{heading}
					</div>
					<h4 style={{
						height: '16px', marginBottom: '6px', fontWeight: '400', fontSize: '12px',
					}}
					>
						{label}
					</h4>
					<Element
						{...props}
						control={control}
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
			) : null
	);
}

export default Item;
