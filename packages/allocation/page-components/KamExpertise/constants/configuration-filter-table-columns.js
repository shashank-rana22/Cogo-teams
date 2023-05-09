import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from
	'../components/ExpertiseConfigurations/CurrentConfigurations/Header/ModalComponents/Published/styles.module.css';

const CONFIGURATION_FILTER_TABLE_COLUMNS = [
	{
		Header   : 'VERSION NAME',
		key      : 'version_number',
		id       : 'version_number',
		accessor : 'version_number',
		Cell     : ({ value }) => (
			<section>
				Version
				{' '}
				{value || ''}
			</section>
		),
	},
	{
		Header   : 'STATUS',
		accessor : 'status',
		Cell     : ({ value }) => {
			const colors = value === 'live' ? 'green' : 'red';
			return (
				<span>
					<Pill className={styles.pill} color={colors}>{value || ''}</Pill>
				</span>
			);
		},

	},
	{
		Header   : 'LAST UPDATED',
		accessor : 'audit_data',
		Cell     : ({ value }) => (
			<section>
				{value?.updated_at ? formatDate({
					date       : value.updated_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd-MM-yyyy'],
					formatType : 'date',
				}) : ''}

			</section>
		),
	},

];

export default CONFIGURATION_FILTER_TABLE_COLUMNS;
