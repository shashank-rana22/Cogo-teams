import { Checkbox, Button, Pill } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { REGISTRATION_MAPPING, REGISTRATION_TYPE_INDEX, LIFECYCLE_STAGE } from '../../helpers/constants';

import styles from './styles.module.css';

const getLeadInfoColumns = ({
	selectAll = false,
	onChangeTableHeadCheckbox = () => {},
	checkedRowsId = [],
	onChangeBodyCheckbox = () => {},
	setLeadId = () => {},
	setAllocationLeadId = () => {},
}) => [
	{
		id     : 'checkbox',
		key    : 'checkbox',
		Header : <Checkbox
			checked={selectAll}
			onChange={(event) => onChangeTableHeadCheckbox(event)}
		/>,
		accessor: ({ id = '' }) => (
			<Checkbox
				checked={checkedRowsId.includes(id)}
				onChange={(event) => onChangeBodyCheckbox(event, id)}
			/>
		),
	},
	{
		Header   : 'BUSINESS NAME',
		key      : 'business_name',
		id       : 'business_name',
		accessor : ({ business_name }) => (
			<section className={styles.table_cell}>
				{startCase(business_name || '___')}
			</section>
		),
	},
	{
		Header   : 'TRADE NAME',
		key      : 'trade_name',
		id       : 'trade_name',
		accessor : ({ trade_name }) => (
			<section className={styles.table_cell}>
				{startCase(trade_name || '___')}
			</section>
		),
	},
	{
		Header   : 'PAN',
		key      : 'pan',
		id       : 'pan',
		accessor : ({ registration_number }) => (
			<section className={styles.table_cell}>
				{registration_number || '___'}
			</section>
		),
	},
	{
		Header   : 'LIFECYCLE STAGE',
		key      : 'platform_lifecycle_stage',
		id       : 'platform_lifecycle_stage',
		accessor : ({ platform_lifecycle_stage }) => {
			const { color, label } = LIFECYCLE_STAGE[platform_lifecycle_stage] || { label: platform_lifecycle_stage };
			return (
				<div className={styles.table_cell}>
					<Pill
						size="md"
						color={color}
					>
						{label}
					</Pill>
				</div>
			);
		},
	},
	{
		Header   : 'TYPE',
		key      : 'services',
		id       : 'services',
		accessor : ({ services }) => (
			<section className={styles.table_cell}>
				{startCase(services || '___') }
			</section>
		),
	},
	{
		Header   : 'SEGMENT',
		key      : 'segment',
		id       : 'segment',
		accessor : ({ segment }) => (
			<section className={styles.table_cell}>
				{startCase(segment || '___') }
			</section>
		),
	},
	{
		Header   : 'COMPANY TYPE',
		key      : 'registration_type',
		id       : 'registration_type',
		accessor : ({ registration_number }) => {
			const company_type = registration_number
				? REGISTRATION_MAPPING[registration_number[REGISTRATION_TYPE_INDEX]] : '__';
			return (
				<section className={styles.table_cell}>
					{startCase(company_type || '___') }
				</section>
			);
		},
	},
	{
		Header   : 'OBJECTIVES',
		key      : 'objectives',
		id       : 'objectives',
		accessor : ({ id }) => (
			<section className={styles.objectives}>
				<Button onClick={() => { setAllocationLeadId(id); }} themeType="secondary">
					<IcMEyeopen style={{ marginRight: '4px' }} />
					View
				</Button>
			</section>
		),
	},
	{
		Header   : 'SHIPMENT COUNT',
		key      : 'shipment_count',
		id       : 'shipment_count',
		accessor : ({
			shipment_count,
		}) => (
			<section className={styles.table_cell}>
				{startCase(shipment_count || '___') }
			</section>
		),
	},
	{
		Header   : 'TRADE ENRICHMENT',
		key      : 'trade_enrichment',
		id       : 'trade_enrichment',
		accessor : ({ shipment_modes }) => (
			<section className={styles.enrich}>
				{shipment_modes ? (
					<Pill
						size="md"
						color="blue"
						style={{ width: '30%' }}
					>
						{shipment_modes}
					</Pill>
				) : '__'}
			</section>
		),
	},
	{
		Header   : 'ENRICHMENT HISTORY',
		key      : 'enrichment_history',
		id       : 'enrichment_history',
		accessor : ({ id }) => (
			<section className={styles.objectives}>
				<Button onClick={() => { setLeadId(id); }} themeType="secondary">
					<IcMEyeopen style={{ marginRight: '4px' }} />
					View
				</Button>
			</section>
		),
	},
];

export default getLeadInfoColumns;
