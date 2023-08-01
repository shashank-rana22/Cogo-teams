import { Popover } from '@cogoport/components';
import { IcCCogoCoin, IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import Detention from '../../../../common/Detention';

import PossibleSchedules from './PossibleSchedules';
import PriceBreakup from './PriceBreakUp';
import RateCardDetails from './RateCardDetails';
import styles from './styles.module.css';
import TermsConditions from './TermsConditions';

const ADDITIONAL_DAYS_KEYS = ['destination_demurrage', 'origin_detention', 'origin_demurrage', 'destination_detention'];

const BOLD_FONT_WEIGHT = 700;
const MEDIUM_FONT_WEIGHT = 500;

const ZERO = 0;

function DetailFooter({ rateCardData, detail, refetchSearch, isCogoAssured }) {
	const [activeTab, setActiveTab] = useState('');
	const [showDnD, setShowDnD] = useState(false);

	let addDaysValue = {};

	ADDITIONAL_DAYS_KEYS.forEach((item) => {
		const { free_limit, additional_days } = rateCardData[item] || {};

		addDaysValue = {
			...addDaysValue,
			[item]: (free_limit || ZERO + additional_days || ZERO) || ZERO,
		};
	});

	const {
		origin_detention = {},
		origin_demurrage = {},
		destination_detention = {},
		destination_demurrage = {},
	} = rateCardData;

	const howMuchToShowInDnD = {
		origin_detention      : origin_detention?.slabs && !isEmpty(origin_detention.slabs),
		origin_demurrage      : origin_demurrage?.slabs && !isEmpty(origin_demurrage.slabs),
		destination_detention : destination_detention?.slabs && !isEmpty(destination_detention.slabs),
		destination_demurrage : destination_demurrage?.slabs && !isEmpty(destination_demurrage.slabs),
	};

	const notToShowDnD = Object.values(howMuchToShowInDnD).every((val) => {
		if (!val) {
			return true;
		}
		return false;
	});

	const templateStyles = isCogoAssured ? 'cogo_assured' : {};

	const TABS_MAPPING = {
		terms_and_condition: {
			key       : 'terms_and_condition',
			label     : 'T&C',
			component : TermsConditions,
			props     : {
				rateCardData,
				detail,
			},
		},
		price_break_up: {
			key       : 'price_break_up',
			label     : 'Price break up',
			component : PriceBreakup,
			props     : {
				rateCardData,
				detail,
			},
		},
		// dnd_details: {
		// 	key       : 'dnd_details',
		// 	label     : 'D&D Fees',
		// 	component : PriceBreakup,
		// 	props     : {
		// 		rateCardData,
		// 		detail,
		// 	},
		// },
		possible_schedules: {
			key       : 'possible_schedules',
			label     : 'Possible Schedules',
			component : PossibleSchedules,
			props     : {
				rateCardData,
				service_type: detail.service_type,
			},
		},
	};

	return (
		<>
			<div className={`${styles.container} ${styles[templateStyles]}`}>
				<div className={styles.dndDetails}>
					<span className={styles.tag}>Origin</span>
					DET.
					{' '}
					{rateCardData?.origin_detention?.free_limit || ZERO}
					{' '}
					days, Demurrage
					{rateCardData?.origin_demurrage?.free_limit || ZERO}
					{' '}
					days
					<span className={styles.tag}>Destination</span>
					DET.
					{' '}
					{rateCardData?.destination_detention?.free_limit || ZERO}
					{' '}
					days, Demurrage
					{' '}
					{rateCardData?.destination_demurrage?.free_limit || ZERO}
					{' '}
					days

					{notToShowDnD ? null : (
						<Popover
							placement="bottom"
							visible={showDnD}
							onClickOutside={() => setShowDnD(false)}
							render={(
								<Detention
									heading="Update No. of Free Days"
									buttonTitle="Update"
									defaultValues={addDaysValue}
									refetch={refetchSearch}
									rateCardData={rateCardData}
									detail={detail}
									setShow={setShowDnD}
									howMuchToShowInDnD={howMuchToShowInDnD}
								/>
							)}
							caret={false}
						>
							<IcMPlusInCircle
								className={styles.plusIcon}
								onClick={() => setShowDnD(true)}
							/>
						</Popover>
					)}
				</div>

				<div className={styles.otherDetails}>
					<div className={styles.wrapper}>
						{Object.keys(TABS_MAPPING).map((item) => (
							<span
								role="presentation"
								key={item}
								className={styles.otherDetailsTag}
								style={{ fontWeight: activeTab === item ? BOLD_FONT_WEIGHT : MEDIUM_FONT_WEIGHT }}
								onClick={() => {
									if (activeTab === item) {
										setActiveTab('');
									} else setActiveTab(item);
								}}
							>
								{TABS_MAPPING[item].label}
							</span>
						))}
					</div>

					{rateCardData?.earnable_cogopoints ? (
						<div className={styles.cogo_points}>
							CogoPoints
							<IcCCogoCoin className={styles.cogo_points_logo} width={16} height={16} />
							{rateCardData?.earnable_cogopoints}
						</div>
					) : null}
				</div>

			</div>
			{activeTab ? (
				<RateCardDetails
					TABS_MAPPING={TABS_MAPPING}
					rateCardData={rateCardData}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					detail={detail}
				/>
			) : null}
		</>

	);
}

export default DetailFooter;
