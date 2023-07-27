import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const INDEX_LENGTH_NORMALIZATION = 1;
const MIN_LENGTH = 2;

const CARD_DATA_MAPPING = [
	{
		key   : 'country',
		label : 'Country',
	},
	{
		key   : 'states',
		label : 'State',
	},
	{
		key   : 'cities',
		label : 'City',
	},
	{
		key   : 'pincodes',
		label : 'Pincode',
	},
	{
		key   : 'segments',
		label : 'Segment',
	},
];

function OrganizationDetailsCard(props) {
	const { organizationDetails } = props;

	return (
		<div className={styles.container}>
			<h4 className={styles.heading}>Organization Details</h4>

			<div className={styles.card}>
				{CARD_DATA_MAPPING.map((item) => {
					const { key, label } = item;

					const locationItem = organizationDetails[key];

					if (isEmpty(locationItem)) return null;

					return (
						<div key={key} className={styles.label_value_cotainer}>
							<div className={styles.label}>
								{label}
								:
							</div>

							<Tooltip content={(
								<div className={styles.tooltip_content}>
									{locationItem.map((location, index) => (
										<div key={location.name}>
											{index + INDEX_LENGTH_NORMALIZATION}
											.
											{' '}
											{location.name || startCase(location) || null}
										</div>
									))}
								</div>
							)}
							>
								<div className={styles.tooltip_child}>
									{locationItem.slice(GLOBAL_CONSTANTS.zeroth_index, MIN_LENGTH).map((location) => (
										<Pill
											className={styles.pill}
											size="md"
											key={location.id}
										>
											{location.name || startCase(location) || null}
										</Pill>
									))}
									{locationItem.length > MIN_LENGTH && (
										<span>
											+
											{locationItem.length - MIN_LENGTH}
										</span>
									)}
								</div>
							</Tooltip>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default OrganizationDetailsCard;
