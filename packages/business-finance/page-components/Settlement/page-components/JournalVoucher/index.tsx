import { Button, Input, Toggle } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';
import CustumTable from '../../commons/CustumTable';
import { jvFilters } from '../../configurations/jv-filters';
import useGetJvList from '../../hooks/useGetJvList';

import CreateJvModal from './CreateJvModal';
import styles from './styles.module.css';

function JournalVoucher({ entityCode }) {
	const { query } = useRouter();
	const [filters, setFilters] = useState({});
	const [show, setShow] = useState(false);

	const { data, loading, refetch } = useGetJvList({ filters, entityCode });

	const handleVersionChange = () => {
		window.location.href = `/${query.partner_id}/business-finance/settlement/JournalVoucher`;
	};

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
					<Toggle
						name="toggle"
						size="md"
						onLabel="Old"
						offLabel="New"
						onChange={handleVersionChange}
					/>
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
