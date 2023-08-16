import { Select, Button, Popover, Pill } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import BookingParams from '../BookingParams';
import useCreateRDAutomationParameters from '../hooks/useCreateRDAutomationParameters';

import styles from './styles.module.css';

const tradeOptions = [
	{ label: 'Import', value: 'import' },
	{ label: 'Export', value: 'export' },
];
const serviceOptions = [
	{ label: 'FCL Freight', value: 'fcl_freight' },
];
const booking_params_list = ['container_size', 'commodity_type', 'commodity_item', 'inco_term'];
function FilterLayout() {
	const [filter, setFilter] = useState({ service_type: 'fcl_freight' });
	const [enable, setEnable] = useState(false);
	const [allBookingParamsEmpty, setAllBookingParamsEmpty] = useState(true);
	const { apiTrigger } = useCreateRDAutomationParameters({ filter });

	const onResetFilter = () => setFilter({ service_type: 'fcl_freight' });
	useEffect(() => {
		const isEnabled = !isEmpty(filter?.trade_type)
		&& !isEmpty(filter?.service_type);
		setEnable(isEnabled);
		let emptyBookingParams = true;
		booking_params_list.forEach((item) => {
			if (!isEmpty(filter?.[item])) emptyBookingParams = false;
			return null;
		});
		setAllBookingParamsEmpty(emptyBookingParams);
	}, [filter]);

	const onChange = (item, key) => {
		setFilter((prev) => ({ ...prev, [key]: item }));
	};
	const getFormattedContent = (val) => {
		if (!val) return '';
		const str = val.replace(/_/g, ' ');
		return str.toUpperCase();
	};
	return (
		<div className={styles.filter}>
			<div className={styles.fieldContainer}>
				<div>
					<Select
						placeholder="Service Type"
						options={serviceOptions}
						value={filter?.service_type}
						onChange={(val) => onChange(val, 'service_type')}
						size="sm"
						style={{ width: '150px' }}
					/>
				</div>
				<div>
					<Select
						placeholder="Trade Type"
						options={tradeOptions}
						value={filter?.trade_type}
						onChange={(val) => onChange(val, 'trade_type')}
						size="sm"
						style={{ width: '140px' }}
					/>
				</div>
				<div>
					<Select
						placeholder="Customer Segment"
						options={[{ label: 'FCL Freight', value: 'fcl_freight' }]}
						value={filter?.customer_segment}
						onChange={(val) => onChange(val, 'customer_segment')}
						size="sm"
						style={{ width: '200px' }}
					/>
				</div>
			</div>

			{enable ? (
				<div className={styles.popover}>
					<Popover
						placement="bottom"
						style={{ minWidth: '320px !important' }}
						render={<BookingParams filter={filter} setFilter={setFilter} />}
					>
						<Button
							themeType="secondary"
							className="grouped_filter_button"
							size="sm"
							disabled={isEmpty(filter?.trade_type)}
						>
							<div>
								{allBookingParamsEmpty ? (
									<div className={styles.booking_label}>
										Booking Parameters
										{' '}
										<IcMArrowDown style={{ marginLeft: '10px' }} width="16px" height="16px" />
									</div>
								) : (
									<div>
										{booking_params_list.map((item) => (filter?.[item] ? (
											<Pill color="#c6ffbf" key={item}>
												{getFormattedContent(filter?.[item])}
											</Pill>
										) : null))}
									</div>
								)}

							</div>
						</Button>
					</Popover>
				</div>
			) : null}
			<div className={styles.buttonContainer}>
				<Button
					themeType="accent"
					size="sm"
					disabled={isEmpty(filter?.trade_type)}
					onClick={apiTrigger}
				>
					Apply Changes
				</Button>
				<Button
					themeType="secondary"
					size="sm"
					onClick={onResetFilter}
				>
					Reset Filters
				</Button>
			</div>
		</div>
	);
}

export default FilterLayout;
