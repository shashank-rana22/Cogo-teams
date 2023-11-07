import { cl, Tooltip } from '@cogoport/components';
import { IcCCogoCoin, IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import BottomTabs from '../../../../common/BottomTabs';
import PossibleSchedules from '../../../../common/PossibleSchedules';
import PriceBreakup from '../../../../common/PriceBreakUp';
import TermsConditions from '../../../../common/TermsConditions';

import DetentionDemurrage from './DetentionDemurrage';
import styles from './styles.module.css';

const INITIAL_REDUCER_VALUE = 0;
const INCREMENT_BY_ONE = 1;

const ifRatesNotAvailable = (rates = {}) => {
	const ratesArray = Object.values(rates);

	const count = (ratesArray || []).reduce((acc, rateObj) => {
		const { is_rate_available = true } = rateObj;
		return is_rate_available ? acc : acc + INCREMENT_BY_ONE;
	}, INITIAL_REDUCER_VALUE);

	return count;
};

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
			visible   : !isCogoAssured,
			props     : {
				rateCardData,
				service_type: detail.service_type,
			},
		},
	};
	const { service_rates = {} } = rateCardData;

	const countOfNoRates = ifRatesNotAvailable(service_rates);

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
						{Object.keys(TABS_MAPPING).map((item) => {
							const { visible = true } = TABS_MAPPING[item];

							if (!visible) {
								return null;
							}

							return (
								<span
									role="presentation"
									key={item}
									className={cl`${styles.other_details_tag} 
								${activeTab === item ? styles.selected : null}`}
									onClick={() => {
										if (activeTab === item) {
											setActiveTab('');
										} else setActiveTab(item);
									}}
								>
									<div className={styles.tab_label_container}>
										{TABS_MAPPING[item].label}

										{countOfNoRates && item === 'price_break_up' ? (
											<Tooltip
												placement="top"
												trigger="mouseenter"
												interactive
												content={(
													<span className={styles.tooltip_content}>
														Rates for
														{' '}
														{countOfNoRates}
														{' '}
														services
														{' '}
														are not available
													</span>
												)}
											>
												<IcMInfo className={styles.info_icon} />
											</Tooltip>
										) : null}
									</div>
								</span>
							);
						})}
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
					TABS={TABS_MAPPING}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			) : null}
		</div>
	);
}

export default DetailFooter;
