import { Pill } from '@cogoport/components';
import { format } from '@cogoport/utils';

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
			<section>{value?.updated_at ? format(value?.updated_at, 'dd-MM-YYYY') : ''}</section>
		),
	},

];

export default CONFIGURATION_FILTER_TABLE_COLUMNS;
