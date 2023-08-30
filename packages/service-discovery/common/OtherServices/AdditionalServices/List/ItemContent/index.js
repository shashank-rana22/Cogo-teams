import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React, { useState } from 'react';

import FeedBackModal from '../../../../../page-components/SearchResults/common/RequestRate/FeedBackModal';
import LineItems from '../../../common/LineItems';

import getPillData from './getPillData';
import styles from './styles.module.css';

function ItemContent({ serviceItem = {}, detail = {}, rateCardData = {} }) {
	const [showRequestRateModal, setShowRequestRateModal] = useState(false);
	const [requestService, setRequestService] = useState({
		service_id    : undefined,
		service_type  : undefined,
		selected_card : undefined,
		service_data  : undefined,
	});

	const { rateData = [] } = serviceItem;

	function RenderRateItem({ service = {} }) {
		const {
			line_items = [],
			total_price_currency = '',
			total_price_discounted = 0,
			is_rate_available = false,
		} = service;

		const handleRateFeedback = () => {
			setShowRequestRateModal(true);
			setRequestService({
				service_id    : service.id,
				service_type  : service?.service_type,
				selected_card : rateCardData?.id || null,
				service_data  : service,
			});
		};

		function RenderPill() {
			const pillData = getPillData({ item: service, service_type: serviceItem.service_type });

			return (
				<div className={styles.pills_container}>
					{(pillData || []).map((pillItem) => (
						<span
							key={pillItem}
							className={styles.pill}
						>
							{pillItem}
						</span>
					))}
				</div>
			);
		}

		function RenderRate() {
			const conditionToRequestRate = !(total_price_discounted || is_rate_available);

			if (conditionToRequestRate) {
				if (serviceItem.service_type === 'fcl_freight_local') {
					if (serviceItem.source === 'cogo_assured_rate') {
						return 'No Rates';
					} return 'At Actuals';
				}
				return (
					<div className={styles.no_rates_found}>
						<strong>No Rates Found</strong>

						<Button
							size="sm"
							themeType="accent"
							className={styles.request_rate_button}
							onClick={handleRateFeedback}
						>
							Request Rate
						</Button>
					</div>
				);
			}

			return (
				<div className={styles.total_price}>
					Total:
					<div style={{ fontWeight: 600, fontSize: 16, marginLeft: 8 }}>
						{formatAmount({
							amount   : total_price_discounted,
							currency : total_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'symbol',
								maximumFractionDigits : 0,
							},
						})}
					</div>
				</div>
			);
		}

		return (
			<div className={styles.rate_item}>
				<div className={styles.header}>
					<RenderPill />

					<RenderRate />
				</div>

				<LineItems line_items={line_items} />

				{showRequestRateModal ? (
					<FeedBackModal
						onClose={() => setShowRequestRateModal(false)}
						show={showRequestRateModal}
						details={detail}
						data={rateCardData}
						requestService={requestService}
					/>
				) : null}
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{rateData.map((rateItem) => (
				<RenderRateItem
					key={rateItem.id}
					service={rateItem}
				/>
			))}
		</div>
	);
}

export default ItemContent;
