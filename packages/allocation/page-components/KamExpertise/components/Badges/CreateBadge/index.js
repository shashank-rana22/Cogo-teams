import { Toast, Button } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import { getFieldController } from '../../../../../common/Form/getFieldController';
import useCreateBadgeConfiguration from '../../../hooks/useCreateBadgeConfiguration';
import useCreateNewBadge from '../../../hooks/useCreateNewBadge';

import GetCard from './getCard';
import GetLabelInputPair from './getLabelInputPair';
import Header from './header';
import styles from './styles.module.css';

function CreateBadge({ setWindow, autofill }) {
	const {
		getAddBadgesControls, formProps,
	} = useCreateNewBadge();

	const {
		control, formState: { errors }, watch,
	} = formProps;

	console.log('getValues', watch());

	const [badgeInput, setBadgeInput] = useState(false);
	const [badgeParams, setBadgeParams] = useState({
		version_id   : '1',
		badge_name   : '',
		description  : '',
		badge_events : '',
		bronzeScore  : 0,
		bronze_url   : '',
		silverScore  : 0,
		silver_url   : '',
		goldScore    : 0,
		gold_url     : '',
	});
	// useEffect(() => {
	// 	if (Object.keys(autofill).length > 0) {
	// 		setBadgeParams((previousParams) => ({
	// 			...previousParams,
	// 			badge_name  : autofill.badge_name,
	// 			description : autofill.badge_details,
	// 			bronzeScore : autofill.badge_details,
	// 			bronze_url  : '',
	// 			silverScore : 0,
	// 			silver_url  : '',
	// 			goldScore   : 0,
	// 			gold_url    : '',
	// 		}));
	// 	}
	// }, [autofill]);

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
					label : 'A',
					value : '100',
				},
				{
					label : 'B',
					value : '500',
				},
			],
			isClearable : true,
			style       : { width: '250px' },
			eventValue  : badgeParams.badge_events,
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
			setValue           : setBadgeParams,
			value              : 'badge_name',
		},
		{
			labelName          : 'Condition',
			multiInput         : true,
			singleSelectParams : {},
			multiSelectParams  : params.events,
			style              : { flexBasis: '20%' },
			setValue           : setBadgeParams,
			value              : 'badge_events',
		},
		{
			labelName          : 'Description',
			multiInput         : false,
			singleSelectParams : params.description,
			multiSelectParams  : {},
			style              : { flexBasis: '50%' },
			setValue           : setBadgeParams,
			value              : 'description',
		},
	];

	const medalType = [
		{
			medalType        : 'Bronze',
			inputPlaceHolder : '2000',
			setValue         : setBadgeParams,
			scoreValue       : 'bronzeScore',
			imageValue       : 'bronze_url',
			imageSelected    : badgeParams.bronze_url,

			// setUrl           : setBronzeUrl,
			// setValue         : setBadgeParams,
		},
		{
			medalType        : 'Silver',
			inputPlaceHolder : '5000',
			setValue         : setBadgeParams,
			scoreValue       : 'silverScore',
			imageValue       : 'silver_url',
			imageSelected    : badgeParams.silver_url,

			// setUrl           : setSilverUrl,
			// setValue         : setBadgeParams,
		},
		{
			medalType        : 'Gold',
			inputPlaceHolder : '9000',
			setValue         : setBadgeParams,
			scoreValue       : 'goldScore',
			imageValue       : 'gold_url',
			imageSelected    : badgeParams.gold_url,

			// setUrl           : setGoldUrl,
			// setValue         : setBadgeParams,
		},
	];

	const onClose = () => {
		setWindow(1);
	};

	const payload_data = {
		version_id    : '1',
		badge_name    : badgeParams.badge_name,
		description   : badgeParams.description,
		// event_configuration_id : '00245b2c-m9k8-479e-8dcf-bhnc9mkkwwvw930t45670',
		status        : 'active',
		badge_details : [
			{
				score     : badgeParams.bronzeScore,
				image_url : badgeParams.bronze_url,
				medal     : 'bronze',
			},
			{
				score     : badgeParams.silverScore,
				image_url : badgeParams.silver_url,
				medal     : 'silver',
			},
			{
				score     : badgeParams.goldScore,
				image_url : badgeParams.gold_url,
				medal     : 'gold',
			},
		],
	};

	const handelNext = () => {
		onCheckPublish(payload_data);
		setBadgeInput(true);
		// onClose();
	};

	const handelSave = () => {
		// setCreateBadge((pv) => !pv);
		onClose();
	};

	if (loading) {
		return null;
	}
	return (
		<div>
			<section className={styles.container}>
				{Object.keys(autofill).length > 0
				&& (
					<div className={styles.fields_container}>
						<p className={styles.text_styles}>
							Last Modified :
							{' '}
							{format(autofill.updated_at, 'yyyy-MMM-dd')}
						</p>

						<p className={styles.text_styles}>
							Last Modified By :
							{/* {` ${autofill.lstModifiedBy}`} */}
						</p>
					</div>
				)}
				{/* <p className={styles.text_styles}>
					{`#${dummyDatas.bdgeNumber}`}
				</p> */}

				<h2 style={{ color: '#4f4f4f', marginTop: 28 }}>Add Badge</h2>
				<p className={styles.text_styles2}>
					Select the conditions and number of completions necessary to obtain
					the badge.
				</p>
				{/* <div className={styles.content_container}>
					{
					labelInputPairs.map((data) => (
						<GetLabelInputPair
							data={data}
						/>
					))
					}
				</div> */}
				<section className={styles.badge_form_container}>
					{getAddBadgesControls.map((controlItem) => {
						const el = { ...controlItem };

						const Element = getFieldController(el.type);

						if (!Element) return null;

						return (
							<div className={styles.form_group}>
								<span className={styles.label}>{el.label}</span>

								<div className={styles.input_group}>
									<Element
										{...el}
										key={el.name}
										control={control}
										id={`${el.name}_input`}
									/>
								</div>

								<div className={styles.error_message}>
									{errors?.[el.name]?.message}
								</div>
							</div>
						);
					})}
				</section>
				<div className={styles.lower_background}>
					<h3 style={{ color: '#4f4f4f' }}>Score and Image</h3>
					<div className={styles.display_flex}>
						{medalType.map((data, index) => (
							<GetCard
								data={data}
								control={control}
								// setUrl={data.setUrl}
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
				</div>
			</section>
		</div>
	);
}

export default CreateBadge;
