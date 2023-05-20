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

const iconMapping = {
	ftl_freight: { Icon: IcMFftl, text: 'FTL' },
};

export default function Card({
	item = {}, checkedRows = {}, setCheckedRows = () => {},
	activeTab,
}) {
	const router = useRouter();

	const clickCard = () => {
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${item?.id}`;

		window.sessionStorage.setItem('prev_nav', newUrl);
		window.location.href = newUrl;
	};

	const iconProps = iconMapping[item?.shipment_type];

	return (
		<div
			role="button"
			tabIndex={0}
			className={`${['purchase_invoice', 'proforma_invoice'].includes(activeTab)
				? styles.shipment_card : styles.card}`}
		>

			{['purchase_invoice', 'proforma_invoice'].includes(activeTab) ? <CardHeader item={item} /> : null}
			<div className={styles.card_body}>
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
				<div className={styles.shipment_info}>
					<ShipmentInfo item={item} clickCard={clickCard} />
				</div>

				<div className={styles.separator} />

				{['purchase_invoice', 'proforma_invoice'].includes(activeTab)
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
			{!['purchase_invoice', 'proforma_invoice'].includes(activeTab)
				? (item?.pending_tasks.map((task) => (
					<PendingDocs item={task} key={task.id} clickCard={clickCard} />
				))) : null}
		</div>
	);
}
