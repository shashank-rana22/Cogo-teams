import { Modal, Button, cl } from '@cogoport/components';
import { useState } from 'react';

import Card from './Card';
import Header from './Header';
import styles from './styles.module.css';

const ONE = 1; const ZERO = 0;
function RecommendedServices({
	service_type = '',
	selected = [],
	setSelected = () => {},
	list = [],
	show = false,
	setShow = () => {},
}) {
	const [isCheckAll, setIsCheckAll] = useState(false);

	const newData = (list || [])?.map((item, index) => ({
		...item,
		id: index + ONE,
	}));
	const l1 = selected?.length || ZERO;
	const l2 = newData?.length || ZERO;
	const handleSelect = (checked, item) => {
		if (checked) {
			setSelected((val) => {
				const newArr = [...val];
				newArr.push(item);
				return newArr;
			});
			if (l2 === l1 + ONE) {
				setIsCheckAll(true);
			}
		} else {
			setSelected((val) => {
				const newArr = [...val];
				const index = newArr.findIndex((s) => s.id === item.id);
				newArr.splice(index, ONE);
				return newArr;
			});
			setIsCheckAll(false);
		}
	};

	return (
		<Modal
			show={show}
			className={cl`${styles.primary} ${styles.lg}`}
			onClose={() => setShow(false)}
			onOuterClick={() => setShow(false)}
		>
			<div className={styles.section}>
				<div className={styles.title}>Recommended Service</div>
				<Header
					selected={selected}
					newData={newData}
					data={list}
					setSelected={setSelected}
					setIsCheckAll={setIsCheckAll}
					isCheckAll={isCheckAll}
				/>
				<Card
					newData={newData}
					selected={selected}
					handleSelect={handleSelect}
					setIsCheckAll={setIsCheckAll}
					service={service_type}
				/>
			</div>
			<div className={styles.btn_wrap}>
				<Button onClick={() => setShow(false)}>Add services</Button>
			</div>
		</Modal>
	);
}

export default RecommendedServices;
