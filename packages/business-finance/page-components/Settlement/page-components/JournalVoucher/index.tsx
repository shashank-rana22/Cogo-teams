import { Button, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';
import CustumTable from '../../commons/CustumTable';
import { jvFilters } from '../../configurations/jv-filters';
import useGetJvList from '../../hooks/useGetJvList';

import CreateJvModal from './CreateJvModal';
import styles from './styles.module.css';

function JournalVoucher() {
	const [filters, setFilters] = useState({});
	const [show, setShow] = useState(false);

	const { data, loading, refetch } = useGetJvList({ filters });

	const onPageChange = (val:number) => {
		setFilters({ ...filters, page: val });
	};

	const onClose = () => {
		setShow(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.filtercontainer}>
				<Filter controls={jvFilters} setFilters={setFilters} filters={filters} pageKey="page" />
				<div className={styles.createjv}>
					<Input
						name="query"
						onChange={(val) => { setFilters({ ...filters, query: val, page: 1 }); }}
						placeholder="Search By JV Number/Business Partner"
						size="md"
						suffix={<IcMSearchlight height="20px" width="20px" className={styles.search} />}
					/>
					<Button
						type="button"
						themeType="primary"
						size="md"
						onClick={() => { setShow(true); }}
						className={styles.jvbutton}
					>
						Create JV
					</Button>
				</div>
			</div>
			<CustumTable
				data={data}
				onPageChange={onPageChange}
				loading={loading}
				refetch={refetch}
				setFilters={setFilters}
				filters={filters}
			/>
			{show ? <CreateJvModal show={show} setShow={setShow} onClose={onClose} refetch={refetch} /> : null}
		</div>
	);
}

export default JournalVoucher;
