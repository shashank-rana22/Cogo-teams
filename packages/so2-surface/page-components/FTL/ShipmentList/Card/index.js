import { Checkbox } from '@cogoport/components';
import { IcMFftl } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import CardHeader from './CardHeader';
import CargoPills from './CargoPills';
import EstimatedDates from './EstimatedDates';
import LocationDetails from './LocationDetails';
import PendingDocs from './PendingDocs';
import ShipmentInfo from './ShipmentInfo';
import styles from './styles.module.css';

const ICON_MAPPING = {
	ftl_freight: { Icon: IcMFftl, text: 'FTL' },
};

const SHIPMENT_TYPES = {
	ftl_freight: 'ftl',
};
const INVOICE_TYPES = ['purchase_invoice', 'proforma_invoice'];
export default function Card({
	item = {}, checkedRows = {}, setCheckedRows = () => {},
	activeTab = '',
	isSelectable = false,
}) {
	const router = useRouter();
	const { shipment_type = '' } = item || {};

	const clickCard = () => {
		let newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${item?.id}`;
		if (shipment_type in SHIPMENT_TYPES) {
			newUrl = `${window.location.origin}/v2/${router?.query?.partner_id}/booking/${
				SHIPMENT_TYPES[shipment_type]}/${item?.id}`;
		}
		newUrl = `${newUrl}?navigation=coe-so2_surface`;

		window.sessionStorage.setItem('prev_nav', newUrl);
		window.location.href = newUrl;
	};

	const iconProps = ICON_MAPPING[item?.shipment_type];

	return (
		<div
			className={`${INVOICE_TYPES.includes(activeTab)
				? styles.shipment_card : styles.card}`}
		>

			{INVOICE_TYPES.includes(activeTab) ? <CardHeader item={item} /> : null}
			<div className={styles.card_body}>
				{isSelectable && (
					<Checkbox
						label=""
						checked={checkedRows.has(item.id)}
						onChange={() => {
							const tempCheckRows = new Set(checkedRows);
							if (tempCheckRows.has(item?.id)) {
								tempCheckRows.delete(item?.id);
							} else { tempCheckRows.add(item?.id); }
							setCheckedRows(tempCheckRows);
						}}
					/>
				)}
				<div className={styles.shipment_info}>
					<ShipmentInfo item={item} clickCard={clickCard} />
				</div>

				<div className={styles.separator} />

				{INVOICE_TYPES.includes(activeTab)
					? (
						<div className={styles.location_container}>
							<LocationDetails data={item} icon={iconProps} />
						</div>
					)
					: (
						<div className={styles.eta_etd_container}>
							<EstimatedDates data={item} />
						</div>
					)}

				<div className={styles.separator} />

				<div className={styles.cargo_pill}>
					<CargoPills item={item} />
				</div>

			</div>
			{!!isSelectable && !INVOICE_TYPES.includes(activeTab)
				? (item?.pending_tasks?.map((task) => (
					<PendingDocs item={task} key={task.id} clickCard={clickCard} />
				))) : null}
		</div>
	);
}
