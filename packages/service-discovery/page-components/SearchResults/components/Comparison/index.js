import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import ShareToUsers from '../../common/ShareToUsers';

import ComparisonTable from './ComparisonTable';
import styles from './styles.module.css';

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

function HandleBookValue({ item, apiLoading }) {
	const router = useRouter();

	const handleLockPrice = () => {};

	const handleBook = () => {
		router.push(`/book/${router.query.spot_search_id}?rate_card_id=${item?.id}`);
	};

	return (
		<div className={styles.book_buttons}>
			<Button
				size="md"
				themeType="secondary"
				disabled={apiLoading}
				style={{ marginBottom: '8px' }}
				onClick={handleLockPrice}
			>
				Lock for 24 Hours
			</Button>

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

const getStaticLineItems = (item, mode, summary) => {
	const keys = Object.keys(STATIC_COMPARISON_KEY[mode || 'default']);
	const otherComparisonKeys = keys.map((key) => {
		const comparisonKey = {
			code : key,
			name : STATIC_COMPARISON_KEY[mode || 'default'][key],
		};

		const createValueObject = (value) => ({ ...comparisonKey, value });

		const getFreeDaysValue = (detention, demurrage) => `Detention: ${detention?.free_limit || 0}, Demurrage: ${
			demurrage?.free_limit || 0
		}`;

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
						// apiLoading={apiLoading}
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
	}));

	return flattenedLineItems;
};

function Comparison({
	detail = {},
	setScreen = () => {},
	mode = 'fcl_freight',
	comparisonRates = {},
}) {
	const selectedCards = Object.values(comparisonRates);

	const LOGO_MAPPING = {};

	const [showShare, setShowShare] = useState(false);

	const allLineItems = selectedCards.map((cardItem) => {
		const { service_rates = [], shipping_line = {}, source } = cardItem;

		const services = Object.values(service_rates);

		const lineItems = services.flatMap((service) => service?.line_items).filter((item) => item !== undefined);

		const staticComparisonKeys = getStaticLineItems(
			cardItem,
			mode,
			detail,
		);

		const flattenedArraylineItems = getDyanmicLineItems(lineItems);

		const finalArray = flattenedArraylineItems.concat(staticComparisonKeys);

		const logo = source === 'cogo_assured_rate'
			? GLOBAL_CONSTANTS.image_url.cogo_assured_banner : shipping_line.logo_url;

		LOGO_MAPPING[toSnakeCase(shipping_line.short_name)] = logo;

		return {
			[toSnakeCase(shipping_line.short_name)]: finalArray,
		};
	});

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
						Share
					</Button>

					<Button
						onClick={() => {}}
						size="md"
						themeType="accent"
						className={styles.button}
						style={{ padding: '20px' }}
					>
						Create Quotation
					</Button>
				</div>
			</div>

			<ComparisonTable
				summary={detail}
				allLineItems={allLineItems}
				LOGO_MAPPING={LOGO_MAPPING}
			/>

			{showShare ? (
				<ShareToUsers
					rate={[]}
					show={showShare}
					onClose={() => setShowShare(false)}
					source="spot_search"
					org_id={detail?.importer_exporter_id}
				/>
			) : null}
		</div>
	);
}

export default Comparison;
