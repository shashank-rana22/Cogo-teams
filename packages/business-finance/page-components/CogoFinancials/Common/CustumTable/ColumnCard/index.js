import { Placeholder, cl } from '@cogoport/components';
import React, { useState } from 'react';

import { LABEL_MAPPING } from '../../../constants';

import Details from './Details';
import getFormData from './getFormData';
import styles from './styles.module.css';

const DEFAULT_SPAN = 1;

const HUNDERED_PERCENT = 100;

const TOTAL_SPAN = 12;

function ColumnCard({
	config = {},
	item = {},
	loading = false,
	taxType = '',
	type = '',
}) {
	const [show, setShow] = useState(false);
	const { fields = [] } = config;

	const formData = getFormData({ item, taxType, show, setShow, type });

	return (
		<div className={styles.marginbottom}>
			<div className={cl`${styles.flex} ${show ? styles.background : ''}`}>
				{fields.map((field) => (
					<div
						key={field.key}
						style={{
							'--span' : field.span || DEFAULT_SPAN,
							width    : `${((field.span || DEFAULT_SPAN) * (HUNDERED_PERCENT / TOTAL_SPAN))}px`,
						}}
						className={styles.col}
					>
						{loading
							? <Placeholder />
							: formData?.[field.key]}
					</div>
				))}
			</div>
			{show && (
				<Details
					item={item}
					taxType={taxType}
					LABEL_MAPPING={LABEL_MAPPING}
					type={type}
				/>
			)}
		</div>
	);
}

export default ColumnCard;
