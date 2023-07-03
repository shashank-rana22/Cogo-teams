import Item from './Item';

function ListSupplier() {
	return (
		<>
			{
                [0, 0, 0, 0, 0, 0].map((item) => (<Item />))
            }
		</>
	);
}

export default ListSupplier;
