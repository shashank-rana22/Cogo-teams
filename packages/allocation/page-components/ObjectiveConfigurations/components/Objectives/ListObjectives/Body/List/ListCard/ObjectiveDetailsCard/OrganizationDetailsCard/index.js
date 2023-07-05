import { Pill } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function OrganizationDetailsCard(props) {
	const { organizationDetails } = props;
	const { countries, states, cities, pincodes } = organizationDetails;

	const CARD_DATA_MAPPING = [
		{
			key   : 'countries',
			label : 'Country',
			value : (
				// eslint-disable-next-line react/jsx-no-useless-fragment
				<>
					{!isEmpty(countries) && countries.map((country) => (
						<Pill key={country.id}>
							{country.name}
						</Pill>
					))}
				</>
			),
		},
		{
			key   : 'states',
			label : 'State',
			value : (
				// eslint-disable-next-line react/jsx-no-useless-fragment
				<>
					{!isEmpty(states) && states.map((state) => (
						<Pill key={state.id}>{state.name}</Pill>
					))}
				</>
			),
		},
		{
			key   : 'cities',
			label : 'City',
			value : (
				// eslint-disable-next-line react/jsx-no-useless-fragment
				<>
					{!isEmpty(cities) && cities.map((city) => (
						<Pill key={city.id}>{city.name}</Pill>
					))}
				</>
			),
		},
		{
			key   : 'pincodes',
			label : 'Pincode',
			value : (
				// eslint-disable-next-line react/jsx-no-useless-fragment
				<>
					{!isEmpty(pincodes) && pincodes.map((pincode) => (
						<Pill key={pincode.id}>{pincode.name}</Pill>
					))}
				</>
			),
		},
	];

	return (
		<div className={styles.container}>
			<h4 className={styles.heading}>Organization Details</h4>

			<div className={styles.card}>
				{CARD_DATA_MAPPING.map((item) => {
					const { key, label, value } = item;

					if (isEmpty(organizationDetails[key])) return null;

					return (
						<div key={key} className={styles.label_value_cotainer}>
							<div className={styles.label}>
								{label}
								:
							</div>
							<div>{value}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default OrganizationDetailsCard;
