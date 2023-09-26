import { Button, cl } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { useState } from 'react';

import DiscountSlabsTable from '../../../List/ListContent/ListItem/DiscountSlabsTable';
import ShipmentSlabsTable from '../../../List/ListContent/ListItem/ShipmentSlabsTable';

import columnsMapping from './columnsMapping';
import styles from './styles.module.css';

const LAST_INDEX = 1;

function Content({ columnDetails = {}, data = {} }) {
	const { label, getValue } = columnDetails || {};

	const value = getValue(data);

	return (
		<div className={`${styles.content_container}`}>

			{label ? <div className={styles.content_title}>{label}</div> : null}
			<div className={cl`${styles.content_value} ${styles[value]}`}>{value}</div>
		</div>
	);
}

const columnsWithValue = ({ data = {}, list = [] }) => {
	const NEW_MAPPING_LIST = [];
	list.forEach((columnDetails) => {
		const { getValue = () => {} } = columnDetails || {};

		const value = getValue(data);

		NEW_MAPPING_LIST.push({
			...(columnDetails || {}),
			value,
		});
	});

	return NEW_MAPPING_LIST;
};

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
					{columnsList.map((columnDetails, index) => {
						const { key } = columnDetails;
						return (
							<div key={key}>
								<Content
									key={key}
									data={data}
									columnDetails={columnDetails}
									isLastItem={index === columnsList.length - LAST_INDEX}
								/>
							</div>
						);
					})}
					{!showCustomConfigForm && (
						<div className={styles.flex_content}>
							<Button
								themeType="secondary"
								size="md"
								style={{
									marginRight: '16px',
								}}
								onClick={() => {
									setViewAndEditConfigData(data);
								}}
							>
								View & Edit
							</Button>
						</div>
					)}
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
				<button
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
				</button>
			</div>
		</div>
	);
}
export default CustomConfigListItem;
