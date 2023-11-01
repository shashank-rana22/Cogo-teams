import { Tabs, TabPanel } from '@cogoport/components';
import { useEffect, useMemo, useState } from 'react';

import {
	generalGoods,
	specialGoods,
	DEFAULT_VALUE,
} from '../../../../../../../page-components/SearchResults/configurations/ftl/commodity-options';
import Layout from '../../../../../../Layout';

import styles from './styles.module.css';

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
