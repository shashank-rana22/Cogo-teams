import { Select, Modal, Button } from '@cogoport/components';

import { OptionMonth } from '../../../SourceFile/utils';

import styles from './styles.module.css';

function ModalMonth({ modal, setModal, filters, setFilters }) {
	return 		(
		<Modal
			show={modal}
			onClose={() => {
				setModal(false);
			}}
		>
			<Modal.Header title="Comparison Mode" />
			<div className={styles.modal_data}>
				<Modal.Body>
					<div className={styles.flex_data}>
						<div>
							<Select
								value={filters?.monthFrom}
								onChange={(val:string) => {
									setFilters((prev) => ({
										...prev,
										monthFrom: val,
									}));
								}}
								placeholder="Month"
								options={OptionMonth()}
								isClearable
								style={{ width: '200px' }}
							/>
						</div>
						<div>
							<Select
								value={filters?.monthTo}
								onChange={(val:string) => {
									setFilters((prev) => ({ ...prev, monthTo: val }));
								}}
								placeholder="Month"
								options={OptionMonth()}
								isClearable
								style={{ width: '200px' }}
							/>
						</div>
					</div>

				</Modal.Body>
			</div>

			<Modal.Footer>
				<div className={styles.button_flex_data}>
					<Button onClick={() => { setModal(false); }}>Confirm</Button>

				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalMonth;
