import { Loader } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import getElementController from '../../../utils/configs/getElementController';
import getControls from '../constants/controls';

import styles from './styles.module.css';

function ResignEmployeeDetails({ control = {}, errors = {}, dataItems = {}, loading = false }) {
	const [show, setShow] = useState(true);
	const { application_exist } = dataItems || {};
	const controls = getControls(dataItems);

	if (loading) {
		return <Loader themeType="secondary" />;
	}

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
							className={(controlItem?.name !== 'reason_of_leaving')
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
									name={controlItem.name}
									control={control}
									placeholder="Select Status..."
									{...controlItem}
									disabled={application_exist || !(controlItem?.name === 'reason_of_leaving')}
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
