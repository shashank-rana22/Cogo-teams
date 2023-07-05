import { Pill } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const CARD_DATA_MAPPING = [
	{
		key   : 'countries',
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

							<div className={styles.pills}>
								{locationItem.map((location) => (
									<Pill
										size="md"
										key={location.id}
									>
										{location.name}
									</Pill>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default OrganizationDetailsCard;
