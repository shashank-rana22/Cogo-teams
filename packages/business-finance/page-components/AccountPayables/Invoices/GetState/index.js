import { Button, Input, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useGetState from '../hooks/useGetState';

import InvoiceList from './InvoiceList';
import styles from './styles.module.css';

function GetState({ show, setShow }) {
	const [values, setValues] = useState({});
	const [data, setData] = useState([]);
	const {
		loading,
		onSubmit,
	} = useGetState({ setData });

	const isDisable = isEmpty(values?.sid) || isEmpty(values?.billnum);

	return (
		<Modal
			show={show}
			className={styles.modal_styles}
			onClose={() => { setShow(false); }}
			showCloseIcon
			scroll={false}
			size={!isEmpty(data) ? 'md' : 'sm'}
		>
			<Modal.Body>
				<div className={styles.body}>
					{isEmpty(data) ? (
						<>
							<div className={styles.head}>Get State</div>
							<div className={styles.sidnum}>
								<Input
									name="sid"
									value={values?.sid || ''}
									onChange={(val) => setValues({ ...values, sid: val })}
									placeholder="Enter SID Number"
								/>
							</div>
							<div className={styles.billnum}>
								<Input
									name="billnum"
									value={values?.billnum || ''}
									onChange={(val) => setValues({ ...values, billnum: val })}
									placeholder="Enter Bill Number"
								/>
							</div>
							<div className={styles.flexend}>
								<Button
									disabled={loading}
									className={styles.marginRight}
									themeType="secondary"
									onClick={() => setShow(false)}
								>
									Cancel
								</Button>
								<Button
									disabled={loading || isDisable}
									onClick={() => onSubmit(values)}
								>
									Search
								</Button>
							</div>
						</>
					) : (
						<>
							<InvoiceList data={data} />
							<div className={styles.flexend}>
								<Button
									className={styles.marginRight}
									themeType="secondary"
									onClick={() => setShow(false)}
								>
									Close
								</Button>
								<Button onClick={() => setData([])}>
									Back
								</Button>
							</div>
						</>
					)}
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default GetState;
