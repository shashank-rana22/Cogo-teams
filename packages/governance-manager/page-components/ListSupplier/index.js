/* eslint-disable no-magic-numbers */
import { Placeholder } from '@cogoport/components';

import Item from './Item';

function ListSupplier({ supplierList, loading }) {
	return (
		<div>
			{
                !loading
				&& supplierList?.map((item) => (
					<Item
						item={item}
						key={item}
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
		</div>
	);
}

export default ListSupplier;
