import { Button, Modal } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import Filters from './Filter';
import styles from './styles.module.css';

function Filter({ filters = {}, setFilters = () => {}, activeTab = 'create' }) {
	const [show, setShow] = useState(false);

	return (
		<div className={styles.container}>
			<Button themeType="secondary" onClick={() => setShow(!show)}>
				<IcMFilter />
				{' '}
				FILTERS
			</Button>

			<Modal
				show={show}
				placement="top-right"
				closeOnOuterClick={() => setShow(!show)}
				size="sm"
				onClose={() => setShow(!show)}
			>
				<Modal.Header title="Apply Filter" />
				<Modal.Body>

					<Filters
						filters={filters}
						setFilters={setFilters}
						setShow={setShow}
						activeTab={activeTab}
					/>

				</Modal.Body>

			</Modal>
		</div>

	);
}

export default Filter;
