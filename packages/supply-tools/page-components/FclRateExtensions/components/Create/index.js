/* eslint-disable no-magic-numbers */
import { Modal, Button } from '@cogoport/components';

import useCreateUpdateFclFreightRateExtensions from '../../../../hooks/useCreateUpdateFclFreightRateExtensions';
// import Layout from '../Layout';

import styles from './styles.module.css';

function Create({ item, setItem, fetchFclFreight }) {
	const handleOnCreate = async () => {
		setItem(null);
		await fetchFclFreight();
	};

	const {
		// errors,
		// fields,
		// controlsFclFreight,
		handleCloseModal,
		loading,
		handleSubmit,
		onError,
		addFclFreight,
		// showElements,
	} = useCreateUpdateFclFreightRateExtensions({
		item,
		setItem,
		handleOnCreate,
	});
	const HEADING = 'ADD FCL FREIGHT RATE EXTENSION';
	return (
		<div className={styles.modal}>
			<Modal
				show={item}
				className="primary xl"
				onClose={handleCloseModal}
				onOuterClick={handleCloseModal}
			>
				<div className={styles.heading}>{HEADING}</div>
				{/* <div className={styles.layout}>
					<Layout
						controls={controlsFclFreight.slice(0, 2)}
						fields={fields}
						errors={errors}
						themeType="admin"
						showElements={showElements}
					/>
					<div className={styles.sub_heading}>CLUSTER DETAILS</div>
					<Layout
						controls={controlsFclFreight.slice(2, 5)}
						fields={fields}
						errors={errors}
						themeType="admin"
						showElements={showElements}
					/>
					<div className={styles.sub_heading}>FILTERS</div>
					<Layout
						controls={controlsFclFreight.slice(5, 7)}
						fields={fields}
						errors={errors}
						themeType="admin"
						showElements={showElements}
					/>
					<div className={styles.sub_heading}>CHARGE CODE</div>
					<Layout
						controls={controlsFclFreight.slice(7, 10)}
						fields={fields}
						errors={errors}
						themeType="admin"
						showElements={showElements}
					/>
				</div> */}
				<div className={styles.button}>
					<Button
						disabled={loading}
						onClick={handleSubmit(addFclFreight, onError)}
						style={{ marginTop: 10 }}
					>
						SUBMIT
					</Button>
				</div>
			</Modal>
		</div>
	);
}

export default Create;
