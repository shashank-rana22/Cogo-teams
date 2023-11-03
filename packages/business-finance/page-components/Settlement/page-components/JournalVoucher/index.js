import { Button, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';
import CustumTable from '../../commons/CustumTable';
import { jvFilters } from '../../configurations/jv-filters';
import useGetJvList from '../../hooks/useGetJvList';
import usePostBulkJV from '../../hooks/usePostBulkJV';

import BulkJvUpload from './BulkJvUploadModal/index';
import CreateJvModal from './CreateJvModal';
import styles from './styles.module.css';

function JournalVoucher({ entityCode }) {
	const [filters, setFilters] = useState({});
	const [show, setShow] = useState(false);
	const [showBulkJV, setShowBulkJV] = useState(false);
	const [selectedJV, setSelectedJV] = useState([]);
	const { data, loading, refetch } = useGetJvList({ filters, entityCode });
	const { loading : bulkPostLoading = false, bulkPostJV = () => {} } = usePostBulkJV();

	const onPageChange = (val) => {
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
						style={{ width: '300px' }}
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

					<Button
						size="md"
						themeType="primary"
						onClick={() => setShowBulkJV(true)}
						style={{ marginLeft: '10px', padding: '18px' }}
					>
						Bulk JV Upload
					</Button>

					<Button
						size="md"
						themeType="primary"
						onClick={() => bulkPostJV({ selectedJV, setSelectedJV })}
						disabled={isEmpty(selectedJV) || bulkPostLoading}
						loading={bulkPostLoading}
						style={{ marginLeft: '10px', padding: '18px' }}
					>
						Bulk Post
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
				selectedJV={selectedJV}
				setSelectedJV={setSelectedJV}
			/>
			{show ? (
				<CreateJvModal
					show={show}
					setShow={setShow}
					onClose={onClose}
					refetch={refetch}
					setJvSearch={() => {}}
					setDryRun={() => {}}
				/>
			) : null}
			{showBulkJV ? (
				<BulkJvUpload showBulkJV={showBulkJV} setShowBulkJV={setShowBulkJV} />
			) : null}
		</div>
	);
}

export default JournalVoucher;
