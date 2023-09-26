import { Button, Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import SortColumns from './sort-columns';
import styles from './styles.module.css';

const FIRST_INDEX = 1;
export const columns = ({
	handleShowModal,
	filters,
	setFilters,
}) => {
	const logo = ({ name }) => {
		if (name === 'BLPL') {
			return 'blpl';
		}
		if (name === 'Avana') {
			return 'avana';
		}
		return 'image';
	};

	const COLOR_MAPPING = {
		track_new       : '#CDF7D4',
		update_required : '#FFF4D0',
		seen            : '#caf0f8',
	};

	return [
		{
			Header   : <p>SERIAL ID</p>,
			accessor : ({ data }) => (
				<div>
					{`#${data?.serial_id}`}
				</div>
			),
			id: 'serial_id',
		},
		{
			Header   : <p>CONTAINER NO./BL NO</p>,
			accessor : ({ data = {} }) => {
				const { tags = [] } = data;

				const totalFunctionPills = tags.length;
				if (totalFunctionPills <= FIRST_INDEX) {
					(tags || []).map((items) => (
						<Pill
							key={items}
							className={styles.function_head}
							color="red"
						>
							{items}
						</Pill>
					));
				}

				const renderTooltip = tags?.slice(FIRST_INDEX).map((itemd) => (
					<Pill
						key={itemd}
						className={styles.function_head}
						color="red"
					>
						{itemd}
					</Pill>
				));

				return (
					<section>
						<p>{`#${data?.search_value}`}</p>
						<div className={styles.sub_functions_container}>
							{tags[GLOBAL_CONSTANTS.zeroth_index] && (
								<Pill className={styles.function_head} color="red">
									{tags && tags[GLOBAL_CONSTANTS.zeroth_index]}
								</Pill>
							)}

							{totalFunctionPills > FIRST_INDEX && (
								<Tooltip content={renderTooltip} placement="top">
									<strong>
										(+
										{totalFunctionPills - FIRST_INDEX}
										)
									</strong>
								</Tooltip>
							)}

						</div>
					</section>
				);
			},
			id: 'container_no',
		},
		{
			id       : 'company_logo',
			Header   : <p className="shippingline">SHIPPING LINE</p>,
			accessor : (item) => (
				<div className={styles.shipping_line_data}>
					{item?.shipping_line?.logo_url && (
						<img
							className={logo({ name: item?.shipping_line?.short_name })}
							src={item?.shipping_line?.logo_url}
							alt=""
						/>
					)}
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
				<p>
					{formatDate({
						date       : item?.data?.created_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
						formatType : 'date',
					})}
				</p>
			),
		},
		{
			id     : 'updated_at',
			Header : (
				<SortColumns filters={filters} setFilters={setFilters} sortType="updated_at" />
			),
			accessor: (item) => (
				<div>
					<p>
						{formatDate({
							date       : item?.data?.updated_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
							formatType : 'date',
						})}
					</p>
				</div>
			),
		},
		{
			id       : 'container_update',
			Header   : <p>ACTIONS</p>,
			accessor : (item) => (
				<Button onClick={() => handleShowModal(item)} size="sm">
					update
				</Button>
			),
		},
		{
			Header   : <p>LAST UPDATED BY</p>,
			accessor : (item) => <span>{item?.performed_by?.name}</span>,
			id       : 'last_updated_by',
		},
		{
			Header   : <p>STATUS</p>,
			accessor : (item) => {
				let action = '';
				if (item?.data?.action) {
					action = (
						<div>
							{item?.data?.action === 'track_new' ? (
								<Pill color={COLOR_MAPPING[item?.data?.action]}> New</Pill>

							) : (
								''
							)}
							{item?.data?.action === 'update_required' ? (
								<Pill color={COLOR_MAPPING[item?.data?.action]}>Update</Pill>
							) : (
								''
							)}
							{item?.data?.action === 'seen' ? (
								<Pill color={COLOR_MAPPING[item?.data?.action]}>Seen</Pill>
							) : (
								''
							)}
						</div>
					);
				}
				return <span>{action}</span>;
			},

			id: 'actions',
		},
	];
};
