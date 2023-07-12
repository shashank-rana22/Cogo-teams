import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

const getColumns = () => [
	{
		Header   : 'Container Type',
		accessor : (item) => startCase(item?.container_type),
		width    : 1,
	},
	{
		Header   : 'Container size',
		accessor : (item) => item?.container_size,
		width    : 1,
	},
	{
		Header   : 'Commodity',
		accessor : (item) => startCase(item?.commodity),
		width    : 2,
	},
	{
		Header   : 'Cargo Value',
		accessor : (item) => (
			<>
				{item?.cargo_value}
				{' '}
				{item?.cargo_value_currency}
			</>
		),
		width: 2,
	},
	{
		Header   : 'Hs Code',
		accessor : (item) => (
			<div
				style={{
					maxWidth     : 200,
					whiteSpace   : 'nowrap',
					overflow     : 'hidden',
					textOverflow : 'ellipsis',
					marginLeft   : 4,
				}}
			>
				{item?.hs_code?.hsCode ? (
					<Tooltip content={item?.hs_code?.description}>
						{item?.hs_code?.hsCode}
						:
						{item?.hs_code?.description}
					</Tooltip>
				) : (
					'---'
				)}
			</div>
		),
		width: 2,
	},
	{
		Header   : 'Commercial Invoice',
		accessor : (item) => (
			<div
				role="presentation"
				style={{
					textDecoration : item?.commercial_invoice_url ? 'underline' : 'none',
					cursor         : 'pointer',
				}}
				onClick={() => docDownloader(item?.commercial_invoice_url)}
			>
				{item?.commercial_invoice_url ? 'Download Commercial Invoice' : '---'}
			</div>
		),
		width: 2,
	},
];

export default getColumns;
