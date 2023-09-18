import useDeleteWeightSlabs from '../../../hooks/useDeleteWeightSlabs';

import fclColumns from './fcl-freight-slabs';

const useGetColumns = ({ setShowModal = () => {}, refetch = () => {} }) => {
	const { deleteWeightSlabs = () => {} } = useDeleteWeightSlabs({ refetch });
	const handleAction = (item) => {
		setShowModal({ ...item, isEdit: true });
	};
	const handleDeleteRecord = (item) => {
		deleteWeightSlabs(item);
	};

	const columnsWeightSlabs = fclColumns({
		handleAction,
		handleDeleteRecord,
	});

	return columnsWeightSlabs;
};

export default useGetColumns;
