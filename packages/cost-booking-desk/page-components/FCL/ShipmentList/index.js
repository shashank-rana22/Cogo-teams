import { Modal, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../common/EmptyState';

import Card from './Card';
import ShipmentPagination from './ShipmentPagination';
import styles from './styles.module.css';

function ShipmentList({ data = {} }) {
	const { list = [] } = data || {};
	const [showRequest, setShowRequest] = useState('');

	function Pagination() {
		return (
			<div className={styles.pagination}>
				<ShipmentPagination data={data} />
			</div>
		);
	}

	return isEmpty(list) ? <EmptyState /> : (
		<div>
			<Pagination />

			{(list || [])?.map((item) => (
				<Card
					showRequest={showRequest}
					setShowRequest={setShowRequest}
					item={item}
					key={item?.id}
				/>
			))}

			<Pagination />
			{showRequest ? (
				<Modal
					show={showRequest}
					onClose={() => setShowRequest('')}
				>
					<Modal.Header title="Request Advance Payment" />
					<Modal.Footer>
						<Button>Send For Approval</Button>
					</Modal.Footer>
				</Modal>
			) : null}

		</div>
	);
}

export default ShipmentList;
