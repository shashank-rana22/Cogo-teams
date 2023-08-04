import { Modal, Tooltip, cl, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCFcrossInCircle } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useState } from 'react';

import FreightPriceDetail from '../../page-components/SearchResults/common/BasicFreightDetail';
import SailingWeek from '../../page-components/SearchResults/page-components/FCLResults/FclCard/SailingWeek';

import styles from './styles.module.css';

const ZERO = 0;

const TWO = 2;

const format = (date) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
	formatType : 'date',
});

function ShippingLineModal({
	shipping_line = {},
	show = false,
	setShow = () => {},
	cogoAssuredRates = [],
	detail = {},
}) {
	const router = useRouter();
	const [selectedCard, setSelectedCard] = useState(cogoAssuredRates?.[GLOBAL_CONSTANTS.zeroth_index]?.id);

	const options = useMemo(() => cogoAssuredRates.map((rateItem) => {
		const { id = '', freight_price_currency, freight_price_discounted = 0, schedules = {} } = rateItem;

		const { validity_start, validity_end } = schedules;

		return {
			name  : id,
			value : id,
			label : (
				<div className={styles.option_container}>
					<span className={styles.sailing_week}>
						{`${format(validity_start)} to ${format(validity_end)}`}
					</span>

					<span className={styles.freight_price}>
						{formatAmount({
							amount   : freight_price_discounted,
							currency : freight_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'symbol',
								maximumFractionDigits : 0,
							},
						})}
					</span>
				</div>
			),
		};
	}), [cogoAssuredRates]);

	const onClose = () => setShow(false);

	const { short_name } = shipping_line;

	const selectedRateData = cogoAssuredRates.find((item) => item.id === selectedCard);

	const { service_rates = {} } = selectedRateData;

	const { service_type = '' } = detail;

	const serviceRateswithId = Object.keys(service_rates).map((service_id) => {
		const service = service_rates[service_id];
		return { ...service, service_id, ...detail?.service_details?.[service_id] };
	});

	const primaryServiceRates = serviceRateswithId.filter(
		(service) => service.service_type === service_type,
	);

	const firstTwoRates = primaryServiceRates.slice(ZERO, TWO);

	const remainingRates = primaryServiceRates.slice(TWO);

	return (
		<Modal
			size="lg"
			show={show}
			onClose={onClose}
			closeOnOuterClick
			showCloseIcon={false}
			placement="top-right"
			className={styles.modal}
		>
			<Modal.Body className={styles.modal_body}>
				<div className={styles.container}>
					<IcCFcrossInCircle
						className={styles.cross_icon}
						height={24}
						width={24}
						onClick={onClose}
					/>

					<div className={styles.wrapper}>
						We have seen
						<strong> 40% </strong>
						cancellations in the past for
						<span className={styles.shipping_line_name}>{short_name}</span>
						. Why not try
						<strong> Cogo Assured </strong>
						for 100% confirmation?
					</div>
				</div>

				<div className={styles.text}>
					please click proceed to select the cogo assured card or click cancel to continue
				</div>

				<div className={styles.cogo_assured}>
					<div className={styles.rate_details}>
						<div style={{ marginRight: 24 }}>
							<div className={styles.freight_text}>Basic Freight Price</div>
							<div style={{ display: 'flex', alignItems: 'end' }}>
								{(firstTwoRates || []).map((item) => (
									<FreightPriceDetail
										key={item.service_id}
										container_size={item?.container_size}
										container_type={item?.container_type}
										price={item?.total_price_discounted}
										price_current={item?.total_price_currency}
									/>
								))}

								{!isEmpty(remainingRates) && (
									<Tooltip
										theme="light"
										placement="top"
										content={(remainingRates || []).map((item) => (
											<FreightPriceDetail
												key={item.service_id}
												container_size={item?.container_size}
												container_type={item?.container_type}
												price={item?.total_price_discounted}
												price_current={item?.total_price_currency}
											/>
										))}
									>
										<span className={styles.pill}>
											{`+${remainingRates.length} More`}
										</span>
									</Tooltip>
								)}
							</div>
						</div>

						<div>
							<div className={cl`${styles.freight_text} ${styles.total}`}>Total Freight Price</div>
							<FreightPriceDetail
								container_size={firstTwoRates?.[GLOBAL_CONSTANTS.zeroth_index]?.container_size}
								container_type={firstTwoRates?.[GLOBAL_CONSTANTS.zeroth_index]?.container_type}
								price={selectedRateData?.total_price_discounted}
								price_current={selectedRateData?.total_price_currency}
								totalPrice
							/>
						</div>
					</div>

					<SailingWeek
						cogoAssuredOptions={options}
						onChange={setSelectedCard}
						selectedCogoAssuredCard={selectedCard}
						source="banner"
					/>
				</div>

				<div className={styles.footer}>
					<Button type="button" onClick={onClose} themeType="secondary">Cancel</Button>

					<Button
						type="button"
						onClick={() => router.push(
							`/book/${router.query.spot_search_id}?rate_card_id=${selectedCard}`,
						)}
						style={{ marginLeft: '12px' }}
					>
						Proceed
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default ShippingLineModal;
