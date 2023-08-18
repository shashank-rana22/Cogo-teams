import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMTick, IcMCalendar } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import Footer from './Footer';
import styles from './styles.module.css';

const DEFAULT_EXPIRY_DAYS = 0;
const SHOW_REMAINING_EXPIRY_DAYS = 31;

function SubscriptionCard(props) {
	const {
		item = {}, activeTab = '', setSelectedPlan = () => {},
	} = props || {};

	const [hover, setHover] = useState(false);

	const {
		plan_name = '',
		metadata = {},
		display_pricing = '',
		category = '',
	} = item || {};

	const { checkout = {}, is_active_plan: isActive = '', expires_in } = display_pricing?.[activeTab] || {};
	const numberOfExpiryDays = expires_in || DEFAULT_EXPIRY_DAYS;

	const sortePlans = (metadata?.plan_details || []).sort(
		(a, b) => a.sequence < b.sequence,
	);

	useEffect(() => {
		if (!isEmpty(checkout)) {
			setSelectedPlan(item);
		}
	}, [checkout, item, setSelectedPlan]);

	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover('')}
			className={styles.plans_container}
			style={{
				backgroundImage: `url(${hover || isActive
					? GLOBAL_CONSTANTS.image_url.subscription_bg : ''})`,
			}}
		>
			<div className={styles.header}>
				<div>
					<div className={cl`${styles.plans_header}
					${isActive || hover ? styles.change_color_on_hover : ''}`}
					>
						{startCase(plan_name)}
					</div>
					{numberOfExpiryDays > DEFAULT_EXPIRY_DAYS && numberOfExpiryDays <= SHOW_REMAINING_EXPIRY_DAYS && (
						<div className={styles.plans_sub_header}>
							<IcMCalendar />
							<span>
								{numberOfExpiryDays}
							</span>
							days to expire
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
								{' '}
								{display_name}
							</span>
						</div>
					);
				})}
			</div>

			<Footer
				{...props}
				hover={hover}
			/>
		</div>
	);
}

export default SubscriptionCard;
