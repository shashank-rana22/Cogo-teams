import { Button, Input, Select } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';
import UploadModal from './UploadModal';
import { optionMonth } from './utils';

function SourceFile() {
	const [filters, setFilters] = useState({ month: '', entity: '', query: '' });
	const [uploadModal, setUploadModal] = useState(false);

	const getCardData = [{
		id     : '#Upload_33892',
		month  : 'Upload Month - December 2023',
		name   : 'Uploaded By - Zubin Khanna',
		date   : '2 Jan 2024',
		basis  : ['Volume', 'Value'],
		button : 'View',
	}, {
		id     : '#Upload_33892',
		month  : 'Upload Month - December 2023',
		name   : 'Uploaded By - Zubin Khanna',
		date   : '2 Jan 2024',
		basis  : ['Volume', 'Value'],
		button : 'View',
	}, {
		id     : '#Upload_33892',
		month  : 'Upload Month - December 2023',
		name   : 'Uploaded By - Zubin Khanna',
		date   : '2 Jan 2024',
		basis  : ['Volume', 'Value'],
		button : 'View',
	}, {
		id     : '#Upload_33892',
		month  : 'Upload Month - December 2023',
		name   : 'Uploaded By - Zubin Khanna',
		date   : '2 Jan 2024',
		basis  : ['Volume', 'Value'],
		button : 'View',
	}, {
		id     : '#Upload_33892',
		month  : 'Upload Month - December 2023',
		name   : 'Uploaded By - Zubin Khanna',
		date   : '2 Jan 2024',
		basis  : ['Volume', 'Value'],
		button : 'View',
	}];
	return (
		<div className={styles.container}>
			<div className={styles.filter_flex}>
				<div className={styles.flex}>
					<div className={styles.select_container}>
						<Select
							value={filters?.month}
							onChange={(val:string) => { setFilters((prev) => ({ ...prev, month: val })); }}
							placeholder="Month"
							options={optionMonth}
							isClearable
							style={{ width: '150px' }}
						/>
					</div>

					<div className={styles.select_container}>
						<Select
							value={filters?.entity}
							onChange={(val:string) => { setFilters((prev) => ({ ...prev, entity: val })); }}
							placeholder="Basis"
							options={[{ label: 'All', value: 'all' },
								{ label: 'Entity 101', value: '101' },
								{ label: 'Entity 301', value: '301' }]}
							isClearable
							style={{ width: '150px' }}
						/>
					</div>

				</div>

				<div>
					<div className={styles.flex}>
						<div className={styles.input_container}>
							<Input
								value={filters?.query}
								onChange={(val:string) => { setFilters((prev) => ({ ...prev, query: val })); }}
								placeholder="Search"
								suffix={<IcMSearchlight height="20px" width="20px" style={{ marginRight: '8px' }} />}
							/>
						</div>

						<div>
							<Button onClick={() => { setUploadModal(true); }}>
								Upload
							</Button>

						</div>
					</div>
				</div>
				{uploadModal && <UploadModal uploadModal={uploadModal} setUploadModal={setUploadModal} />}
			</div>

			<div className={styles.card_container}>
				{getCardData.map((item) => (
					<div className={styles.card}>
						<div>{item.id}</div>

						<div>{item.month}</div>

						<div className={styles.name_data}>
							<div>{item.name}</div>
							<div className={styles.date_data}>{item.date}</div>
						</div>

						<div className={styles.basis}>
							Basis :
							{item.basis.map((itemBasis) => (
								<div className={styles.tag}>
									{' '}
									{itemBasis}
								</div>
							))}
						</div>

						<div><Button themeType="secondary">{item.button}</Button></div>
					</div>
				))}

			</div>
		</div>
	);
}
export default SourceFile;
