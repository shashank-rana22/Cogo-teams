import { Button, Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import SortColumns from './sort-columns';
import styles from './styles.module.css';

const COLOR_MAPPING = {
	track_new: {
		color : '#CDF7D4',
		label : 'New',
	},
	update_required: {
		color : '#FFF4D0',
		label : 'Update',
	},
	Seen: {
		color : '#caf0f8',
		label : 'Seen',
	},

};

const getColumns = ({
	handleShowModal = () => {},
	setFilters = () => {},
	filters = {},
}) => [
	{
		Header   : <p>Serial ID</p>,
		accessor : ({ data = {} }) => (
			data?.serial_id ? (
				<b>
					{`#${data?.serial_id}`}
				</b>
			) : '--'

		),
		id: 'serial_id',
	},
	{
		Header   : <p>Container No. / BL No.</p>,
		accessor : ({ data = {} }) => {
			const { tags = [] } = data;

			const totalFunctionPills = tags?.length;

			const renderTooltip = () => tags?.slice(2)?.map((tag) => (
				<Pill key={tag}>
					{startCase(tag)}
				</Pill>
			));

			return (
				<section>
					<strong>{`#${data?.search_value}`}</strong>
					<div className={styles.sub_functions_container}>

						{(tags || []).slice(0, 2)?.map((tag) => (
							<Pill key={tag}>
								{startCase(tag)}
							</Pill>
						))}

						{totalFunctionPills > 2 ? (
							<Tooltip content={renderTooltip()} placement="top">
								<Button size="sm" themeType="linkUi">
									{`+${totalFunctionPills - 2} More`}
								</Button>
							</Tooltip>
						) : null}
					</div>
				</section>
			);
		},
		id: 'container_no',
	},
	{
		id       : 'company_logo',
		Header   : 'Shipping Line',
		accessor : (item) => (
			<div className={styles.shipping_line_data}>
				{item?.shipping_line?.logo_url ? (
					<Image
						src={`${item?.shipping_line?.logo_url}`}
						alt=""
						height={40}
						width={40}
					/>
				) : null}
				<div className="title">{item?.shipping_line?.short_name}</div>
			</div>
		),
	},
	{
		id     : 'created_at',
		Header : (
			<SortColumns filters={filters} setFilters={setFilters} sortType="created_at" />
		),
		accessor: (item) => (
			formatDate({
				date       : item?.data?.created_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
				formatType : 'date',
			})

		),
	},
	{
		id     : 'updated_at',
		Header : (
			<SortColumns filters={filters} setFilters={setFilters} sortType="updated_at" />
		),
		accessor: (item) => (
			formatDate({
				date       : item?.data?.updated_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
				formatType : 'date',
			})
		),
	},
	{
		id       : 'container_update',
		Header   : <p>Actions</p>,
		accessor : (item) => (
			<Button onClick={() => handleShowModal(item)} size="sm">
				Update
			</Button>
		),
	},
	{
		Header   : <p>Last Updated By</p>,
		accessor : (item) => <span>{item?.performed_by?.name}</span>,
		id       : 'last_updated_by',
	},
	{
		Header   : <p>Status</p>,
		accessor : (item) => {
			const action = item?.data?.action;

			return action in COLOR_MAPPING ? (
				<Pill color={COLOR_MAPPING[action]?.color}>
					{COLOR_MAPPING[action]?.label}
				</Pill>
			) : action;
		},

		id: 'actions',
	},
];

export default getColumns;
