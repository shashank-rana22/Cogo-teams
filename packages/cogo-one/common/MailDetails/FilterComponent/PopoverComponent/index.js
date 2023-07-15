import React from 'react';

import filterControls from '../../../../configurations/mail-filters';
import { getFieldController } from '../../../../utils/getFieldController';

import styles from './styles.module.css';

function PopoverComponent({ control = {} }) {
	return (
		<div
			className={styles.container}
		>
			{filterControls.map(
				(itm) => {
					const {
						name,
						label,
						controlType,
					} = itm;

					const Element = getFieldController(controlType);

					if (!Element) {
						return null;
					}

					return (
						<div key={name}>
							<h4 className={styles.title}>
								{label}
							</h4>
							<Element
								control={control}
								{...itm}
							/>
						</div>
					);
				},
			)}
		</div>
	);
}

export default PopoverComponent;
