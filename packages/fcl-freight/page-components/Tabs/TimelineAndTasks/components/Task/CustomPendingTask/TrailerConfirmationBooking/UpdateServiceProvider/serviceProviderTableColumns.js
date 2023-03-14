import formatDate from '@cogo/globalization/utils/formatDate';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import { DocumentType } from './styles';

export const serviceProviderTableColumns = ({ shipment_data }) => [
	{
		label: 'Service Provider',
		render: (item) => (
			<DocumentType>
				{item?.service_provider_name
					? item.service_provider_name
					: 'Service Provider'}
			</DocumentType>
		),
		span: 3,
	},
	{
		label: 'User Name',
		render: (item) => (
			<DocumentType>
				{item?.user_name ? item.user_name : ' User Name'}
			</DocumentType>
		),
		span: 2,
	},
	{
		label: 'Contact Number',
		render: (item) => (
			<DocumentType>
				{item?.user_contact ? item.user_contact : 'Contacr Number'}
			</DocumentType>
		),
		span: 2,
	},
	{
		label: 'Source of Rate',
		render: (item) => (
			<DocumentType>
				{item?.last_updated_at
					? formatDate({
							date: item.last_updated_at,
							dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType: 'date',
					  })
					: '-'}
			</DocumentType>
		),
		span: 2,
	},
	{
		label: `Buy Rate (Per ${
			shipment_data?.shipment_type === 'ftl_freight' ? 'Truck' : 'Trailer'
		})`,
		render: (item) => <DocumentType>{item.buy_rate}</DocumentType>,
		span: 2,
	},
];
