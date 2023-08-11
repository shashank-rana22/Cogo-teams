import { cl } from '@cogoport/components';
import { IcCCogoCoin } from '@cogoport/icons-react';
import React, { useState } from 'react';

import BottomTabs from './BottomTabs';
import PossibleSchedules from './BottomTabs/PossibleSchedules';
import PriceBreakup from './BottomTabs/PriceBreakUp';
import TermsConditions from './BottomTabs/TermsConditions';
import DetentionDemurrage from './DetentionDemurrage';
import styles from './styles.module.css';

const BOLD_FONT_WEIGHT = 700;
const MEDIUM_FONT_WEIGHT = 500;

function DetailFooter({ rateCardData = {}, detail = {}, refetchSearch = () => {}, isCogoAssured = false }) {
	const [activeTab, setActiveTab] = useState('');

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
		<div>
			<div className={cl`${styles.container} ${styles[templateStyles]}`}>
				<DetentionDemurrage
					rateCardData={rateCardData}
					detail={detail}
					refetch={refetchSearch}
				/>

				<div className={styles.other_details}>
					<div className={styles.wrapper}>
						{Object.keys(TABS_MAPPING).map((item) => (
							<span
								role="presentation"
								key={item}
								className={styles.other_details_tag}
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
				<BottomTabs
					TABS_MAPPING={TABS_MAPPING}
					rateCardData={rateCardData}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					detail={detail}
				/>
			) : null}
		</div>
	);
}

export default DetailFooter;
