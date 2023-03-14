import Select from '@cogo/business-modules/form/components/Controlled/SelectController';
import { CommodityContainer } from './styles';

const tableColumn = ({ fields }) => {
	return [
		{
			Header: 'Sr.No',
			accessor: (item) => item?.serial_no,
			id: 'serial_no',
		},
		{
			Header: 'Container Number',
			accessor: (item) => item?.container_number,
			id: 'container_number',
		},
		{
			Header: 'Container Size',
			accessor: (item) => item?.container_size,
			id: 'container_size',
		},
		{
			Header: 'Commodity',
			accessor: (item, index) => {
				const name = `is_hazardous-${index + 1}`;
				const newFields = fields[name];
				return (
					<CommodityContainer>
						{newFields ? <Select {...newFields} /> : null}
					</CommodityContainer>
				);
			},
			id: 'commodity',
		},
	];
};

export default tableColumn;
