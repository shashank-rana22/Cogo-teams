import { cl, Tooltip } from '@cogoport/components';
import { IcCCogoCoin, IcMInfo, IcCFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import BottomTabs from './BottomTabs';
import getTabs from './getTabs';
import styles from './styles.module.css';

const INITIAL_REDUCER_VALUE = 0;
const INCREMENT_BY_ONE = 1;
const DEFAULT_VALUE = 0;

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
	isCogoAssured = false,
}) {
	const [activeTab, setActiveTab] = useState('');

	const templateStyles = isCogoAssured ? 'cogo_assured' : {};

	const TABS = getTabs({ rate, detail });

	const { service_rates = {} } = rate;

	const countOfNoRates = ifRatesNotAvailable(service_rates);

	const showCogoPoints = rate?.earnable_cogopoints;

	if (isSelectedCard) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={cl`${styles.wrapper} ${styles[templateStyles]}`}>
				<div className={styles.left_section}>
					{detail?.chargeable_weight ? (
						<div className={styles.info_item}>
							<IcCFtick style={{ fontSize: '16px', marginRight: 8 }} />
							Chargeable weight -
							{' '}
							{detail?.chargeable_weight || DEFAULT_VALUE}
							kg
						</div>
					) : null}

					{rate?.operation_type ? (
						<div className={styles.info_item}>
							<IcCFtick style={{ fontSize: '16px', marginRight: 8 }} />
							Operation Type -
							{' '}
							{startCase(rate?.operation_type || '')}
						</div>
					) : null}
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
