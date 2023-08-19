import { Toggle, Placeholder, cl, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCopy, IcMRefresh } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useCreatePaymentLink from '../../../../../hooks/useCreatePaymentLink';
import useGetPaymentStatus from '../../../../../hooks/useGetPaymentStatus';
import useListSaasPlans from '../../../../../hooks/useListSaasPlans';
import copyToClipboard from '../../../../../utils/copyToClipboard';

import AddOnModal from './AddOnModal';
import AssignModal from './AssignModal';
import styles from './styles.module.css';
import SubscriptionCard from './SubscriptionCard';

const CARD_LAYOUT_PLACEHODER_COUNT = 3;
const CARD_LAYOUT_PLACEHODER = [...Array(CARD_LAYOUT_PLACEHODER_COUNT).keys()];
const ANNUAL_SUBSCRIPTION_DISCOUNT_PERCENT = 20;

function EmptyState() {
	return (
		<div className={styles.empty_state_container}>
			<Image src={GLOBAL_CONSTANTS.image_url.empty_state} width={250} height={250} alt="plans unavailable" />
			<div className={styles.empty_state_label}>Plans are not available</div>
		</div>
	);
}

function ManageSubscriptions(props) {
	const { orgId = '', organizationData = {} } = props || {};

	const selectedUserId = organizationData?.users?.[GLOBAL_CONSTANTS.zeroth_index]?.id || '';

	const [showAddOn, setShowAddOn] = useState(false);
	const [isAssignModal, setIsAssignModal] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState({});

	const { plansData = {}, loading = false, getUserActivePlans = () => {} } = useListSaasPlans({ orgId });

	const {
		item_plans : itemPlans = [],
		saas_subscription_customer_id : saasSubscriptionCustomerId = '',
	} = plansData || {};

	const activePlanAvailableInMonth = (itemPlans || []).filter(
		(item) => item?.display_pricing?.monthly?.is_active_plan,
	);
	const monthlySubscription = isEmpty(activePlanAvailableInMonth) ? 'annual' : 'monthly';

	const [activeTab, setActiveTab] = useState('monthly');

	const { display_pricing = {} } = selectedPlan || {};
	const { payment_link : paymentLink = '', checkout = {} } = display_pricing[activeTab] || {};
	const { payment_order_id: paymentOrderId = '', id: checkoutId = '' } = checkout || {};

	const {
		createLink = () => {}, createLinkloading = false,
	} = useCreatePaymentLink({ saasSubscriptionCustomerId, getUserActivePlans, selectedUserId });

	const {
		paymentDetails = {},
		getPaymentStatus = () => {},
	} = useGetPaymentStatus({ paymentOrderId });

	const { status: paymentStatus = '' } = paymentDetails || {};

	const sortedItemPlans = (itemPlans || []).sort(
		(a, b) => a.priority_sequence - b.priority_sequence,
	);

	const handleToggle = (event) => {
		if (event.target.checked) {
			setActiveTab('annual');
		} else {
			setActiveTab('monthly');
		}
	};

	const handleRefresh = () => {
		getPaymentStatus();
		getUserActivePlans();
	};

	useEffect(() => {
		setActiveTab(monthlySubscription);
	}, [monthlySubscription]);

	return (
		<div>
			<div className={styles.intelligence_container}>
				<div className={styles.intelligence_title}>
					Empowering Dreams: Ignite Success Through Subscription Sales!
				</div>
				<div className={styles.intelligence_content}>
					Empowering dreams, one subscription at a time.
					Let&apos;s inspire growth, ignite visions, and fuel the journey of creative entrepreneurs together.
					Transform potential into reality and turn subscriptions into success stories!
				</div>
			</div>

			{isEmpty(sortedItemPlans) && !loading ? <EmptyState /> : (
				<div>
					{loading ? (
						<div>
							{CARD_LAYOUT_PLACEHODER.map((item) => (
								<Placeholder key={item} height="150px" width="100%" margin="10px 0" />
							))}
						</div>
					) : (
						<>
							<div className={styles.toggle_container}>
								<Toggle
									checked={activeTab === 'annual'}
									disabled={loading}
									size="sm"
									onLabel="Bill Annually"
									offLabel="Bill Monthly"
									value={activeTab}
									onChange={handleToggle}
								/>
								{activeTab === 'annual' && (
									<div className={styles.discount}>
										(Save
										<div className={styles.annual_discount_percent}>
											{ANNUAL_SUBSCRIPTION_DISCOUNT_PERCENT}
										</div>
										% off)
									</div>
								)}
							</div>

							{(sortedItemPlans || []).map((item) => (
								<SubscriptionCard
									key={item?.id}
									item={item}
									activeTab={activeTab}
									createLink={createLink}
									createLinkloading={createLinkloading}
									setSelectedPlan={setSelectedPlan}
									selectedPlan={selectedPlan}
									paymentStatus={paymentStatus}
									setIsAssignModal={setIsAssignModal}
									setShowAddOn={setShowAddOn}
								/>
							))}
						</>
					)}
				</div>
			)}

			{!isEmpty(checkout) ? (
				<div className={cl`${styles.plans_fixed_footer}
				${!isEmpty(paymentLink) ? styles.two_childs_present : ''}`}
				>
					{!isEmpty(paymentLink) && (
						<div className={styles.link_with_refresh}>
							<div
								role="presentation"
								className={styles.payment_link_status}
								onClick={() => window.open(paymentLink, '_blank')}
							>
								{paymentLink}
							</div>
							<IcMCopy
								className={styles.copy_icon}
								onClick={() => copyToClipboard({ content: paymentLink, label: 'Payment link' })}
							/>
						</div>
					)}

					<Tooltip
						placement="bottom"
						theme="light"
						content="Refresh List"
						className={styles.link_with_refresh}
					>
						<IcMRefresh onClick={handleRefresh} className={styles.refresh_icon} />
					</Tooltip>
				</div>
			) : null}

			{showAddOn && (
				<AddOnModal
					showAddOn={showAddOn}
					setShowAddOn={setShowAddOn}
					organizationData={organizationData}
					saasSubscriptionCustomerId={saasSubscriptionCustomerId}
				/>
			)}

			{isAssignModal && (
				<AssignModal
					isAssignModal={isAssignModal}
					setIsAssignModal={setIsAssignModal}
					orgId={orgId}
					checkoutId={checkoutId}
					getUserActivePlans={getUserActivePlans}
				/>
			)}
		</div>
	);
}

export default ManageSubscriptions;
