import { forwardRef } from 'react';

import Header from './Header';
import ListAgents from './ListAgents';
import styles from './styles.module.css';
import useGetObjectiveAgentsMapping from './useGetObjectiveAgentsMapping';

const List = forwardRef((props, ref) => {
	const { setActiveMode } = props;

	const setRefCallback = (value) => {
		const tempRef = ref;
		tempRef.current.container = value;
	};

	const {
		list,
		loading,
		refetch,
		paginationData,
		getNextPage,
		setParams,
	} = useGetObjectiveAgentsMapping();

	return (
		<section className={styles.container}>
			<Header
				setParams={setParams}
			/>

			<ListAgents
				ref={ref}
				setActiveMode={setActiveMode}
				list={list}
				loading={loading}
				refetch={refetch}
				paginationData={paginationData}
				getNextPage={getNextPage}
				setRefCallback={setRefCallback}
			/>
		</section>
	);
});

export default List;
