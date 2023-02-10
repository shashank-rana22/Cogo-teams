import useListAllocationDetails from '../../../hooks/useListAllocationDetails';

import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function Details() {
	const {
		list,
		loading,
		listRefetch,
		paginationData,
		getNextPage,
		params,
		setParams,
		partner_id,
		locale,
	} = useListAllocationDetails();

	return (
		<section className={styles.container} id="allocation_details_container">
			<Header
				params={params}
				setParams={setParams}
				listRefetch={listRefetch}
				partner_id={partner_id}
				locale={locale}
			/>

			<List
				list={list}
				loading={loading}
				paginationData={paginationData}
				getNextaPage={getNextPage}
			/>
		</section>
	);
}

export default Details;
