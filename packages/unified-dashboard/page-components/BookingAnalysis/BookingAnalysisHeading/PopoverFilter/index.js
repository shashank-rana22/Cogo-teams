import { Button, Popover } from '@cogoport/components';
import { IcMFilter, IcCRedCircle } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import Filters from './Filters';
import styles from './styles.module.css';

function PopoverFilter({
	loading, setParams, params,
}) {
	const [popoverVisible, setPopoverVisible] = useState(false);
	const [isFilterApplied, setIsFilterApplied] = useState(false);

	const closePopover = () => {
		setPopoverVisible(false);
	};

	useEffect(() => {
		if (params.shipment_type.length !== 12 || params.trade_type.length !== 4) {
			setIsFilterApplied(true);
		} else {
			setIsFilterApplied(false);
		}
	}, [params]);

	return (
		<div className={styles.popover}>
			<Popover
				animation="perspective"
				content={(
					<Filters
						loading={loading}
						closePopover={closePopover}
						setParams={setParams}
						params={params}
					/>
				)}
				trigger="click"
				placement="bottom"
				visible={popoverVisible}
			>

				<Button
					onClick={() => setPopoverVisible(!popoverVisible)}
					className={styles.filter_btn}
					themeType="secondary"

				>
					<div className={styles.flex_filter}>
						<span className={styles.filter_btn}>Filter by</span>
						<IcMFilter />

					</div>
					{isFilterApplied && <IcCRedCircle className={styles.filter_dot} />}
				</Button>

			</Popover>
		</div>
	);
}

export default PopoverFilter;
