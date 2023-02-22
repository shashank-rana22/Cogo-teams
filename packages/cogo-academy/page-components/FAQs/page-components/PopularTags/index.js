import { Pill } from '@cogoport/components';
import React from 'react';

function PopularTags() {
	const DEFAULT_LIST = [
		{
			label: 'Invoices',

		},	{
			label: 'Basics',

		}, {
			label: 'Invoices',
		}, {
			label: 'Basics',

		}, {
			label: 'Invoices',
		},
		{
			label: 'Invoices',

		},	{
			label: 'Basics',

		}, {
			label: 'Invoices',
		}, {
			label: 'Basics',

		}, {
			label: 'Invoices',
		}, {
			label: 'Invoices',
		}, {
			label: 'Basics',

		}, {
			label: 'Invoices',
		},
	];
	return (

		<div>
			<br />
			<h4>Popular tags in this section:</h4>
			{DEFAULT_LIST.map((item) => (
				<Pill
					// onClick={<AllFAQ />}
					key={item.label}
					prefix={item.prefixIcon}
					size="xl"
					color="white"
				>
					{item.label}
				</Pill>
			))}
		</div>
	);
}

export default PopularTags;
