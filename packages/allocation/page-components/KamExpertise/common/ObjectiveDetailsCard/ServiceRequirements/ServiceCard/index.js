import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import getDisplayDetails from '../../../../utils/get-display-details';

import styles from './styles.module.css';

const FIRST_INDEX = 0;
const SECOND_INDEX = 1;

function ServiceCard(props) {
	const {
		index,
		item = {},
		operator = 'AND',
	} = props;

	const {
		shipment_mode = '',
		service_type = '',
		trade_type = '',
		inco_terms = [],
		origin_location = [],
		destination_location = [],
	} = item;

	const displayDetails = getDisplayDetails({ shipment_mode, details: item });

	const showComma = (idx, arr = []) => {
		if (idx === (arr.length - SECOND_INDEX)) {
			return false;
		}
		return true;
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading_container}>
				{index !== FIRST_INDEX && (
					<Pill
						size="md"
						color="orange"
						className={styles.operator}
					>
						{(operator || '').toUpperCase()}
					</Pill>
				)}

			</div>

			<div className={styles.key_value_container}>
				{/* <div className={styles.label}>
					Shipment Mode:
				</div> */}
				<div className={styles.sub_title}>
					{startCase(shipment_mode) || '--'}
					,
					{' '}
					{startCase(service_type)}
					,
					{' '}
					{startCase(trade_type)}
				</div>
			</div>

			{!isEmpty(inco_terms) ? (
				<div className={styles.key_value_container}>
					<div className={styles.label}>
						Incoterm:
					</div>
					<div className={styles.value_container}>
						{(inco_terms || []).map((value, i) => ` ${value.toUpperCase()}
							${showComma(i, inco_terms) ? ', ' : ''}`)}
					</div>
				</div>
			) : null}

			<div className={styles.key_value_container}>
				<div className={styles.label}>
					Container Details:
				</div>
				<div className={styles.value_container}>
					{(displayDetails || []).map((it) => (
						<Pill key={it}>
							{it || '--'}
						</Pill>
					))}
				</div>
			</div>

			{!isEmpty(origin_location) && !isEmpty(destination_location) ? (
				<div className={styles.origin_dest_container}>
					<div className={styles.origin_dest}>
						<div className={styles.label}>
							Origin(s):
						</div>
						<Pill>
							{origin_location[GLOBAL_CONSTANTS.zeroth_index]?.name}
						</Pill>
					</div>
					<div className={styles.origin_dest}>
						<div className={styles.label}>
							Destination(s):
						</div>
						<Pill>
							{destination_location[GLOBAL_CONSTANTS.zeroth_index]?.name}
						</Pill>
					</div>
				</div>
			) : null}
			{/* {!isEmpty(destination_location) ? (
			) : null} */}
		</div>
	);
}

export default ServiceCard;
