import { Placeholder } from '@cogoport/components';

import Item from './Item';

function ListSupplier({ supplierList, loading }) {
	return (
		<>
			{
                !loading
				&& supplierList?.map((item, index) => (
					<Item
						item={item}
						key={index}
					/>
				))
            }
			{
				loading && [...Array(6)]?.map((index) => (
					<Placeholder
						key={index}
						height="100px"
						width="100%"
						margin="10px 0px 0px  0px"
					/>
				))
			}
		</>
	);
}

export default ListSupplier;
