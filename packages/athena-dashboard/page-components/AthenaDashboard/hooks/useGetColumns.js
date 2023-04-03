import { ResponsiveLine } from '@cogoport/charts/line/index';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

const useGetColumns = ({ columnsToShow = [] }) => {
	const {
		general:{
			locale,
		},
	} = useSelector((state) => state);

	const columns = [
		{
			Header   : 'Shipment Record ID',
			accessor : (item) => item.shipment_record_id,
			key      : 'shipment_record_id',
		},
		{
			Header   : 'Importer Lead ID',
			accessor : (item) => item.importer_lead_id,
			key      : 'importer_lead_id',
		},
		{
			Header   : 'Exporter Lead ID',
			accessor : (item) => item.exporter_lead_id,
			key      : 'exporter_lead_id',
		},
		{
			Header   : 'Shipment Mode',
			accessor : (item) => item.shipment_mode,
			key      : 'shipment_mode',
		},
		{
			Header   : 'Incoterm',
			accessor : (item) => item.incoterm,
			key      : 'incoterm',
		},
		{
			Header   : 'Origin Port',
			accessor : (item) => item.origin_port,
			key      : 'origin_port',
		},
		{
			Header   : 'Origin Country',
			accessor : (item) => item.origin_country,
			key      : 'origin_country',
		},
		{
			Header   : 'Destination Port',
			accessor : (item) => item.destination_port,
			key      : 'destination_port',
		},
		{
			Header   : 'Destination Country',
			accessor : (item) => item.destination_country,
			key      : 'destination_country',
		},
		{
			Header   : 'Shipment Date',
			accessor : (item) => item.shipment_date,
			key      : 'shipment_date',
		},
		{
			Header   : 'Shipment Value',
			accessor : (item) => item.shipment_value,
			key      : 'shipment_value',
		},
		{
			Header   : 'Importer Lead Segment',
			accessor : (item) => item.importer_lead_segment,
			key      : 'importer_lead_segment',
		},
		{
			Header   : 'Exporter Lead Segment',
			accessor : (item) => item.exporter_lead_segment,
			key      : 'exporter_lead_segment',
		},
		{
			Header   : 'HS Code',
			accessor : (item) => (item.hscodes || []).map((i) => `[${i.toString()}]`).join(', '),
			key      : 'hscodes',
		},
		{
			Header   : 'HS CODE',
			accessor : (item) => item.hs_code,
			key      : 'hs_code',
		},
		{
			Header   : 'Description',
			accessor : (item) => item.category,
			key      : 'description',
		},
		{
			Header   : 'Country',
			accessor : (item) => item.country,
			key      : 'country',
		},
		{
			Header   : 'Share',
			accessor : (item) => `${item.percent_share.toFixed(2)}%`,
			key      : 'share',
		},
		{
			Header   : 'Trend',
			accessor : (item) => (
				<div style={{ height: '50px', width: '70px' }}>
					<ResponsiveLine data={[
						{
							id   : item.country,
							data : [
								{
									x : 'January',
									y : item.January || 0,
								},
								{
									x : 'February',
									y : item.February || 0,
								},
								{
									x : 'March',
									y : item.March || 0,
								},
								{
									x : 'April',
									y : item.April || 0,
								},
								{
									x : 'May',
									y : item.May || 0,
								},
								{
									x : 'June',
									y : item.June || 0,
								},
								{
									x : 'July',
									y : item.July || 0,
								},
								{
									x : 'August',
									y : item.August || 0,
								},
								{
									x : 'September',
									y : item.September || 0,
								},
								{
									x : 'October',
									y : item.October || 0,
								},
								{
									x : 'November',
									y : item.November || 0,
								},
								{
									x : 'December',
									y : item.December || 0,
								},

							],
						},
					]}
					/>
				</div>
			),
			key: 'trend',
		},
		{
			Header   : 'Jan',
			accessor : (item) => ((!isEmpty(item.January)) ? item.January.toLocaleString(locale) : 0),
			key      : 'jan',
		},
		{
			Header   : 'Feb',
			accessor : (item) => ((!isEmpty(item.February)) ? item.February.toLocaleString(locale) : 0),
			key      : 'feb',
		},
		{
			Header   : 'Mar',
			accessor : (item) => ((!isEmpty(item.March)) ? item.March.toLocaleString(locale) : 0),
			key      : 'mar',
		},
		{
			Header   : 'Apr',
			accessor : (item) => ((!isEmpty(item.April)) ? item.April.toLocaleString(locale) : 0),
			key      : 'apr',
		},
		{
			Header   : 'May',
			accessor : (item) => ((!isEmpty(item.May)) ? item.May.toLocaleString(locale) : 0),
			key      : 'may',
		},
		{
			Header   : 'Jun',
			accessor : (item) => ((!isEmpty(item.June)) ? item.June.toLocaleString(locale) : 0),
			key      : 'jun',
		},
		{
			Header   : 'July',
			accessor : (item) => ((!isEmpty(item.July)) ? item.July.toLocaleString(locale) : 0),
			key      : 'july',
		},
		{
			Header   : 'Aug',
			accessor : (item) => ((!isEmpty(item.August)) ? item.August.toLocaleString(locale) : 0),
			key      : 'aug',
		},
		{
			Header   : 'Sept',
			accessor : (item) => ((!isEmpty(item.September)) ? item.September.toLocaleString(locale) : 0),
			key      : 'sept',
		},
		{
			Header   : 'Oct',
			accessor : (item) => ((!isEmpty(item.October)) ? item.October.toLocaleString(locale) : 0),
			key      : 'oct',
		},
		{
			Header   : 'Nov',
			accessor : (item) => ((!isEmpty(item.November)) ? item.November.toLocaleString(locale) : 0),
			key      : 'nov',
		},
		{
			Header   : 'Dec',
			accessor : (item) => ((!isEmpty(item.December)) ? item.December.toLocaleString(locale) : 0),
			key      : 'dec',
		},
	];

	const finalColumns = [];

	columnsToShow.forEach((item) => {
		const column = columns.find((col) => col.key === item);
		finalColumns.push(column);
	});

	return finalColumns;
};
export default useGetColumns;
