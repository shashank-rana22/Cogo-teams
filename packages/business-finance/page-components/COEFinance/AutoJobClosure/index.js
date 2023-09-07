import { Input, Button, cl, Pagination } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import AUTO_JOB_CLOSURE_CONFIG from '../configurations/Job-Closure';
import useAutoJobs from '../hook/useAutoJob';
import useUpdateJobClosure from '../hook/useUpdateJobClosure';

import CreateModal from './CreateModal/index';
import CustomTable from './CustomTable';
import styles from './styles.module.css';

function AutoJobClosure() {
	const [openModalCreate, setOpenModalCreate] = useState(false);
	const [openConfig, setOpenConfig] = useState([]);
	const [configButton, setConfigButton] = useState(true);
	const [saveObj, setSaveObj] = useState({});

	const {
		data, loading, searchValue, onQueryChange, refetch, getNextPage,
		paginationData,
	} = useAutoJobs({ setConfigButton, setOpenConfig });
	const { page, pageSize, totalRecords } = paginationData;
	const { list = [] } = data || {};

	function addId() {
		setConfigButton(false);
		const arr = list.map((obj) => obj.id);
		setOpenConfig([...arr]);

		let listOfObj = {};
		list.forEach((obj) => {
			const requiredObj = {
				...obj,
				level1 : obj.oprClosureDays,
				level2 : obj.finClosureDays,
			};
			delete requiredObj.oprClosureDays;
			delete requiredObj.finClosureDays;
			const objid = requiredObj.id;
			delete requiredObj.id;

			listOfObj = { ...listOfObj, [objid]: requiredObj };
		});
		setSaveObj(listOfObj);
	}
	function cancelledClick() {
		setConfigButton(true);
		setOpenConfig([]);
	}
	const { apiTrigger } = useUpdateJobClosure({ refetch, setSaveObj, listOfId: Object.keys(saveObj) });
	function saveAllClicked() {
		const TEMP_ARR = [];
		const keysarr = Object.keys(saveObj);
		keysarr.forEach((key) => {
			TEMP_ARR.push({ id: key, data: saveObj[key] });
		});

		apiTrigger(TEMP_ARR);
		setOpenConfig([]);
		setConfigButton(true);
	}

	return (
		<div>
			<div
				className={cl` ${styles.topContainer} ${styles.topContainerComponents}  `}
			>
				<Input
					name="searchValue"
					size="sm"
					placeholder="Search by Service"
					className={styles.searchBox}
					value={searchValue}
					onChange={(value) => onQueryChange(value)}
					suffix={(
						<div style={{ margin: '4px', display: 'flex' }}>
							<IcMSearchlight height={15} width={15} />
						</div>
					)}
				/>

				{ !configButton ? (
					<>
						<div className={styles.buttons}>
							<Button
								size="md"
								themeType="secondary"
								className={styles.topContainerComponents}
								onClick={() => cancelledClick()}
							>
								Cancel Changes
							</Button>
						</div>
						<Button
							size="md"
							themeType="primary"
							className={styles.topContainerComponents}
							onClick={() => saveAllClicked()}
						>
							Save All
						</Button>
					</>

				) : (
					<>
						<Button
							size="md"
							themeType="secondary"
							className={styles.topContainerComponents}
							onClick={() => addId()}
						>
							Configure
						</Button>
						<Button
							size="md"
							themeType="primary"
							className={styles.topContainerComponents}
							onClick={() => setOpenModalCreate(true)}
						>
							Create New
						</Button>
					</>
				) }

			</div>

			<div className={styles.table}>
				{' '}
				{ loading ? null : (
					<CustomTable
						itemData={data}
						config={AUTO_JOB_CLOSURE_CONFIG}
						openConfig={openConfig}
						setOpenConfig={setOpenConfig}
						refetch={refetch}
						loading={loading}
						saveObj={saveObj}
						setSaveObj={setSaveObj}
					/>
				)}
				<div className={styles.pagination}>
					{ (!loading && !isEmpty(list)) ? (
						<Pagination
							type="number"
							currentPage={page}
							totalItems={Number(totalRecords)}
							pageSize={pageSize}
							onPageChange={(val) => getNextPage({ page: val })}
						/>
					) : null }
				</div>
			</div>

			{openModalCreate
				&& <CreateModal openModal={openModalCreate} setOpenModal={setOpenModalCreate} refetch={refetch} /> }

		</div>
	);
}

export default AutoJobClosure;
