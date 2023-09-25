import { Button, cl, Pill } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { useState } from 'react';

import DeactiveModal from '../../../../../../common/DeactiveModal';
import useDeactivePromotionRule from '../../../../../../hooks/useDeactivePromotionRule';

import columnsMapping from './columnsMapping';
import DiscountSlabsTable from './DiscountSlabsTable';
import ShipmentSlabsTable from './ShipmentSlabsTable';
import styles from './styles.module.css';
import tagsMapping from './tagsMapping';

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

function ListItem({
	data = {},
	loading = '',
	activeList = '',
	onEdit = () => {},
	refetchList = () => {},
}) {
	const [open, setOpen] = useState(false);
	const [showDeactivateModal, setShowDeactivateModal] = useState(false);
	const tagsList = columnsWithValue({ data, list: tagsMapping });
	const columnsList = columnsWithValue({ data, list: columnsMapping });

	const { onClickDeactivate = () => {} } = useDeactivePromotionRule({ data, refetchList });

	return (
		<div className={styles.container}>
			<div className={styles.upper}>
				<div className={styles.tags_list}>
					{tagsList.map((tabsDetails) => {
						const { key, value } = tabsDetails || {};
						return (
							<div
								key={key}
								className={styles.tags_row}
							>
								{value ? <Pill size="md" color="green">{value}</Pill> : null }
							</div>
						);
					})}
				</div>
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
					<div className={styles.flex_content}>
						<Button
							themeType="secondary"
							size="md"
							style={{
								marginRight: '16px',
							}}
							onClick={onEdit}
						>
							View & Edit
						</Button>
						{activeList === 'active' && (
							<Button
								themeType="secondary"
								size="md"
								style={{
									marginRight: '16px',
								}}
								onClick={() => {
									setShowDeactivateModal(true);
								}}
							>
								Deactivate
							</Button>
						)}
					</div>
				</div>

			</div>
			<div className={styles.lower}>
				{open ? (
					<div
						className={styles.layout_container}
						key={data.cogo_entity_id}
					>
						<div className={styles.heading}>
							Slabs Details
						</div>
						<div className={styles.block}>
							{data?.scope === 'shipment'
								? <ShipmentSlabsTable slabsDetailData={data?.slab_configs} loading={loading} />
								: <DiscountSlabsTable slabsDetailData={data?.slab_configs} loading={loading} />}
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
				{showDeactivateModal && (
					<DeactiveModal
						onClose={() => setShowDeactivateModal(false)}
						onClickYes={() => {
							onClickDeactivate();
							setShowDeactivateModal(false);
						}}
					/>
				)}
			</div>
		</div>
	);
}
export default ListItem;
