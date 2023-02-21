import { ListGroup } from '@cogoport/components';
import { React, useState } from 'react';

import QuestionsList from '../QuestionsList';

import styles from './styles.module.css';

function TopicList(Tab) {
	const DEFAULT_LIST = [
		{

			label: 'Sales 101: An introduction to sal...',

		},	{
			label: 'Sales 101: An introduction to sal...',

		}, {
			label: 'Sales 101: An introduction to sal...',
		}, {
			label: 'Incoterms',

		}, {
			label: 'The art of persuading',
		},
		{
			label: 'How to negotiate the non-nego...',

		},
		{

			label: 'Sales 101: An introduction to sal...',

		},	{
			label: 'Sales 101: An introduction to sal...',

		}, {
			label: 'Sales 101: An introduction to sal...',
		}, {
			label: 'Incoterms',

		}, {
			label: 'The art of persuading',
		},
		{
			label: 'How to negotiate the non-nego...',

		},
	];

	return (

		<div className={styles.gridcontainer}>

			<div><ListGroup options={DEFAULT_LIST} /></div>

			<div><QuestionsList Tabtitle={Tab.Tabtitle} /></div>

		</div>
	);
}

export default TopicList;
