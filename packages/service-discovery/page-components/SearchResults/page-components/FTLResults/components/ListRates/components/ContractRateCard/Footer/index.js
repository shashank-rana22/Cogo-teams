import { cl, Tooltip } from '@cogoport/components';
import { IcCCogoCoin, IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import BottomTabs from '../../RateCard/Footer/BottomTabs';

import getTabs from './getTabs';
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

function Footer({
	rate = {},
	detail = {},
	isSelectedCard = false,
}) {
	const [activeTab, setActiveTab] = useState('');

	const TABS = getTabs({ rate, detail });

	const { service_rates = {} } = rate;

	const countOfNoRates = ifRatesNotAvailable(service_rates);

	const contractData = Object.values(service_rates).find((service) => service.source === 'contract');

	console.log('contractData', contractData);

	const { truck_type = '', trucks_count = 0, rate_type = '' } = contractData;

	const showCogoPoints = rate?.earnable_cogopoints;

	if (isSelectedCard) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.pills_container}>
				<div className={styles.pill}>
					Truck type:
					{' '}
					<strong>{startCase(truck_type)}</strong>
				</div>

				<div className={styles.pill}>
					Truck Count:
					{' '}
					<strong>{trucks_count}</strong>
				</div>

				<div className={styles.pill}>
					Rate Type:
					{' '}
					<strong>{startCase(rate_type)}</strong>
				</div>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.left_section}>
					<i>Incidentals, Surcharges, any additional charges will apply as per contract terms</i>
				</div>

				<div className={styles.right_section}>
					<div className={cl`${styles.tabs} ${showCogoPoints ? styles.less_width : styles.more_width}`}>
						{Object.keys(TABS).map((item) => (
							<span
								role="presentation"
								key={item}
								className={cl`${styles.other_details_tag} 
								${activeTab === item ? styles.selected : {}}`}
								onClick={() => {
									if (activeTab === item) {
										setActiveTab('');
									} else setActiveTab(item);
								}}
							>
								<div className={styles.tab_label_container}>
									{TABS[item]?.label}

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
						))}
					</div>

					{showCogoPoints ? (
						<div className={styles.cogo_points}>
							CogoPoints:
							<IcCCogoCoin className={styles.cogo_points_logo} width={16} height={16} />
							{rate?.earnable_cogopoints}
						</div>
					) : null}
				</div>
			</div>

			{activeTab ? (
				<BottomTabs
					TABS={TABS}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			) : null}
		</div>
	);
}

export default Footer;
