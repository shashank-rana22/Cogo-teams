import { Modal } from '@cogoport/components';
import React from 'react';

import useCreateSearch from '../../../../../ServiceDiscovery/SpotSearch/hooks/useCreateSearch';

import FilterContent from './FilterContent';
import styles from './styles.module.css';

function Filters({ data, show, setShow, filters, setFilters }) {
	const { createSearch, loading } = useCreateSearch();

	return (
		<Modal
			animate
			size="md"
			show={show}
			onClose={() => setShow(false)}
			placement="right"
			className={styles.modal}
		>
			<Modal.Body>
				<FilterContent
					data={data}
					setShow={setShow}
					createSearchLoading={loading}
					createSearch={createSearch}
					filters={filters}
					setFilters={setFilters}
				/>
			</Modal.Body>

		</Modal>
	);
}

export default Filters;
