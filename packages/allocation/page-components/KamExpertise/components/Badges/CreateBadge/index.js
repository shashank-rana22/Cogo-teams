import { Toast, Button } from '@cogoport/components';
import { useState } from 'react';

import useCreateBadgeConfiguration from '../../../hooks/useCreateBadgeConfiguration';

import GetCard from './getCard';
import GetLabelInputPair from './getLabelInputPair';
import Header from './header';
import styles from './styles.module.css';

function CreateBadge({ setWindow }) {
	const [value, setValue] = useState([]);
	const [badgeInput, setBadgeInput] = useState(false);

	const {
		onCheckPublish, loading,
	} = useCreateBadgeConfiguration();

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
	const onClose = () => {
		setWindow(1);
	};

	const payload_data = {
		performed_by_id                      : '123',
		performed_by_type                    : 'user',
		version_id                           : '1',
		badge_name                           : 'Expert',
		description                          : 'hgsdah',
		kam_expertise_event_configuration_id : '00245b2c-m9k8-479e-8dcf-bhnc9kk094820',
		status                               : 'active',
		badge_details                        : [
			{
				score     : '100',
				image_url : 'bjb',
				medal     : 'gold',
			},
			{
				score     : '75',
				image_url : 'bmbb',
				medal     : 'silver',
			},
			{
				score     : '50',
				image_url : 'hghjg',
				medal     : 'bronze',
			},
		],
	};

	const handelNext = () => {
		// onCheckPublish({ payload_data });
		onCheckPublish();
		setBadgeInput(true);
	};
	const handelSave = () => {
		setCreateBadge((pv) => !pv);
		Toast.success('Badge Successfully Created');
	};
	return (
		<div>
			<section className={styles.container}>
				<Header />
				<div className={styles.content_container}>
					{
					labelInputPairs.map((data) => (
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
						{medalType.map((data, index) => (
							<GetCard
								medalType={data.medalType}
								inputPlaceHolder={data.inputPlaceHolder}
								isLastItem={index === medalType.length - 1}
							/>
						))}
					</div>
				</div>

				<div className={styles.btncls}>
					<Button
						size="md"
						themeType="secondary"
						style={{ marginRight: 10, borderWidth: 0 }}
						onClick={onClose}
					>
						Cancel
					</Button>

					{
						!badgeInput
							? (
								<Button
									size="md"
									themeType="primary"
									disabled={loading}
									onClick={handelNext}
								>
									Next
								</Button>
							)
							:					(
								<Button
									size="md"
									themeType="primary"
									onClick={handelSave}
								>
									Save
								</Button>
							)
					}
				</div>
			</section>
		</div>
	);
}

export default CreateBadge;
