import { Pill } from '@cogoport/components';
import { IcMImage, IcMArrowRotateRight, IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { React, useState, useRef } from 'react';

import styles from './styles.module.css';

function QuestionsCollapse({ collapse, questions }) {
	const arrow = collapse;
	console.log(arrow);
	const DEFAULT_LIST = [
		{
			label: 'Invoices',

		},	{
			label: 'Basics',

		}];
	return (

		<>
			{/* // className={styles.contentparent}
			// ref={contentRef}
			// style={open ? { height: `${contentRef.current.scrollHeight} px` } : { height: '0px' }} */}
			<div className={styles.title}>
				{startCase(
					questions.question_abstract,
				)}
				{(arrow) ? <IcMArrowUp /> : <IcMArrowDown />}
			</div>
			<Pill prefix={<IcMImage />} size="lg" color="white"><b>2</b></Pill>
			<Pill prefix={<IcMArrowRotateRight />} size="lg" color="white"><b>{questions.view_count}</b></Pill>
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
		</>

	);
} export default QuestionsCollapse;
