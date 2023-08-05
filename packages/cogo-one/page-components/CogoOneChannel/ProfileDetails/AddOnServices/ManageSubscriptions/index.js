import { Toggle, Placeholder, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCopy } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

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
			<Image src={GLOBAL_CONSTANTS.image_url.empty_state} width={250} height={200} alt="plans unavailable" />
			<div className={styles.empty_state_label}>Plans unavailable</div>
		</div>
	);
}

function ManageSubscriptions(props) {
	const { orgId = '', organizationData = {} } = props || {};

	const [activeTab, setActiveTab] = useState('monthly');
	const [showAddOn, setShowAddOn] = useState(false);
	const [showAssign, setShowAssign] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState({});

	const { plansData = {}, loading = false } = useListSaasPlans({ orgId });

	const { item_plans = [], saas_subscription_customer_id : saasSubscriptionCustomerId = '' } = plansData || {};

	const {
		createLink = () => {}, createLinkloading = false,
		showLink = false,
	} = useCreatePaymentLink({ saasSubscriptionCustomerId });

	const { paymentDetails } = useGetPaymentStatus();
	console.log('paymentDetails:', paymentDetails);

	const { show = false, linkUrl = '' } = showLink || {};

	const sortedItemPlans = (item_plans || []).sort(
		(a, b) => a.priority_sequence - b.priority_sequence,
	);

	const handleToggle = (event) => {
		if (event.target.checked) {
			setActiveTab('annual');
		} else {
			setActiveTab('monthly');
		}
	};

	return (
		<div>
			<div className={styles.intelligence_container}>
				<div className={styles.intelligence_title}>The Right Plan for Your Business</div>
				<div className={styles.intelligence_content}>
					We have several powerful plans to showcase your business and
					get discovered as a creative entrepreneurs. Everything you need.
				</div>
			</div>

			<div className={styles.toggle_container}>
				<Toggle
					size="sm"
					onLabel="Bill Annually"
					offLabel="Bill Monthly"
					value={activeTab}
					onChange={handleToggle}
				/>
				{activeTab === 'annual' && (
					<div className={styles.discount}>
						(Save
						<div className={styles.annual_discount_percent}>{ANNUAL_SUBSCRIPTION_DISCOUNT_PERCENT}</div>
						% off)
					</div>
				)}
			</div>

			{show ? (
				<div className={styles.share_payment_link}>
					<div>Copy Payment Link</div>
					<IcMCopy
						className={styles.copy_icon}
						onClick={() => copyToClipboard({ content: linkUrl, label: 'Payment link' })}
					/>
				</div>
			) : null}

			{isEmpty(sortedItemPlans) && !loading ? <EmptyState /> : (
				<div>
					{loading ? (
						<div>
							{CARD_LAYOUT_PLACEHODER.map((item) => (
								<Placeholder key={item} height="150px" width="100%" margin="10px 0" />
							))}
						</div>
					) : (sortedItemPlans || []).map((item) => (
						<SubscriptionCard
							key={item.id}
							item={item}
							activeTab={activeTab}
							createLink={createLink}
							createLinkloading={createLinkloading}
							setSelectedPlan={setSelectedPlan}
							selectedPlan={selectedPlan}
						/>
					))}
				</div>
			)}
			<div className={styles.plans_fixed_footer}>
				{/* This part will be take live soon...ignore commented code */}

				{/* <Button
					themeType="link"
					size="md"
					className={styles.buy_add_on_button}
					onClick={() => setShowAddOn(true)}
				>
					Buy Add-On
				</Button> */}
				<Button themeType="accent" size="md" onClick={() => setShowAssign(true)} disabled>Assign</Button>
			</div>

			<AddOnModal
				showAddOn={showAddOn}
				setShowAddOn={setShowAddOn}
				organizationData={organizationData}
				saasSubscriptionCustomerId={saasSubscriptionCustomerId}
			/>

			<AssignModal
				showAssign={showAssign}
				setShowAssign={setShowAssign}
				orgId={orgId}
			/>
		</div>
	);
}

export default ManageSubscriptions;
