import { Button } from '@cogoport/components';
import { useState } from 'react';

import GetCard from './getCard';
import GetLabelInputPair from './getLabelInputPair';
import Header from './header';
import styles from './styles.module.css';

function CreateBadgeV2() {
	const [value, setValue] = useState([]);

	const params = {
		name: {
			size                     : 'md',
			placeholder_singleSelect : 'Enter Name',
		},
		events: {
			value,
			onChange    : (val) => setValue(val),
			placeholder : 'Select Events',
			options     : [
				{
					label : 'B',
					value : 'n',
				},
				{
					label : 'uy',
					value : 'dfs',
				},
			],
			isClearable : true,
			style       : { width: '250px' },
		},
		description: {
			size                     : 'md',
			placeholder_singleSelect : 'Enter Description',
		},

	};
	const labelInputPairs = [
		{
			labelName          : 'Badge Name',
			multiInput         : false,
			singleSelectParams : params.name,
			multiSelectParams  : {},
			style              : { flexBasis: '20%' },
		},
		{
			labelName          : 'Condition (events)',
			multiInput         : true,
			singleSelectParams : {},
			multiSelectParams  : params.events,
			style              : { flexBasis: '20%' },
		},
		{
			labelName          : 'Description',
			multiInput         : false,
			singleSelectParams : params.description,
			multiSelectParams  : {},
			style              : { flexBasis: '50%' },
		},
	];

	const medalType = [
		{
			medalType        : 'Bronze',
			inputPlaceHolder : '2000',
		},
		{
			medalType        : 'Silver',
			inputPlaceHolder : '5000',
		},
		{
			medalType        : 'Gold',
			inputPlaceHolder : '9000',
		},
	];
	return (
		<section className={styles.container}>
			<Header />
			<div className={styles.content_container}>
				{
					labelInputPairs && labelInputPairs.map((data) => (
						<GetLabelInputPair
							labelName={data.labelName}
							multiInput={data.multiInput}
							singleSelectParams={data.singleSelectParams}
							multiSelectParams={data.multiSelectParams}
							style={data.style}
						/>
					))
				}
			</div>
			<div className={styles.lower_background}>
				<h3 style={{ color: '#4f4f4f' }}>Score and Image</h3>
				<div className={styles.display_flex}>
					{
						medalType.map((data, index) => (
							<GetCard
								medalType={data.medalType}
								inputPlaceHolder={data.inputPlaceHolder}
								isLastItem={index === medalType.length - 1}
							/>
						))
					}
				</div>
			</div>
			<div className={styles.btncls}>
				<Button size="md" themeType="secondary" style={{ marginRight: 10, borderWidth: 0 }}>Cancel</Button>
				<Button size="md" themeType="primary">Save</Button>
			</div>
		</section>
	);
}

export default CreateBadgeV2;
