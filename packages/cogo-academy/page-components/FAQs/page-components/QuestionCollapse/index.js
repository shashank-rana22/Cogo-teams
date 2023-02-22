import { Pill } from '@cogoport/components';
import { IcMImage, IcMArrowRotateRight, IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { React, useState, useRef } from 'react';

import styles from './styles.module.css';

function QuestionsCollapse(collapse) {
	const arrow = collapse;
	const DEFAULT_LIST = [
		{
			label: 'Invoices',

		},	{
			label: 'Basics',

		}];
	return (

		<div>
			{/* // className={styles.contentparent}
			// ref={contentRef}
			// style={open ? { height: `${contentRef.current.scrollHeight} px` } : { height: '0px' }} */}

			<div className={styles.title}>
				What is the process of shipment booking?

				{(arrow.collapse) ? <IcMArrowUp /> : <IcMArrowDown />}
			</div>
			<Pill prefix={<IcMImage />} size="lg" color="white"><b>2</b></Pill>
			<Pill prefix={<IcMArrowRotateRight />} size="lg" color="white"><b>1</b></Pill>
			{DEFAULT_LIST.map((item) => (
				<Pill
					key={item.label}
					prefix={item.prefixIcon}
					size="lg"
					color="white"
				>
					{item.label}
				</Pill>
			))}
		</div>
	);
} export default QuestionsCollapse;
