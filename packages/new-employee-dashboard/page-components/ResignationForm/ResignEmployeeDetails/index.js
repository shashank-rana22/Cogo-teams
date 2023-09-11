import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import getElementController from '../configs/getElementController';
import controls from '../constants/controls';

import styles from './styles.module.css';

function ResignEmployeeDetails({ control, errors }) {
	const [show, setShow] = useState(true);

	return (
		<div className={styles.container}>
			<div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
				<span>Fill Separation Form</span>
				<IcMArrowDown
					width={16}
					height={16}
					className={show ? styles.caret_active : styles.caret_arrow}
				/>
			</div>

			<div className={show ? styles.item_container : styles.item_container_closed}>
				{controls.map((controlItem) => {
					const { type } = controlItem;

					const Element = getElementController(type);

					return (
						<div
							className={(controlItem?.name !== 'Enter_Reason_of_Leaving')
								? styles.detail : styles.reason_leaving}
							key={controlItem.name}
						>
							<div className={styles.label}>
								{startCase(controlItem.label) || '-'}
							</div>
							<div className={styles.employee_detail}>
								<Element
									className={styles.controller_ele}
									key={controlItem.name}
									control={control}
									placeholder="Select Status..."
									{...controlItem}
								/>
								{errors[controlItem.name] && (
									<div className={styles.error_msg}>
										*This is Required
									</div>
								)}
							</div>
						</div>
					);
				})}

			</div>
		</div>
	);
}

export default ResignEmployeeDetails;
