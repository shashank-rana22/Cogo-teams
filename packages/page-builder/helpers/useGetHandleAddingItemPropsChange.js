import { useCallback } from 'react';

const useGetHandleAddingItemPropsChange = ({ setNewAddingItemProps, newAddingItemProps }) => {
	const handleNewAddingItemPropsChange = useCallback(
		(updatedProps) => {
			setNewAddingItemProps({
				...newAddingItemProps,
				...updatedProps,
			});
		},
		[setNewAddingItemProps, newAddingItemProps],
	);

	return { handleNewAddingItemPropsChange };
};

export default useGetHandleAddingItemPropsChange;
