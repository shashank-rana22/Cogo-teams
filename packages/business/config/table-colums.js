import { Tooltip, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { upperCase } from '@cogoport/utils';

import AddressCard from '../page-components/AddressCard';
import styles from '../page-components/Business/styles.module.css';
import ToolTipContent from '../page-components/ToolTipContent';

const TEN = 10;
const columns = [
	{
		Header   : 'Indentity Type',
		accessor : (item) => upperCase(item.identity_type),
	}, {
		Header   : 'Identity number',
		accessor : 'identity_number',
	},
	{
		Header   : 'Registration',
		accessor : 'registration_number',
	},
	{
		Header   : 'Iec Numbers',
		accessor : ({ iec_numbers = [] }) => (
			<section>
				<ToolTipContent content={iec_numbers} />
			</section>
		),
	},
	{
		Header   : 'Tax Numbers',
		accessor : ({ tax_numbers = [] }) => (
			<section>
				<ToolTipContent content={tax_numbers} />
			</section>
		),
	},
	{
		Header   : 'Business Name',
		accessor : ({ business_name = '' }) => (
			<section>
				<Tooltip content={business_name}>
					{business_name.slice(GLOBAL_CONSTANTS.zeroth_index, TEN)}
					..
				</Tooltip>
			</section>
		),

	}, {
		Header   : 'Country',
		accessor : 'country_code',
	}, {
		Header   : 'Status',
		accessor : ({ status }) => <Pill color={status === 'active' ? 'green' : 'red'}>{upperCase(status)}</Pill>,
	}, {
		Header   : 'Establishment',
		accessor : 'establishment_year',
	}, {
		Header   : 'Addresses',
		accessor : ({ addresses = [] }) => {
			const renderTooltip = addresses.map((item) => (
				<div
					key={item?.address}
				>
					<AddressCard addresses={item} />
				</div>
			));

			return (

				<div className={styles.address_column}>

					<Tooltip content={renderTooltip} placement="top">
						<div>
							<AddressCard addresses={addresses[GLOBAL_CONSTANTS.zeroth_index]} />
						</div>
					</Tooltip>

				</div>

			);
		},
	},
	{
		Header   : 'Created at',
		accessor : (item) => formatDate({
			date       : item?.created_at,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		}),
	}];

export default columns;
