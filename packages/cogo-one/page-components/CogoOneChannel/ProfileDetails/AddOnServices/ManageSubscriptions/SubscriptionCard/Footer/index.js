import { cl, Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const NUMBER_OF_MONTHS = 12;
const GENERATE_LINK_AGAIN_STATUSES = ['CANCELLED', 'REFUNDED', 'EXPIRED', 'FAILED'];

function Footer(props) {
	const {
		item = {}, activeTab = '', createLink = () => {}, createLinkloading = false, hover = false,
		selectedPlan, setSelectedPlan = () => {}, paymentStatus = '', setShowAssign = () => {},
	} = props || {};

	const {
		plan_name = '',
		display_pricing = '',
		id: planId = '',
		checkout = {},
	} = item || {};

	const isActive = display_pricing?.[activeTab]?.is_active_plan;
	const displayCurrency = display_pricing?.[activeTab]?.currency;
	const totalAmount = display_pricing?.[activeTab]?.price;
	const subscriptionRate = activeTab === 'annual' ? totalAmount / NUMBER_OF_MONTHS : totalAmount;

	const isLoading = selectedPlan?.id === planId ? createLinkloading : false;
	const showGenerateLinkCTA = isEmpty(checkout)
	|| GENERATE_LINK_AGAIN_STATUSES.includes(paymentStatus);

	const handleGenerateLink = ({ plan }) => {
		const { display_pricing: displayPricing = '' } = plan || {};
		const planPricingId = displayPricing?.[activeTab]?.id;

		setSelectedPlan(plan);
		createLink({ planPricingId });
	};

	if (isActive) {
		return (
			<div className={styles.active_plan_label}>
				Active Plan
			</div>
		);
	}

	if (plan_name?.includes('starter')) {
		return null;
	}

	return (
		<div className={styles.footer}>
			<div className={cl`${styles.align_content_middle}
				${hover ? styles.change_color_on_hover : ''}`}
			>
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

			{showGenerateLinkCTA ? (
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
			) : (
				<Button
					themeType={hover ? 'primary' : 'accent'}
					size="md"
					onClick={() => setShowAssign(true)}
					disabled={paymentStatus !== 'PAID'}
				>
					Assign
				</Button>
			)}
		</div>
	);
}

export default Footer;
