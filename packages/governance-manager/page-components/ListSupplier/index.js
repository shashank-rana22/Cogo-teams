import Item from './Item';

function ListSupplier({ supplierList, loading }) {
	return (
		<>
			{
                !loading
				&& supplierList?.map((item) => (
					<Item item={item} />
				))
            }
		</>
	);
}

export default ListSupplier;
