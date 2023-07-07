import Item from './Item';

function ListSupplier({ supplierList, loading }) {
	return (
		<div>
			{
                !loading
				&& supplierList?.map((item) => (
					<Item item={item} key={item} />
				))
            }
		</div>
	);
}

export default ListSupplier;
