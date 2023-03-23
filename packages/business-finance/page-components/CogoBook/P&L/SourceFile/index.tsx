import { Button, Input, Select, SingleDateRange } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import { basisOptions } from '../constant';

import styles from './styles.module.css';
import UploadModal from './UploadModal';

function SourceFile() {
	const [filters, setFilters] = useState({
		date  : '',
		basis : '',
		query : '',
	});

	const [uploadModal, setUploadModal] = useState(false);
	const getData = [{
		id          : '#Upload_33892',
		month       : 'Upload Month - December 2023',
		dateData    : '2 Jan 2024',
		uploaded_by : 'Uploaded By - Zubin Khanna',
		basis       : ['Volume', 'Value'],
	}, {
		id          : '#Upload_33892',
		month       : 'Upload Month - December 2023',
		dateData    : '2 Jan 2024',
		uploaded_by : 'Uploaded By - Zubin Khanna',
		basis       : ['Volume', 'Value'],
	}, {
		id          : '#Upload_33892',
		dateData    : '2 Jan 2024',
		month       : 'Upload Month - December 2023',
		uploaded_by : 'Uploaded By - Zubin Khanna',
		basis       : ['Volume', 'Value'],
	}, {
		id          : '#Upload_33892',
		dateData    : '2 Jan 2024',
		month       : 'Upload Month - December 2023',
		uploaded_by : 'Uploaded By - Zubin Khanna',
		basis       : ['Volume', 'Value'],
	}, {
		id          : '#Upload_33892',
		dateData    : '2 Jan 2024',
		month       : 'Upload Month - December 2023',
		uploaded_by : 'Uploaded By - Zubin Khanna',
		basis       : ['Volume', 'Value'],
	}, {
		id          : '#Upload_33892',
		dateData    : '2 Jan 2024',
		month       : 'Upload Month - December 2023',
		uploaded_by : 'Uploaded By - Zubin Khanna',
		basis       : ['Volume', 'Value'],
	}];

	return (
		<div className={styles.container}>
			{uploadModal && <UploadModal uploadModal={uploadModal} setUploadModal={setUploadModal} />}

			<div className={styles.filter_flex}>

				<div className={styles.filter_select}>
					<div className={styles.select_container}>
						<Select
							value={filters?.basis}
							onChange={(val:string) => { setFilters((prev) => ({ ...prev, basis: val })); }}
							placeholder="Basis"
							options={basisOptions}
							isClearable
							style={{ width: '200px' }}
						/>
					</div>
					<div className={styles.date_range}>
						<SingleDateRange
							placeholder="Date"
							dateFormat="MM/dd/yyyy"
							name="date"
							onChange={(val:any) => { setFilters((prev) => ({ ...prev, date: val })); }}
							value={filters?.date}
						/>
					</div>
				</div>

				<div className={styles.filter_select}>
					<div className={styles.input_container}>
						<Input
							value={filters?.query}
							onChange={(val:string) => { setFilters((prev) => ({ ...prev, query: val })); }}
							placeholder="Search"
							suffix={<IcMSearchlight height="20px" width="20px" style={{ marginRight: '8px' }} />}
						/>
					</div>
					<div>
						<Button themeType="primary" onClick={() => { setUploadModal(!uploadModal); }}>Upload</Button>
					</div>
				</div>
			</div>
			<div>
				{getData.map((item) => (
					<div className={styles.sub_container}>
						<div>{item?.id}</div>
						<div>{item?.month}</div>
						<div className={styles.uploaded}>
							{item?.uploaded_by}
							<div className={styles.date}>{item?.dateData}</div>
						</div>
						<div className={styles.basis}>
							{' '}
							Basis:
							{item?.basis.map((itemString) => <div className={styles.basis_sub}>{itemString}</div>)}
						</div>

						<div>
							<Button themeType="secondary">View</Button>
						</div>
					</div>
				))}

			</div>
		</div>
	);
}
export default SourceFile;
