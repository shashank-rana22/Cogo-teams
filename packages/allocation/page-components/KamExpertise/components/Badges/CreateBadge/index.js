import { Toast, Button } from '@cogoport/components';
import { useState } from 'react';

import useCreateBadgeConfiguration from '../../../hooks/useCreateBadgeConfiguration';

import GetCard from './getCard';
import GetLabelInputPair from './getLabelInputPair';
import Header from './header';
import styles from './styles.module.css';

function CreateBadge({ setWindow }) {
	const [badgeInput, setBadgeInput] = useState(false);
	const [nameValue, setNameValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [eventValue, setEventValue] = useState('');
	const [bronzeScore, setBronzeScore] = useState('');
	const [silverScore, setSilverScore] = useState('');
	const [goldScore, setGoldScore] = useState('');

	const {
		onCheckPublish, loading,
	} = useCreateBadgeConfiguration();

	const params = {
		name: {
			size                     : 'md',
			placeholder_singleSelect : 'Enter Name',
		},
		events: {
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
			eventValue,
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
			setValue           : setNameValue,
		},
		{
			labelName          : 'Condition',
			multiInput         : true,
			singleSelectParams : {},
			multiSelectParams  : params.events,
			style              : { flexBasis: '20%' },
			setValue           : setEventValue,
		},
		{
			labelName          : 'Description',
			multiInput         : false,
			singleSelectParams : params.description,
			multiSelectParams  : {},
			style              : { flexBasis: '50%' },
			setValue           : setDescriptionValue,
		},
	];

	const medalType = [
		{
			medalType        : 'Bronze',
			inputPlaceHolder : '2000',
			setScore         : setBronzeScore,
		},
		{
			medalType        : 'Silver',
			inputPlaceHolder : '5000',
			setScore         : setSilverScore,
		},
		{
			medalType        : 'Gold',
			inputPlaceHolder : '9000',
			setScore         : setGoldScore,
		},
	];

	const onClose = () => {
		setWindow(1);
	};

	const payload_data = {
		version_id    : '1',
		badge_name    : nameValue,
		description   : descriptionValue,
		// kam_expertise_event_configuration_id : '00245b2c-m9k8-479e-8dcf-bhnc9mkkwwvw930t45670',
		status        : 'active',
		badge_details : [
			{
				score     : bronzeScore,
				image_url : 'bjb',
				medal     : 'bronze',
			},
			{
				score     : silverScore,
				image_url : 'bmbb',
				medal     : 'silver',
			},
			{
				score     : goldScore,
				image_url : 'hghjg',
				medal     : 'gold',
			},
		],
	};

	const handelNext = () => {
		onCheckPublish(payload_data);
		setBadgeInput(true);
		// onClose();
		// Toast.success('Badge Successfully Created');
	};
	const handelSave = () => {
		// setCreateBadge((pv) => !pv);
		onClose();
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
							setValue={data.setValue}
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
								setScore={data.setScore}
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
									// disabled={loading}
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
					{/* <Button
						size="md"
						themeType="primary"
						disabled={loading}
						onClick={handelNext}
					>
						Save
					</Button> */}
				</div>
			</section>
		</div>
	);
}

export default CreateBadge;
