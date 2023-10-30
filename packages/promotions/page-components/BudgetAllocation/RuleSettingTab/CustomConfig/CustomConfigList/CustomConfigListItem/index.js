import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { useState } from 'react';

import DiscountSlabsTable from '../../../../../../common/DiscountSlabsTable';
import RowContent from '../../../../../../common/RowContent';
import ShipmentSlabsTable from '../../../../../../common/ShipmentSlabsTable';
import columnsWithValue from '../../../../../../helpers/getColumnMappingList';

import columnsMapping from './columnsMapping';
import styles from './styles.module.css';

function CustomConfigListItem({
	data = {},
	type = '',
	showCustomConfigForm = {},
	setViewAndEditConfigData = () => {},
}) {
	const [open, setOpen] = useState(false);
	const columnsList = columnsWithValue({ data, list: columnsMapping });

	return (
		<div className={styles.container}>
			<div className={styles.upper}>
				<div className={styles.grid_row}>
					{columnsList.map((columnDetails) => {
						const { key } = columnDetails || {};
						return (
							<div key={key}>
								<RowContent
									key={key}
									data={data}
									columnDetails={columnDetails}
								/>
							</div>
						);
					})}
					{!showCustomConfigForm ? (
						<div className={styles.flex_content}>
							<Button
								themeType="secondary"
								size="md"
								className={styles.btn}
								onClick={() => {
									setViewAndEditConfigData(data);
								}}
							>
								View & Edit
							</Button>
						</div>
					) : null}
				</div>

			</div>
			<div className={styles.lower}>
				{open ? (
					<div
						className={styles.layout_container}
						key={data.cogo_entity_id}
					>
						<div className={styles.heading}>
							{type === 'shipment'
								? 'Slabs Details'
								: 'Discount Configuration'}
						</div>
						<div className={styles.block}>
							{type === 'shipment'
								? <ShipmentSlabsTable slabsDetailData={data?.slab_configs} />
								: <DiscountSlabsTable slabsDetailData={data?.discount_config} />}
						</div>
					</div>
				) : null }
				<Button
					themeType="linkUi"
					className={styles.accordion_container}
					onClick={() => setOpen(!open)}
				>
					{open ? (
						<>
							Hide Details
							<IcMArrowRotateUp />
						</>
					) : (
						<>
							View Details
							<IcMArrowRotateDown />
						</>
					)}
				</Button>
			</div>
		</div>
	);
}
export default CustomConfigListItem;
