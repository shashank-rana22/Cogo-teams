import { Tabs, TabPanel } from '@cogoport/components';
import { useEffect, useMemo, useState } from 'react';

import Layout from '../../../../../../Layout';

import styles from './styles.module.css';

const generalGoods = [
	{
		label : 'All Commodities',
		value : 'all',
	},
	{
		label : 'FMCG',
		value : 'fmcg',
	},
	{
		label : 'FMCG Consumer Durables',
		value : 'fmcg_consumer_durables',
	},
	{
		label : 'Consumer Durables',
		value : 'consumer_durables',
	},
	{
		label : 'Consumer Durables Equipments',
		value : 'consumer_durables_equipments',
	},
	{
		label : 'Consumer Durables Equipments Machinery',
		value : 'consumer_durables_equipments_machinery',
	},
	{
		label : 'Equipments Plant Machinery',
		value : 'equipments_plant_machinery',
	},
];

const specialGoods = [
	{
		label : 'Gases 2.1',
		value : 'gases-2.1',
	},
	{
		label : 'Gases 2.2',
		value : 'gases-2.2',
	},
	{
		label : 'Gases 2.3',
		value : 'gases-2.3',
	},
	{
		label : 'Flammable Liquids 3',
		value : 'flammable_liquids-3',
	},
	{
		label : 'Flammable Solids 4.1',
		value : 'flammable_solids-4.1',
	},
	{
		label : 'Flammable Solids Self Heat 4.2',
		value : 'flammable_solids_self_heat-4.2',
	},
	{
		label : 'IMO Classes 5.1',
		value : 'imo_classes-5.1',
	},
	{
		label : 'Toxic Substances 6.1',
		value : 'toxic_substances-6.1',
	},
	{
		label : 'Infectious Substances 6.2',
		value : 'infectious_substances-6.2',
	},
	{
		label : 'Radioactive Material 7',
		value : 'radioactive_material-7',
	},
	{
		label : 'Corrosives 8',
		value : 'corrosives-8',
	},
	{
		label : 'Miscellaneous Dangerous Goods 9',
		value : 'miscellaneous_dangerous_goods-9',
	},
];

const DEFAULT_VALUE = {
	general_cargo         : 'all',
	special_consideration : 'gases-2.1',
};

function CommodityControl({
	control = () => {},
	errors = {},
	commodity_type = '',
	loadType = '',
	setValue = () => {},
}) {
	const [activeCommodityType, setActiveCommodityType] = useState(commodity_type || 'general_cargo');

	const COMMODITY_CONTROL = useMemo(() => [{
		name    : 'commodity',
		type    : 'select',
		options : activeCommodityType === 'general_cargo' ? generalGoods : specialGoods,
		span    : 12,
		value   : DEFAULT_VALUE[activeCommodityType],
		rules   : { required: 'Commodity is required' },
	}], [activeCommodityType]);

	useEffect(() => {
		setActiveCommodityType(commodity_type || 'general_cargo');
	}, [commodity_type, loadType]);

	return (
		<>
			<span className={styles.label}>Commodity</span>

			<div className={styles.toggle}>
				<Tabs
					activeTab={activeCommodityType}
					themeType="tertiary"
					onChange={(val) => {
						setActiveCommodityType(val);
						setValue('commodity', '');
					}}
				>
					<TabPanel name="general_cargo" title="General Cargo" />

					<TabPanel name="special_consideration" title="Special Consideration" />
				</Tabs>
			</div>

			<Layout
				controls={COMMODITY_CONTROL}
				control={control}
				errors={errors}
				key={activeCommodityType}
			/>
		</>
	);
}

export default CommodityControl;
