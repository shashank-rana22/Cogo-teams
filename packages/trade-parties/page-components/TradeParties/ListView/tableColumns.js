import { Button, Pill, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { Link } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const formatArrayValues = (items = {}, is_startcase = true) => {
	const formattedItem = items?.map((item) => (is_startcase ? startCase(item) : item));
	return formattedItem.join(', ') || '';
};
const getCompanyType = (company) => startCase(company);
const tableColumns = [
	{
		Header   : 'ID',
		accessor : (item) => (
			<Pill className={styles.serial_id}>{`# ${item?.serial_id}`}</Pill>
		),
	},
	{
		Header   : 'BUSINESS NAME',
		accessor : (item) => (
			<Popover placement="bottom" trigger="mouseenter" caret={false} render={item?.legal_business_name}>
				<div className={styles.heading}>{item?.legal_business_name}</div>
			</Popover>
		),
	},
	{
		Header   : 'REGISTRATION NUMBER',
		accessor : (item) => item?.registration_number,
	},
	{
		Header   : 'COMPANY TYPE',
		accessor : (item) => getCompanyType(item?.company_type),
	},
	{
		Header   : 'CREATED AT',
		accessor : (item) => formatDate({
			date       : item?.created_at,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		}),
	},
	{
		Header   : 'LINKED COUNT',
		accessor : (item) => (
			<div>
				{item?.organization_trade_parties_count}
				{item?.all_trade_party_types?.length ? (
					<span style={{ marginLeft: 4 }}>
						(
						{formatArrayValues(item?.all_trade_party_types)}
						)
					</span>
				) : null}
			</div>
		),
	},
	{
		Header   : 'DETAILS',
		accessor : (item) => (
			<Link href="/trade-parties/[trade_party_id]" as={`/trade-parties/${item.id}`}>
				<Button size="md" themeType="secondary">
					View details
				</Button>
			</Link>
		),
	},

];
export default tableColumns;
