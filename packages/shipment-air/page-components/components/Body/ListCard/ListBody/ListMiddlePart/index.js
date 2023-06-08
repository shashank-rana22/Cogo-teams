import SERVICE_ICON_MAPPINGS from '../../../../../constants/service-icon-mapping';

import styles from './styles.module.css';

function ListMiddlePart({ item }) {
	const { shipment_type = '' } = item;
	console.log(item, 'item');

	const { icon = '', text = '' } = SERVICE_ICON_MAPPINGS[shipment_type];

	return (
		<div className={styles.list_middle_part}>
			<div className={styles.service_icon}>
				{icon}
				{text}

			</div>
			<div>Heelo1</div>
		</div>
	);
}
export default ListMiddlePart;
