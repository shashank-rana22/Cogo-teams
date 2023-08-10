import { Chips, Button } from '@cogoport/components';
import {
	FREIGHT_CONTAINER_COMMODITY_MAPPINGS,
	COMMODITY_NAME_MAPPING,
} from '@cogoport/globalization/constants/commodities';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty, upperCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import { ContainerSizeOptions, CommodityTypeOptions, INCO_TERM_MAPPING } from '../utils/options_list';

import styles from './styles.module.css';

const formatCommodity = (commodity_type) => {
	const newValue = commodity_type.replaceAll('_', ' ');
	return upperCase(newValue);
};
function BookingParams({ filter, setFilter }) {
	const [commodityOptions, setCommodityOptions] = useState([]);
	const [incoOptions, setIncoOptions] = useState([]);
	useEffect(() => {
		if (!isEmpty(filter?.commodity_type)) {
			const list = FREIGHT_CONTAINER_COMMODITY_MAPPINGS?.[filter?.commodity_type];

			const newList = (list || []).map((item) => {
				const { name, ...rest } = COMMODITY_NAME_MAPPING?.[item] || {};
				return { key: item, ...rest, children: name };
			});
			setCommodityOptions(newList);
		}
		setIncoOptions(() => (INCO_TERM_MAPPING?.[filter?.trade_type] || []).map((inco) => ({
			key      : inco,
			children : upperCase(inco || ''),
			disabled : false,
			suffix   : null,
			tooltip  : false,
		})));
	}, [filter]);

	const onItemChange = (val) => {
		setFilter((prev) => ({ ...prev, container_size: val }));
	};
	const onCommodityChange = (val) => {
		setFilter((prev) => ({ ...prev, commodity_type: val }));
	};
	const onSetCommodity = (val) => {
		setFilter((prev) => ({ ...prev, commodity_item: val }));
	};
	const resetCommoodity = () => {
		setFilter((prev) => ({ ...prev, commodity_type: '', commodity_item: '' }));
	};
	const setIncoTerm = (val) => {
		setFilter((prev) => ({ ...prev, inco_term: val }));
	};

	return (
		<div>
			<div className={styles.outerContainer}>Booking Parameters</div>
			<div className={styles.container}>
				<div className={styles.label}>
					Container Size
				</div>
				<div className={styles.pillsContainer}>
					<Chips
						size="md"
						selectedItems={filter?.container_size}
						items={ContainerSizeOptions}
						onItemChange={onItemChange}
					/>
				</div>
				{isEmpty(filter?.commodity_type) ? (
					<>
						<div className={styles.label}>
							Commodity Type
						</div>
						<div className={styles.pillsContainer}>
							<Chips
								size="md"
								selectedItems={filter?.commodity_type}
								items={CommodityTypeOptions}
								onItemChange={onCommodityChange}
							/>
						</div>
					</>
				) : (
					<>
						<div className={styles.commodity_label}>
							<Button themeType="linkUi" size="sm" onClick={() => resetCommoodity()}>
								<IcMArrowBack />
							</Button>
							<div className={styles.commodity_text}>{formatCommodity(filter?.commodity_type)}</div>
							{' '}
							/ Select Commodity
						</div>
						<div className={styles.pillsContainer}>
							<Chips
								size="md"
								selectedItems={filter?.commodity_item}
								items={commodityOptions}
								onItemChange={onSetCommodity}
							/>
						</div>
					</>
				)}
				<div className={styles.label}>
					IncoTerm
				</div>
				<div className={styles.pillsContainer}>
					<Chips
						size="md"
						selectedItems={filter?.inco_term}
						items={incoOptions}
						onItemChange={setIncoTerm}
					/>
				</div>
			</div>
		</div>
	);
}

export default BookingParams;
