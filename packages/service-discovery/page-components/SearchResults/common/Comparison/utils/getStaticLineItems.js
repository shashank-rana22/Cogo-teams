import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import formatAmountValue from './formatAmountValue';
import formatDateValue from './formatDateValue';

const COUNT_IN_CASE_OF_MULTICONTAINER = 1;
const DEFAULT_FREE_DAYS_VALUE = 0;

const SCHEDULE_TYPE_MAPPING = {
	transshipment : 'Trans-shipment',
	direct        : 'Direct-shipment',
};

const STATIC_COMPARISON_KEY = {
	fcl_freight: {
		bls_count             : 'BL Count',
		total_landed_price    : 'Total Landed Cost',
		schedule_type         : 'Schedule Type',
		free_origin_days      : 'Free Origin days',
		free_destination_days : 'Free Destination days',
		validity_end          : 'Estimated Departure ',
		book_and_lock         : '',
	},
	air_freight: {
		validity_end       : 'Estimated Departure ',
		total_landed_price : 'Total Landed Cost',
		book_and_lock      : '',
	},
};

function HandleBookValue({
	item = {},
	apiLoading = false,
	service_type = '',
	setSelectedCard = () => {},
	setShowContract = () => {},
}) {
	const router = useRouter();

	const service_rates = Object.values(item.service_rates);
	const primaryServiceRates = service_rates.filter(
		(service) => service.service_type === service_type,
	);

	const isCogoAssured = item.source === 'cogo_assured_rate';

	const isMultiContainer = primaryServiceRates.length > COUNT_IN_CASE_OF_MULTICONTAINER;

	const handleLockPrice = () => {
		setShowContract(true);
		setSelectedCard(item);
	};

	const handleBook = () => {
		router.push(`/book/${router.query.spot_search_id}?rate_card_id=${item?.id}`);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
	const { source = '', schedules = {} } = item || {};

	const { validity_start = '', validity_end = '' } = schedules || {};

	const keys = Object.keys(STATIC_COMPARISON_KEY[mode] || {}) || [];

	const otherComparisonKeys = keys.map((key) => {
		const comparisonKey = {
			code : key,
			name : STATIC_COMPARISON_KEY[mode]?.[key],
		};

		const createValueObject = (value) => ({ ...comparisonKey, value });

		const getFreeDaysValue = (detention, demurrage) => `Detention: ${detention?.free_limit
			|| DEFAULT_FREE_DAYS_VALUE}, Demurrage: ${demurrage?.free_limit
			|| DEFAULT_FREE_DAYS_VALUE}`;

		const keyHandlers = {
			bls_count     : () => createValueObject(summary.bls_count),
			schedule_type : () => createValueObject(
				source === 'cogo_assured_rate' ? '-' : SCHEDULE_TYPE_MAPPING[item.schedule_type],
			),
			total_landed_price: () => createValueObject(
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
				source === 'cogo_assured_rate'
					? `${formatDateValue(validity_start)} - ${formatDateValue(validity_end)}`
					: formatDateValue(item.schedules?.departure || item.schedules?.validity_end),

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
				name : STATIC_COMPARISON_KEY[mode]?.[key],
			}),
		};

		const keyHandler = keyHandlers[key] || keyHandlers.default;
		return keyHandler();
	});

	return otherComparisonKeys;
};

export default getStaticLineItems;
