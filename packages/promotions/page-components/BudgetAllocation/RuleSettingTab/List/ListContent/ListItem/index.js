import { Button, Pill } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { useState } from 'react';

import DiscountSlabsTable from '../../../../../../common/DiscountSlabsTable';
import RowContent from '../../../../../../common/RowContent';
import ShipmentSlabsTable from '../../../../../../common/ShipmentSlabsTable';
import UpdateModal from '../../../../../../common/UpdateModal';
import columnsWithValue from '../../../../../../helpers/getColumnMappingList';
import useUpdatePromotionRule from '../../../../../../hooks/useUpdatePromotionRule';

import columnsMapping from './columnsMapping';
import styles from './styles.module.css';
import tagsMapping from './tagsMapping';

function ListItem({
	data = {},
	loading = '',
	activeList = '',
	refetchList = () => {},
	setViewAndEditRuleId = () => {},
}) {
	const [open, setOpen] = useState(false);
	const [showDeactivateModal, setShowDeactivateModal] = useState(false);
	const tagsList = columnsWithValue({ data, list: tagsMapping });
	const columnsList = columnsWithValue({ data, list: columnsMapping });
	const { onUpdateAgentRule = () => {} } = useUpdatePromotionRule({ refetch: refetchList });

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
					{columnsList.map((columnDetails) => {
						const { key } = columnDetails;
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
					<div className={styles.flex_content}>
						<Button
							themeType="secondary"
							size="md"
							className={styles.btn}
							onClick={() => {
								setViewAndEditRuleId(data?.id);
							}}
						>
							View & Edit
						</Button>
						{activeList === 'active' ? (
							<Button
								themeType="secondary"
								size="md"
								className={styles.btn}
								onClick={() => {
									setShowDeactivateModal(true);
								}}
							>
								Deactivate
							</Button>
						) : null}
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
							{data?.scope === 'shipment'
								? 'Slabs Details'
								: 'Discount Configuration'}
						</div>
						<div className={styles.block}>
							{data?.scope === 'shipment'
								? <ShipmentSlabsTable slabsDetailData={data?.slab_configs} loading={loading} />
								: <DiscountSlabsTable slabsDetailData={data?.discount_config} loading={loading} />}
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
				{showDeactivateModal ? (
					<UpdateModal
						onClose={() => setShowDeactivateModal(false)}
						onClickYes={() => {
							onUpdateAgentRule({
								data: {
									id     : data.id,
									status : 'inactive',
								},
							});
							setShowDeactivateModal(false);
						}}
						show={showDeactivateModal}
					/>
				) : null}
			</div>
		</div>
	);
}
export default ListItem;
