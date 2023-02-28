import { useFormContext } from '@cogoport/forms';
import React from 'react';

import { ControlItem } from '../../../common/interfaces';
import { getElementController } from '../../../utils/typeMappings';

import styles from './styles.module.css';

interface Props {
	controls: ControlItem[];
}

function Form({ controls = [] }: Props) {
	const { formState: { errors } } = useFormContext() || {};
	return (
		<section className={styles.flex}>
			{controls.map((controlItem: ControlItem) => {
				const { span, show = true } = controlItem || {};
				const el = { ...controlItem };
				const Element = getElementController(el.type);
				if (!Element) return null;
				return (
					<div className={styles.col} style={{ width: `${(span || 12) * (100 / 12)}%` }}>
						{show
							&& (
								<>
									<Element
										{...el}
										key={el.name}
										id={`${el.name}_input`}
									/>
									<div className={styles.error_message}>
										{errors?.[el.name]?.message}
									</div>
								</>
							)}
					</div>
				);
			})}
		</section>
	);
}

export default Form;
