import { Pill } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const getCardDataMapping = ({ t = () => {} }) => [
	{
		key   : 'country',
		label : t('allocation:country'),
	},
	{
		key   : 'state',
		label : t('allocation:state'),
	},
	{
		key   : 'city',
		label : t('allocation:city'),
	},
	{
		key   : 'pincode',
		label : t('allocation:pincode'),
	},
];

function OrganizationDetailsCard(props) {
	const { t } = useTranslation(['allocation']);

	const cardDataMapping = getCardDataMapping({ t });

	const { organizationDetails } = props;

	return (
		<div className={styles.container}>
			<h4 className={styles.heading}>{t('allocation:organization_details')}</h4>

			<div className={styles.card}>
				{(cardDataMapping || []).map((item) => {
					const { key, label } = item;

					const locationItem = organizationDetails[key];

					return (
						<div key={key} className={styles.label_value_cotainer}>
							<div className={styles.label}>
								{label}
								:
							</div>

							{isEmpty(locationItem) ? (
								<div className={styles.not_found}>
									{t('allocation:not_found_label')}
								</div>
							) : (
								<div className={styles.pills}>
									{(locationItem || []).map((location) => (
										<Pill
											size="md"
											key={location?.id}
										>
											{location?.name || '--'}
										</Pill>
									))}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default OrganizationDetailsCard;
