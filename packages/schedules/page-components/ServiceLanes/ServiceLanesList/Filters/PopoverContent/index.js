import { Button, Select } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations, asyncFieldsOperators } from '@cogoport/forms/utils/getAsyncFields';
import { IcMPortArrow } from '@cogoport/icons-react';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function PopoverContent({ setFilters }) {
	const originPortOptions = useGetAsyncOptions(
		merge(asyncFieldsLocations(), {
			params: { filters: { type: ['seaport'] } },
		}),
	);

	const destinationPortOptions = useGetAsyncOptions(
		merge(asyncFieldsLocations(), {
			params: { filters: { type: ['seaport'] } },
		}),
	);
	const shippingLineOptions = useGetAsyncOptions(merge(
		asyncFieldsOperators(),
		{ params: { filters: { operator_type: 'shipping_line' } } },
	));
	const [popoverFilters, setPopoverFilters] = useState({});

	const handleApply = () => {
		setFilters((prev) => ({ ...prev, ...popoverFilters }));
	};

	const handlePopoverFilter = (value, type) => {
		setPopoverFilters((prev) => ({ ...prev, [type]: value, page: 1 }));
	};
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.heading}>
					Filters
				</div>
				<Button
					size="xl"
					themeType="accent"
					styles={{ height: '40px' }}
					onClick={handleApply}
				>
					Apply
				</Button>
			</div>

			<hr width="200px" className={styles.hr_line} />
			<div>
				<div className={styles.label}>
					Shipping Line
				</div>
				<Select
					className={styles.filter_select}
					{...shippingLineOptions}
					placeholder="Shipping Line"
					value={popoverFilters?.shipping_line_id}
					onChange={(value) => handlePopoverFilter(value, 'shipping_line_id')}
				/>
			</div>
			<div className={styles.port_pair}>
				<div className={styles.label}>
					Port Pair Search
				</div>
				<div className={styles.pairs}>
					<Select
						className={styles.filter_select}
						{...originPortOptions}
						placeholder="Origin Port"
						value={popoverFilters?.origin_port_id}
						onChange={(value) => handlePopoverFilter(value, 'origin_port_id')}
					/>
					<IcMPortArrow />
					<Select
						className={styles.filter_select}
						{...destinationPortOptions}
						placeholder="Destination Port"
						value={popoverFilters?.destination_port_id}
						onChange={(value) => handlePopoverFilter(value, 'destination_port_id')}
					/>
				</div>
			</div>
		</div>
	);
}

export default PopoverContent;
