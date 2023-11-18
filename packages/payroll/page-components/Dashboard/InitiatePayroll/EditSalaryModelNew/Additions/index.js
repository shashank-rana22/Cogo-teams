import { IcMArrowDown } from '@cogoport/icons-react';
import { upperCase } from '@cogoport/utils';
import React from 'react';

import FieldArrayAdditions from '../FieldArray';

import styles from './styles.module.css';

function Additions({
	showAccordion, control, setShowAccordion, errors, title = '', subTitle = '', data = {},
	watch = () => {}, setValue,
}) {
	return (
		<div className={styles.container}>
			<div
				className={styles.heading}
				aria-hidden
				onClick={() => { setShowAccordion(showAccordion === title ? '' : title); }}
			>
				<div className={styles.left_head_section}>
					<span className={styles.head1}>
						{upperCase(title)}
						{' '}
					</span>
					<span className={styles.head2}>{subTitle}</span>
				</div>
				<div className={styles.right_section}>
					<IcMArrowDown
						width={16}
						height={16}
						className={showAccordion === title ? styles.caret_active : styles.caret_arrow}
					/>
				</div>

			</div>

			<div className={showAccordion === title ? styles.item_container : styles.item_container_closed}>
				<FieldArrayAdditions
					control={control}
					name={title}
					errors={errors}
					watch={watch}
					setValue={setValue}
					data={data[title]}
				/>
			</div>
		</div>
	);
}

export default Additions;
