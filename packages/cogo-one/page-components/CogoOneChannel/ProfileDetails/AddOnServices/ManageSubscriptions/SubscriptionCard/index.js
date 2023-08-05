import { cl, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMTick, IcMCalendar } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

const NUMBER_OF_MONTHS = 12;

function SubscriptionCard(props) {
	const {
		item = {}, activeTab = '', createLink = () => {}, createLinkloading = false,
		selectedPlan, setSelectedPlan = () => {},
	} = props || {};

	const [hover, setHover] = useState(false);

	const {
		plan_name = '',
		metadata = {},
		display_pricing = '',
		category = '',
		id: planId = '',
	} = item || {};

	const isActive = display_pricing?.[activeTab]?.is_active_plan;
	const totalAmount = display_pricing?.[activeTab]?.price;
	const displayCurrency = display_pricing?.[activeTab]?.currency;
	const subscriptionRate = activeTab === 'annual' ? totalAmount / NUMBER_OF_MONTHS : totalAmount;

	const isLoading = selectedPlan?.id === planId ? createLinkloading : false;

	const sortePlans = (metadata?.plan_details || []).sort(
		(a, b) => a.sequence < b.sequence,
	);

	const handleGenerateLink = ({ plan }) => {
		const { display_pricing: displayPricing = '' } = plan || {};
		const planPricingId = displayPricing?.[activeTab]?.id;

		setSelectedPlan(plan);
		createLink({ planPricingId });
	};

	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover('')}
			className={styles.plans_container}
			style={{
				backgroundImage: `url(${hover || isActive
					? GLOBAL_CONSTANTS.image_url.subscription_bg : 'none'})`,
			}}
		>
			<div className={cl`${styles.header}`}>
				<div>
					<div className={cl`${styles.plans_header}
					${isActive || hover ? styles.change_color_on_hover : ''}`}
					>
						{startCase(plan_name)}
					</div>
					{display_pricing?.[activeTab]?.expires_in && (
						<div className={styles.plans_sub_header}>
							<IcMCalendar />
							<span>
								{display_pricing[activeTab]?.expires_in}
								days to expire
							</span>
						</div>
					)}
				</div>
				{plan_name?.includes('premium') ? <div className={styles.plan_tag}>Most Popular</div> : null}
			</div>

			{category === 'custom'	&& (
				<div className={styles.align_content_middle}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.custom_plan}
						width={200}
						height={200}
						alt="custom plan"
						className={styles.custom_plan_img}
					/>
				</div>
			)}

			<div>
				{(sortePlans || []).map((plan) => {
					const { value = '', display_name = '' } = plan || {};

					return (
						<div
							key={value}
							className={cl`${styles.plans_points}
							${isActive || hover ? styles.change_color_on_hover : ''}`}
						>
							<IcMTick width={20} height={20} fill={isActive || hover ? '#fcdc00' : '#BDBDBD'} />
							<span className={cl`${styles.plan_points_prefix} 
							${isActive || hover ? styles.change_color_on_hover : ''}`}
							>
								{value}
							</span>
							{display_name}
						</div>
					);
				})}
			</div>
			{isActive ? (
				<div className={styles.active_plan_label}>
					Active Plan
				</div>
			) : (
				<div className={styles.footer}>
					<div className={cl`${styles.align_content_middle} ${hover ? styles.change_color_on_hover : ''}`}>
						<span className={styles.subscription_currency}>{displayCurrency}</span>
						<div className={styles.rate_per_month_with_currency}>
							{formatAmount({
								amount   : subscriptionRate,
								currency : displayCurrency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'symbol',
									maximumFractionDigits : 2,
									minimumFractionDigits : 0,
								},
							})}
						</div>
						<span>
							/month
						</span>
					</div>
					<Button
						size="md"
						themeType={hover ? 'primary' : 'secondary'}
						className={styles.call_to_action}
						onClick={() => handleGenerateLink({ plan: item })}
						loading={isLoading}
						disabled={isLoading}
					>
						Generate Link
					</Button>
				</div>
			)}
		</div>
	);
}

export default SubscriptionCard;
