import { Select, Button, cl, Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import AUTO_JOB_CLOSURE_CONFIG from '../configurations/Job-Closure.json';
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
		data, loading = false, searchValue = '', onQueryChange = () => {},
		refetch = () => {}, getNextPage = () => {},
	}	= useAutoJobs({ setConfigButton, setOpenConfig });

	const { pageNo = 1, pageSize = 10, totalRecords = 0 } = data || {};
	const { list = [] } = data || {};

	const addId = () => {
		setConfigButton(false);
		const arr = (list || []).map((obj) => obj.id);
		setOpenConfig([...arr]);

		let listOfObj = {};
		(list || []).forEach((obj) => {
			const objid = obj.id;

			const requiredObj = {
				...obj,
				level1         : obj.oprClosureDays,
				level2         : obj.finClosureDays,
				oprClosureDays : undefined,
				finClosureDays : undefined,
				id             : undefined,

			};

			listOfObj = { ...listOfObj, [objid]: requiredObj };
		});
		setSaveObj(listOfObj);
	};

	const cancelledClick = () => {
		setConfigButton(true);
		setOpenConfig([]);
	};

	const { apiTrigger = () => {}, loading:loadingUpdate = false } = useUpdateJobClosure({
		refetch: () => {
			setConfigButton(true);
			setSaveObj({});
			setOpenConfig((prev) => (prev.filter((columnId) => (!Object.keys(saveObj).includes(columnId)))));
			refetch();
		},

	});

	const saveAllClicked = () => {
		const keysarr = Object.keys(saveObj);
		const TEMP_ARR = keysarr.map((key) => ({ id: key, data: saveObj[key] }));

		apiTrigger(TEMP_ARR);
	};

	return (
		<div>
			<div
				className={cl` ${styles.topContainer} ${styles.topContainerComponents}  `}
			>
				<Select
					value={searchValue}
					onChange={onQueryChange}
					placeholder="Select Service"
					options={GLOBAL_CONSTANTS.shipment_types}
					size="sm"
					style={{ width: '200px' }}
					isClearable
				/>

				{ configButton ? (
					<>
						<Button
							size="md"
							themeType="secondary"
							className={styles.topContainerComponents}
							onClick={addId}
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

				) : (
					<>

						<div className={styles.buttons}>
							<Button
								size="md"
								themeType="secondary"
								className={styles.topContainerComponents}
								onClick={cancelledClick}
								disabled={loadingUpdate}
							>
								Cancel Changes
							</Button>
						</div>
						<Button
							size="md"
							themeType="primary"
							className={styles.topContainerComponents}
							onClick={saveAllClicked}
							disabled={loadingUpdate}
						>
							Save All
						</Button>
					</>
				) }

			</div>

			<div className={styles.table}>
				{ loading ? null
					: (
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
					{ (loading || isEmpty(list)) ? null : (
						<Pagination
							type="number"
							currentPage={pageNo}
							totalItems={Number(totalRecords)}
							pageSize={pageSize}
							onPageChange={(val) => getNextPage({ page: val })}
						/>
					) }
				</div>
			</div>

			{openModalCreate
				? (<CreateModal openModal={openModalCreate} setOpenModal={setOpenModalCreate} refetch={refetch} />)
				: null}

		</div>
	);
}

export default AutoJobClosure;
