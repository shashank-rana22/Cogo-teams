import { Button, cl, Loader, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useRef, useState } from 'react';

import EmptyState from '../EmptyState';
import ListPagination from '../ListPagination';

import Footer from './Footer';
import styles from './styles.module.css';

const SINGLE_ROW_SPAN = 12;
const DEFAULT_SPAN = 2;
const PERCENT_FACTOR = 100;

const getWidthPercent = (span) => {
	let current_span = DEFAULT_SPAN;
	if (typeof span === 'number') current_span = span;

	const percent = (current_span / SINGLE_ROW_SPAN) * PERCENT_FACTOR;

	return percent;
};

function ListView({
	data = {}, columns = [], EditForm = () => {}, loading = false,
	filters = {}, setFilters = () => {},
}) {
	const [showEdit, setShowEdit] = useState(false);

	const editRef = useRef(null);

	const onEditSubmit = () => {
		editRef.current.formSubmit();
	};

	if (loading) {
		return <div className={styles.loader}><Loader /></div>;
	}

	return (
		<div>
			<div className={cl`${styles.row_container} ${styles.width_95} ${styles.header_container}`}>
				{columns.map((col) => (
					<div
						key={col.key}
						style={{ width: `${getWidthPercent(col?.span)}%` }}
						className={styles.label}
					>
						{col?.label || ''}
					</div>
				))}
			</div>

			<hr className={styles.divider} />

			{isEmpty(data?.list) ? <EmptyState /> : (
				<div>
					<ListPagination data={data} setFilters={setFilters} filters={filters} />
					{(data?.list || []).map((item) => (
						<div key={item?.id} className={styles.card_container}>
							<div className={styles.row_container}>
								<div className={cl`${styles.row_container} ${styles.width_95}`}>
									{columns.map((col) => (
										<div
											key={col.key}
											style={{
												width   : `${getWidthPercent(col?.span)}%`,
												padding : '0 8px',
											}}
										>
											{typeof col?.render === 'function' ? col.render(item) : null}
										</div>
									))}

								</div>

							</div>

							<Footer item={item} />
						</div>
					))}

					<ListPagination data={data} setFilters={setFilters} filters={filters} />
				</div>
			)}

			{showEdit ? (
				<Modal
					show={showEdit}
					onClose={() => { setShowEdit(null); }}
					size="lg"
					placement="top"
				>
					<Modal.Header title="Update Weight Slabs" />
					<Modal.Body>
						<EditForm item={showEdit} ref={editRef} />
					</Modal.Body>
					<Modal.Footer>
						<Button
							themeType="secondary"
							style={{ marginRight: 8 }}
						>
							Cancel
						</Button>

						<Button onClick={onEditSubmit}>Submit</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}

export default ListView;
