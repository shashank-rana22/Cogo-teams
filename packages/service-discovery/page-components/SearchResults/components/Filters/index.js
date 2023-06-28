import { Modal } from '@cogoport/components';
import React from 'react';

import useCreateSearch from '../../../ServiceDiscovery/SpotSearch/hooks/useCreateSearch';

import FilterContent from './FilterContent';
import styles from './styles.module.css';

function Filters({ data, show, setShow }) {
	const { createSearch, loading } = useCreateSearch();

	return (
		<div className={styles.container}>
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
					/>
				</Modal.Body>

			</Modal>
		</div>
	);
}

export default Filters;
