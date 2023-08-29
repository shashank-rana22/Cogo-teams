/* eslint-disable max-lines-per-function */
import { ResponsiveLine } from '@cogoport/charts/line/index';
import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';

const SECOND_INDEX = 2;

const useGetColumns = ({ columnsToShow = [], t = () => {} }) => {
	const columns = [
		{
			Header   : t('athenaDashboard:shipment_record_id'),
			accessor : (item) => item?.shipment_record_id || '--',
			key      : 'shipment_record_id',
		},
		{
			Header   : t('athenaDashboard:importer_lead_id'),
			accessor : (item) => item?.importer_lead_id || '--',
			key      : 'importer_lead_id',
		},
		{
			Header   : t('athenaDashboard:exporter_lead_id'),
			accessor : (item) => item?.exporter_lead_id || '--',
			key      : 'exporter_lead_id',
		},
		{
			Header   : t('athenaDashboard:shipment_mode'),
			accessor : (item) => item?.shipment_mode || '--',
			key      : 'shipment_mode',
		},
		{
			Header   : t('athenaDashboard:incoterm'),
			accessor : (item) => item?.incoterm || '--',
			key      : 'incoterm',
		},
		{
			Header   : t('athenaDashboard:origin_port'),
			accessor : (item) => item?.origin_port || '--',
			key      : 'origin_port',
		},
		{
			Header   : t('athenaDashboard:origin_country'),
			accessor : (item) => item?.origin_country || '--',
			key      : 'origin_country',
		},
		{
			Header   : t('athenaDashboard:destination_port'),
			accessor : (item) => item?.destination_port || '--',
			key      : 'destination_port',
		},
		{
			Header   : t('athenaDashboard:destination_country'),
			accessor : (item) => item?.destination_country || '--',
			key      : 'destination_country',
		},
		{
			Header   : t('athenaDashboard:shipment_date'),
			accessor : (item) => item?.shipment_date || '--',
			key      : 'shipment_date',
		},
		{
			Header   : t('athenaDashboard:shipment_value'),
			accessor : (item) => item?.shipment_value || '--',
			key      : 'shipment_value',
		},
		{
			Header   : t('athenaDashboard:importer_lead_segment'),
			accessor : (item) => item?.importer_lead_segment || '--',
			key      : 'importer_lead_segment',
		},
		{
			Header   : t('athenaDashboard:exporter_lead_segment'),
			accessor : (item) => item?.exporter_lead_segment || '--',
			key      : 'exporter_lead_segment',
		},
		{
			Header   : t('athenaDashboard:hscodes'),
			accessor : (item) => (
				<div style={{ width: '200px' }}>
					<Tooltip
						content={(
							<div style={{ wordBreak: 'break-word' }}>
								{(item.hscodes || []).map((hsCode) => `${hsCode}, `) || '--'}
							</div>
						)}
						placement="top"
					>
						{(item.hscodes || []).map((hsCode) => `[${hsCode}], `)}
					</Tooltip>
				</div>
			),
			key: 'hscodes',
		},
		{
			Header   : t('athenaDashboard:hs_code'),
			accessor : (item) => item?.hs_code || '--',
			key      : 'hs_code',
		},
		{
			Header   : t('athenaDashboard:description'),
			accessor : (item) => item?.category || '--',
			key      : 'description',
		},
		{
			Header   : t('athenaDashboard:country'),
			accessor : (item) => item?.country || '--',
			key      : 'country',
		},
		{
			Header   : t('athenaDashboard:share'),
			accessor : (item) => `${item?.percent_share.toFixed(SECOND_INDEX)}%` || '--',
			key      : 'share',
		},
		{
			Header   : t('athenaDashboard:trend'),
			accessor : (item) => (
				<div style={{ height: '50px', width: '70px' }}>
					<ResponsiveLine data={[
						{
							id   : item?.country || '--',
							data : [
								{
									x : t('athenaDashboard:january'),
									y : item?.January || GLOBAL_CONSTANTS.zeroth_index,
								},
								{
									x : t('athenaDashboard:february'),
									y : item?.February || GLOBAL_CONSTANTS.zeroth_index,
								},
								{
									x : t('athenaDashboard:march'),
									y : item?.March || GLOBAL_CONSTANTS.zeroth_index,
								},
								{
									x : t('athenaDashboard:april'),
									y : item?.April || GLOBAL_CONSTANTS.zeroth_index,
								},
								{
									x : t('athenaDashboard:may'),
									y : item?.May || GLOBAL_CONSTANTS.zeroth_index,
								},
								{
									x : t('athenaDashboard:june'),
									y : item?.June || GLOBAL_CONSTANTS.zeroth_index,
								},
								{
									x : t('athenaDashboard:july'),
									y : item?.July || GLOBAL_CONSTANTS.zeroth_index,
								},
								{
									x : t('athenaDashboard:august'),
									y : item?.August || GLOBAL_CONSTANTS.zeroth_index,
								},
								{
									x : t('athenaDashboard:september'),
									y : item?.September || GLOBAL_CONSTANTS.zeroth_index,
								},
								{
									x : t('athenaDashboard:october'),
									y : item?.October || GLOBAL_CONSTANTS.zeroth_index,
								},
								{
									x : t('athenaDashboard:november'),
									y : item?.November || GLOBAL_CONSTANTS.zeroth_index,
								},
								{
									x : t('athenaDashboard:december'),
									y : item?.December || GLOBAL_CONSTANTS.zeroth_index,
								},

							],
						},
					]}
					/>
				</div>
			),
			key: 'trend',
		},
		{
			Header   : t('athenaDashboard:january_short_label'),
			accessor : (item) => ((!isEmpty(item.January)) ? formatAmount({
				amount   : item.January,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
			}) : GLOBAL_CONSTANTS.zeroth_index),
			key: 'jan',
		},
		{
			Header   : t('athenaDashboard:february_short_label'),
			accessor : (item) => ((!isEmpty(item.February)) ? formatAmount({
				amount   : item.February,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
			}) : GLOBAL_CONSTANTS.zeroth_index),
			key: 'feb',
		},
		{
			Header   : t('athenaDashboard:march_short_label'),
			accessor : (item) => ((!isEmpty(item.March)) ? formatAmount({
				amount   : item.March,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
			}) : GLOBAL_CONSTANTS.zeroth_index),
			key: 'mar',
		},
		{
			Header   : t('athenaDashboard:april_short_label'),
			accessor : (item) => ((!isEmpty(item.April)) ? formatAmount({
				amount   : item.April,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
			}) : GLOBAL_CONSTANTS.zeroth_index),
			key: 'apr',
		},
		{
			Header   : t('athenaDashboard:may_short_label'),
			accessor : (item) => ((!isEmpty(item.May)) ? formatAmount({
				amount   : item.May,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
			}) : GLOBAL_CONSTANTS.zeroth_index),
			key: 'may',
		},
		{
			Header   : t('athenaDashboard:june_short_label'),
			accessor : (item) => ((!isEmpty(item.June)) ? formatAmount({
				amount   : item.June,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
			}) : GLOBAL_CONSTANTS.zeroth_index),
			key: 'jun',
		},
		{
			Header   : t('athenaDashboard:july_short_label'),
			accessor : (item) => ((!isEmpty(item.July)) ? formatAmount({
				amount   : item.July,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
			}) : GLOBAL_CONSTANTS.zeroth_index),
			key: 'july',
		},
		{
			Header   : t('athenaDashboard:august_short_label'),
			accessor : (item) => ((!isEmpty(item.August)) ? formatAmount({
				amount   : item.August,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
			}) : GLOBAL_CONSTANTS.zeroth_index),
			key: 'aug',
		},
		{
			Header   : t('athenaDashboard:september_short_label'),
			accessor : (item) => ((!isEmpty(item.September)) ? formatAmount({
				amount   : item.September,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
			}) : GLOBAL_CONSTANTS.zeroth_index),
			key: 'sept',
		},
		{
			Header   : t('athenaDashboard:october_short_label'),
			accessor : (item) => ((!isEmpty(item.October)) ? formatAmount({
				amount   : item.October,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
			}) : GLOBAL_CONSTANTS.zeroth_index),
			key: 'oct',
		},
		{
			Header   : t('athenaDashboard:november_short_label'),
			accessor : (item) => ((!isEmpty(item.November)) ? formatAmount({
				amount   : item.November,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
			}) : GLOBAL_CONSTANTS.zeroth_index),
			key: 'nov',
		},
		{
			Header   : t('athenaDashboard:december_short_label'),
			accessor : (item) => ((!isEmpty(item.December)) ? formatAmount({
				amount   : item.December,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
			}) : GLOBAL_CONSTANTS.zeroth_index),
			key: 'dec',
		},
	];

	const FINAL_COLUMNS = [];

	columnsToShow.forEach((item) => {
		const column = columns.find((col) => col.key === item);
		FINAL_COLUMNS.push(column);
	});

	return FINAL_COLUMNS;
};
export default useGetColumns;
