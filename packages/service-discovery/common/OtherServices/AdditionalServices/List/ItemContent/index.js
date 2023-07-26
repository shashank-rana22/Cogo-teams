import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import FeedBackModal from '../../../../../page-components/SearchResults/common/EmptyState/RequestRate/FeedBackModal';
import LineItems from '../../../common/LineItems';

import styles from './styles.module.css';

function ItemContent({ serviceItem = {}, details = {}, rateCardData = {} }) {
	const [showRequestRateModal, setShowRequestRateModal] = useState(false);
	const [requestService, setRequestService] = useState({
		service_id    : undefined,
		service_type  : undefined,
		selected_card : undefined,
		service_data  : undefined,
	});

	const { rateData = [] } = serviceItem;

	const renderRateItem = (service) => {
		const {
			container_size = '',
			container_type = '',
			commodity = '',
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

		return (
			<div className={styles.rate_item}>
				<div className={styles.header}>
					<span className={styles.pill}>
						{`${['20', '40'].includes(container_size) ? `${container_size}ft.`
							: container_size} ${startCase(container_type)} ${startCase(commodity)}`}
					</span>

					{total_price_discounted || is_rate_available ? (
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
					) : (
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
					)}
				</div>

				<LineItems line_items={line_items} />

				{showRequestRateModal ? (
					<FeedBackModal
						onClose={() => setShowRequestRateModal(false)}
						show={showRequestRateModal}
						details={details}
						data={rateCardData}
						requestService={requestService}
					/>
				) : null}

			</div>
		);
	};
	return (
		<div className={styles.container}>
			{rateData.map((rateItem) => renderRateItem(rateItem))}
		</div>
	);
}

export default ItemContent;
