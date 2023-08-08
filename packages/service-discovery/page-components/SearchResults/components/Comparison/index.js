import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import Contract from '../../common/Contract';
import ShareToUsers from '../../common/ShareToUsers';

import ComparisonTable from './ComparisonTable';
import styles from './styles.module.css';

const DEFAULT_FREE_DAYS_VALUE = 0;
const ONE_VALUE = 1;

const SCHEDULE_TYPE_MAPPING = {
	transhipment : 'Trans-shipment',
	direct       : 'Direct-shipment',
};

const STATIC_COMPARISON_KEY = {
	fcl_freight: {
		bls_count             : 'BL Count',
		total_landed_price    : 'Total Landed Cost',
		schedule_type         : 'Schedule Type',
		free_origin_days      : 'Free Origin days',
		free_destination_days : 'Free Destination days',
		validity_end          : 'Estimated Time Departure ',
		book_and_lock         : '',
	},
	air_freight: {
		validity_end       : 'Estimated Time Departure ',
		total_landed_price : 'Total Landed Cost',
		book_and_lock      : '',
	},
	default: {},
};

const toSnakeCase = (str) => str
	&& str
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		.map((x) => x.toLowerCase())
		.join('_');

function flattenArray(arr) {
	return arr.reduce(
		(flat, toFlatten) => flat.concat(
			Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten,
		),
		[],
	);
}

const formatAmountValue = (amount, currency) => (
	formatAmount({
		amount,
		currency,
		options: {
			style           : 'currency',
			currency,
			currencyDisplay : 'symbol',
		},
	}) || '-'
);

function getAllLineItems(staticLineItems = {}, dynamicLineItems = {}) {
	const combinedLineItems = Object.keys(staticLineItems).reduce(
		(result, key) => ({ ...result, [key]: [...staticLineItems[key]] }),
		{},
	);

	Object.keys(dynamicLineItems).forEach((shipping_line) => {
		if (combinedLineItems[shipping_line]) {
			combinedLineItems[shipping_line].push(...dynamicLineItems[shipping_line]);
		} else {
			combinedLineItems[shipping_line] = [...dynamicLineItems[shipping_line]];
		}
	});

	return combinedLineItems;
}

function HandleBookValue({
	item = {},
	apiLoading = false,
	service_type = '',
	setSelectedCard = () => {},
	setShowContract = () => {},
}) {
	const service_rates = Object.values(item.service_rates);
	const primaryServiceRates = service_rates.filter(
		(service) => service.service_type === service_type,
	);

	const isCogoAssured = item.source === 'cogo_assured_rate';

	const isMultiContainer = primaryServiceRates.length > ONE_VALUE;

	const router = useRouter();

	const handleLockPrice = () => { setShowContract(true); setSelectedCard(item); };

	const handleBook = () => {
		router.push(`/book/${router.query.spot_search_id}?rate_card_id=${item?.id}`);
	};

	return (
		<div className={styles.book_buttons}>
			{isCogoAssured || isMultiContainer ? null : (
				<Button
					size="md"
					themeType="secondary"
					disabled={apiLoading}
					style={{ marginBottom: '8px' }}
					onClick={handleLockPrice}
				>
					Lock freight price
				</Button>
			)}

			<Button
				size="md"
				themeType="accent"
				disabled={apiLoading}
				onClick={handleBook}
			>
				Proceed to Book
			</Button>
		</div>
	);
}

const getStaticLineItems = (item, mode, summary, setSelectedCard, setShowContract) => {
	const keys = Object.keys(STATIC_COMPARISON_KEY[mode || 'default']);
	const otherComparisonKeys = keys.map((key) => {
		const comparisonKey = {
			code : key,
			name : STATIC_COMPARISON_KEY[mode || 'default'][key],
		};

		const createValueObject = (value) => ({ ...comparisonKey, value });

		const getFreeDaysValue = (detention, demurrage) => `Detention: ${detention?.free_limit
			|| DEFAULT_FREE_DAYS_VALUE}, Demurrage: ${demurrage?.free_limit
			|| DEFAULT_FREE_DAYS_VALUE}`;

		const keyHandlers = {
			bls_count          : () => createValueObject(summary.bls_count),
			schedule_type      : () => createValueObject(SCHEDULE_TYPE_MAPPING[item.schedule_type]),
			total_landed_price : () => createValueObject(
				formatAmountValue(
					item?.total_price_discounted,
					item?.total_price_currency,
				),
			),
			free_destination_days: () => createValueObject(
				getFreeDaysValue(
					item?.destination_detention,
					item?.destination_demmurage,
				),
			),
			free_origin_days: () => createValueObject(
				getFreeDaysValue(item?.origin_detention, item?.origin_demmurage),
			),
			validity_end: () => createValueObject(
				formatDate({
					date       : item.schedules?.departure || item.schedules?.validity_end,
					formattype : 'date',
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd-MMM-yyyy'],
				}),
			),
			book_and_lock: () => ({
				...comparisonKey,
				value: (
					<HandleBookValue
						item={item}
						service_type={summary.service_type || summary.search_type}
						setSelectedCard={setSelectedCard}
						setShowContract={setShowContract}
					/>
				),
			}),
			default: () => ({
				code : key,
				rate : { ...comparisonKey },
				name : STATIC_COMPARISON_KEY[mode || 'default'][key],
			}),
		};

		const keyHandler = keyHandlers[key] || keyHandlers.default;
		return keyHandler();
	});

	return otherComparisonKeys;
};

const getDyanmicLineItems = (lineItems) => {
	const flattenedLineItems = flattenArray(lineItems).map((childItem) => ({
		code  : childItem?.code,
		name  : childItem?.name,
		value : formatAmountValue(
			childItem?.total_price || '-',
			childItem?.currency,
		),
		serviceObj: childItem?.serviceObj || {},
	}));

	return flattenedLineItems;
};

function Comparison({
	detail = {},
	setScreen = () => {},
	mode = 'fcl_freight',
	comparisonRates = {},
}) {
	const [showShare, setShowShare] = useState(false);
	const [showContract, setShowContract] = useState(false);
	const [selectedCard, setSelectedCard] = useState(false);

	const selectedCards = Object.values(comparisonRates);

	const { service_details = {} } = detail;

	const LOGO_MAPPING = {};

	const STATIC_LINE_ITEMS = {};
	const DYNMAIC_LINE_ITEMS = {};

	selectedCards.forEach((cardItem) => {
		const { service_rates = [], shipping_line = {}, source } = cardItem;

		const services = Object.entries(service_rates);

		const lineItems = services.flatMap(
			([key, service]) => (service?.line_items || []).map(
				(child) => ({ ...child, serviceObj: { service: { ...service, ...service_details[key] }, id: key } }),
			),
		);

		const staticLineItems = getStaticLineItems(
			cardItem,
			mode,
			detail,
			setSelectedCard,
			setShowContract,
		);

		const dynamicLineItems = getDyanmicLineItems(lineItems);

		const logo = source === 'cogo_assured_rate'
			? GLOBAL_CONSTANTS.image_url.cogo_assured_banner : shipping_line.logo_url;

		LOGO_MAPPING[toSnakeCase(shipping_line.short_name)] = logo;

		STATIC_LINE_ITEMS[toSnakeCase(shipping_line.short_name)] = staticLineItems;
		DYNMAIC_LINE_ITEMS[toSnakeCase(shipping_line.short_name)] = dynamicLineItems;
	});

	const allLineItems = getAllLineItems(STATIC_LINE_ITEMS, DYNMAIC_LINE_ITEMS);

	const handleBack = () => setScreen('listRateCard');

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>View Comparison</div>

				<div className={styles.buttons_container}>
					<Button
						onClick={handleBack}
						size="md"
						themeType="link"
						className={styles.button}
						style={{ padding: '20px 16px' }}
					>
						Go Back
					</Button>

					<Button
						onClick={() => setShowShare(true)}
						size="md"
						themeType="secondary"
						className={styles.button}
						style={{ padding: '20px 44px' }}
					>
						Share rate cards
					</Button>
				</div>
			</div>

			<ComparisonTable
				summary={detail}
				LOGO_MAPPING={LOGO_MAPPING}
				mode={mode}
				staticLineItems={STATIC_LINE_ITEMS}
				dynamicLineItems={DYNMAIC_LINE_ITEMS}
			/>

			{showShare ? (
				<ShareToUsers
					rate={{}}
					show={showShare}
					onClose={() => setShowShare(false)}
					shareType="compareRates"
					comparedRateCardDetails={allLineItems}
					source=""
					org_id={detail?.importer_exporter_id}
				/>
			) : null}

			{showContract ? (
				<Contract
					data={selectedCard}
					detail={detail}
					setShow={setShowContract}
					show={showContract}
				/>
			) : null}
		</div>
	);
}

export default Comparison;
