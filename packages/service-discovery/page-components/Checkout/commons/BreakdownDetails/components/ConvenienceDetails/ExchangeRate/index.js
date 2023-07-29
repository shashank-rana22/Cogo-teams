import { Button } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import Spinner from '../../../../Spinner';
import StyledSelect from '../../../../StyledSelect';

import styles from './styles.module.css';
import useHandleUpdateStage from './useHandleUpdateStage';

const geo = getGeoConstants();

const MAPPING = {
	etd : ['fcl_freight_export'],
	eta : ['fcl_freight_import'],
};

const ROUNDOFF_VALUE = 4;
const FIRST_INDEX = 0;

function ExchangeRate({ conversions, rate, detail, getCheckout }) {
	const { handleUpdateStage, value, loading } = useHandleUpdateStage({
		detail,
		refetch: getCheckout,
	});

	const { primary_service = '', trade_type = '' } = detail || {};

	const { services = {} } = rate;

	const {
		base_currency = '',
		currencies = {},
		cogofx_currencies = {},
		cogofx_supporting_doc = '',
		source_supporting_doc = '',
	} = conversions;

	const main_service = Object.values(services).find(
		(item) => item.service_type === primary_service,
	);

	const { line_items = [] } = main_service || {};

	const currency = (
		(line_items || []).find((item) => item.code === 'BAS')
        || (line_items || []).find((item) => item.currency !== base_currency)
        || line_items[FIRST_INDEX]
	)?.currency || GLOBAL_CONSTANTS.currency_code.USD;

	let currency_conversion = '';

	let supporting_document = '';

	if (currencies?.[currency]) {
		currency_conversion = currencies[currency];
		supporting_document = source_supporting_doc;
	} else {
		currency_conversion = cogofx_currencies?.[currency] || 'N/A';
		supporting_document = cogofx_supporting_doc;
	}

	if (currency === base_currency) {
		currency_conversion = currencies?.USD || cogofx_currencies?.USD || '';
	}

	let options = [];

	if (value === 'liners_exchange_rate') {
		options = [
			{
				label : 'Liner\'s Exchange Rate',
				value : 'liners_exchange_rate',
			},
		];
	} else options = GLOBAL_CONSTANTS.applicable_stage_options;

	return (
		<div className={styles.container}>
			<div className={styles.fx_conversion}>
				FX Rate: 1
				{' '}
				{currency !== base_currency
					? currency
					: GLOBAL_CONSTANTS.currency_code.USD}
				{' '}
				=
				{' '}
				{formatAmount({
					amount: Number(currency_conversion).toFixed(ROUNDOFF_VALUE),
					currency:
							currency !== base_currency
								? base_currency
								: geo.country.currency.code,
					options: {
						style                 : 'currency',
						currencyDisplay       : 'code',
						minimumFractionDigits : 2,
					},
				})}
			</div>

			{value !== 'liners_exchange_rate' ? (
				<Button
					type="button"
					themeType="link"
					style={{ fontSize: '12px', color: '#F68B21' }}
					onClick={() => window.open(supporting_document, '_blank')}
				>
					Supporting Document
				</Button>
			) : null}

			<div className={styles.applicable_stage}>
				<div style={{ marginRight: '12px' }}>Locked at</div>

				<StyledSelect
					defaultValue={value}
					options={options.filter(
						({ value: selectedValue }) => !(
							['eta', 'etd'].includes(selectedValue)
									&& !MAPPING?.[selectedValue].includes(
										`${primary_service}_${trade_type}`,
									)
						),
					)}
					onChange={handleUpdateStage}
				/>
			</div>

			{loading && (
				<Spinner
					size={10}
					borderWidth={1}
					outerBorderColor="#ffffff"
					spinBorderColor="#393f70"
					width="10px"
					height="10px"
				/>
			)}
		</div>
	);
}

export default ExchangeRate;
