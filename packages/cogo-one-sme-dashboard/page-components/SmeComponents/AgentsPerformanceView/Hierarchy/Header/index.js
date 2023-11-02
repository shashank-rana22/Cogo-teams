import { cl } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import getStepperItems from './getStepperItems';
import styles from './styles.module.css';

function Header({ setHierarchyData = () => {}, hierarchyData = [] }) {
	const items = getStepperItems({ hierarchyData });

	return (
		<div className={styles.container}>
			{items.map(
				(itm, index) => (
					<div
						key={itm?.key}
						className={styles.stepper_item}
						role="presentation"
						onClick={() => setHierarchyData(
							(prev) => prev?.slice(0, index) || [],
						)}
					>
						<div className={cl`${styles.label_container} 
                            ${index === items.length - 1 ? styles.active_label : ''}`}
						>
							{itm?.label}
						</div>

						{index !== items.length - 1
							? <IcMArrowRight className={styles.arrow_right} />
							: null}
					</div>
				),
			)}
		</div>
	);
}

export default Header;
