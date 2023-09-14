import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const INDEX_LENGTH_NORMALIZATION = 1;
const MIN_LENGTH = 2;

const getCardDataMapping = ({ t = () => {} }) => ([
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
	{
		key   : 'segments',
		label : t('allocation:segments'),
	},
]);

function OrganizationDetailsCard(props) {
	const { t } = useTranslation(['allocation']);

	const { organizationDetails } = props;

	const cardDataMapping = getCardDataMapping({ t });

	return (
		<div className={styles.container}>
			<h4 className={styles.heading}>{t('allocation:organization_details')}</h4>

			<div className={styles.card}>
				{(cardDataMapping || []).map((item) => {
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
