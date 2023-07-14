import { IcMDelete, IcMPlus } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const HUNDERED_PERCENT = 1000;
const DEFAULT_SPAN = 1;
const TOTAL_SPAN = 12;
const DEFAULT_VAL = 1;
const DEFAULT_LENGTH = 1;
const MAX_LEVEL = 3;

function Column({ config = {}, append = () => { }, remove = () => { }, length = 1, totalLength = 1 }) {
	const { fields = [] } = config;
	const DATA = {
		levels: () => (
			<div>
				level -
				{' '}
				{length + DEFAULT_VAL}
			</div>
		),
		user      : '301',
		criteria  : '04',
		parameter : 'Zubinkhanna,Zubinkhanna,Zubinkhanna,Zubinkhanna',
		edit      : (
			<div className={styles.buttons}>
				<div>
					{totalLength < MAX_LEVEL ? (
						<IcMPlus
							height={20}
							width={20}
							onClick={() => append({})}
							className={styles.plus}
						/>
					) : null}
					{totalLength > DEFAULT_LENGTH ? (
						<IcMDelete
							height={20}
							width={20}
							onClick={() => remove(length)}
							className={styles.delete}
						/>
					) : null}
				</div>
			</div>
		),
	};
	return (
		<div className={styles.flex}>
			{fields.map((field) => (
				<div
					key={field.key}
					style={{
						'--span' : field.span || DEFAULT_SPAN,
						width    : `${((field.span || DEFAULT_SPAN) * (HUNDERED_PERCENT / TOTAL_SPAN))}px`,
					}}
					className={styles.col}
				>
					{DATA[field.key]}
				</div>
			))}
		</div>
	);
}

export default Column;
