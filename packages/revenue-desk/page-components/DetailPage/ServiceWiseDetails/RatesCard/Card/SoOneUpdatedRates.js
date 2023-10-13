import { Popover } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import ShowLineItems from './ShowLineItems';
import styles from './styles.module.css';

function SoOneUpdatedRates({ data = {}, singleServiceData = {} }) {
	const so1UpdatedLineItems = data?.rowData?.so1_updated_rates?.main_freight || [];
	const so1UpdatedOriginLocalsLineItems = data?.rowData?.so1_updated_rates?.origin_local || [];
	const so1UpdatedDestinationLocalsLineItems = data?.rowData?.so1_updated_rates?.destination_local || [];
	const isDisplaySo1LineItems = !isEmpty([...so1UpdatedLineItems,
		...so1UpdatedOriginLocalsLineItems, ...so1UpdatedDestinationLocalsLineItems]);
	return (
		<div style={{ display: 'flex' }}>
			<div>
				So1 Updated Rate :
			</div>
			<div>
				{isDisplaySo1LineItems ? (
					<Popover
						placement="top"
						trigger="mouseenter"
						className={styles.popover_container}
						render={(
							<ShowLineItems
								serviceType={singleServiceData?.service_type}
								lineItems={so1UpdatedLineItems}
								originLocalLineItems={so1UpdatedOriginLocalsLineItems}
								destinationLocalLineItems={so1UpdatedDestinationLocalsLineItems}
							/>
						)}
					>
						<div
							style={{ textDecoration: 'underline', marginLeft: '6px', cursor: 'pointer' }}
						>
							view more
						</div>
					</Popover>
				) : null}
			</div>

		</div>
	);
}
export default SoOneUpdatedRates;
