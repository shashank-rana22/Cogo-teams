import { Input, Button } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

// import List from '../../common/List';
import useListFclFreightRateExtensions from '../../hooks/useListFclFreightRateExtensions';

import Create from './components/Create';
// import fclColumnFunc from './components/Fields/fcl-freight';
import styles from './styles.module.css';

function FclRateExtensions() {
	const [show, setShow] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const {
		listFclFreight: refetch,
		// data,
		// loading,
		// page,
		// setPage,
	} = useListFclFreightRateExtensions(searchQuery);

	// const columns = fclColumnFunc({
	// 	setShow,
	// 	refetch,
	// });
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>FCL FREIGHT RATE EXTENSION RULE SETS</div>
			</div>
			<div className={styles.styled_section}>
				<Input
					suffix={<IcMSearchlight size={3} />}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e?.target?.value)}
					style={{ width: 280, height: 38, marginRight: 10 }}
					placeholder="Search by Extension Name"
					type="text"
					theme="admin"
				/>

				<Button
					onClick={() => {
						setShow({
							...show,
							isEdit: false,
						});
					}}
				>
					Create New Extensions
				</Button>
			</div>
			{/* <List
				data={data}
				loading={loading}
				page={page}
				setPage={setPage}
				columns={columns}
			/> */}
			{show && (
				<Create item={show} setItem={setShow} fetchFclFreight={refetch} />
			)}
		</div>
	);
}

export default FclRateExtensions;
