import { Modal, Tooltip, cl, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCFcrossInCircle } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useState } from 'react';

import FreightPriceDetail from '../../page-components/SearchResults/common/BasicFreightDetail';
import SailingWeek from '../../page-components/SearchResults/page-components/FCLResults/FclCard/SailingWeek';

import styles from './styles.module.css';

const START_INDEX = 0;
const MIN_PERCENTAGE = 25;
const RANGE = 25;
const END_INDEX_FOR_FIRST_TWIO_RATES = 2;

function ShippingLineModal({
	shipping_line = {},
	show = false,
	setShow = () => {},
	cogoAssuredRates = [],
	detail = {},
}) {
	const router = useRouter();
	const [selectedCard, setSelectedCard] = useState(cogoAssuredRates?.[GLOBAL_CONSTANTS.zeroth_index]?.id);

	const onClose = () => setShow(false);

	const { short_name } = shipping_line || {};

	const selectedRateData = cogoAssuredRates.find((item) => item.id === selectedCard);

	const { service_rates = {} } = selectedRateData || {};

	const { service_type = '' } = detail;

	const serviceRateswithId = Object.keys(service_rates).map((service_id) => {
		const service = service_rates[service_id];
		return { ...service, service_id, ...detail?.service_details?.[service_id] };
	});

	const primaryServiceRates = serviceRateswithId.filter(
		(service) => service.service_type === service_type,
	);

	const firstTwoRates = primaryServiceRates.slice(START_INDEX, END_INDEX_FOR_FIRST_TWIO_RATES);

	const remainingRates = primaryServiceRates.slice(END_INDEX_FOR_FIRST_TWIO_RATES);

	const randomValue = useMemo(() => MIN_PERCENTAGE + Math.ceil(Math.random() * RANGE), []);

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
						<strong>
							{' '}
							{randomValue}
							%
							{' '}
						</strong>
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
							<div className={styles.freight_text}>Freight Price</div>
							<div style={{ display: 'flex', alignItems: 'end' }}>
								{(firstTwoRates || []).map((item) => (
									<FreightPriceDetail
										key={item.service_id}
										container_size={item?.container_size}
										container_type={item?.container_type}
										price={item?.total_price_discounted}
										price_currency={item?.total_price_currency}
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
												price_currency={item?.total_price_currency}
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
								price_currency={selectedRateData?.total_price_currency}
								totalPrice
							/>
						</div>
					</div>

					<SailingWeek
						cogoAssuredRates={cogoAssuredRates}
						onChange={setSelectedCard}
						selectedCogoAssuredCard={selectedCard}
						source="banner"
					/>
				</div>

				<div className={styles.footer}>
					<img
						src={GLOBAL_CONSTANTS.image_url.cogo_assured_banner}
						alt="cogo assured logo"
						className={styles.shipping_line_logo}
						height={26}
					/>

					<div className={styles.button_container}>
						<Button type="button" onClick={onClose} themeType="secondary">Cancel</Button>

						<Button
							type="button"
							onClick={() => router.push(
								`/book/[spot_search_id]?rate_card_id=${selectedCard}`,
								`/book/${router.query.spot_search_id}?rate_card_id=${selectedCard}`,
							)}
							style={{ marginLeft: '12px' }}
						>
							Proceed
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default ShippingLineModal;
