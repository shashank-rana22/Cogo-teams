import { Modal, Button } from '@cogoport/components';
import { useState, useRef } from 'react';

import CardList from './components/CardList';
import CreateCluster from './components/CreateCluster';
import Header from './components/Header';
import controls from './configurations/controls';
import useCreateCluster from './hooks/useCreateCluster';
import useGetListData from './hooks/useGetListData';
import styles from './styles.module.css';

function LocationClusters() {
	const [show, setShow] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [globalFilters, setGlobalFilters] = useState({});
	const { listData = {}, getLocationData = () => {}, loading = false } = useGetListData({
		globalFilters,
		searchQuery,
	});
	const {
		handleCreateCluster = () => {},
	} = useCreateCluster({ setShow, refetch: getLocationData, data: null });

	const formRef = useRef(null);

	const onSubmit = () => {
		formRef.current.formSubmit();
	};
	return (
		<div className={styles.container}>
			<Header
				setShow={setShow}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>
			{	show ? (
				<Modal
					show={show}
					onClose={() => setShow(false)}
					onOuterClick={() => setShow(false)}
					placement="top"
					size="lg"
				>
					<Modal.Header
						title="Create Cluster"
						className={styles.modal_header}
					/>
					<Modal.Body
						style={{ minHeight: '400px' }}
					>
						<CreateCluster
							ref={formRef}
							controls={controls}
							handleCreateCluster={handleCreateCluster}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button
							style={{ fontWeight: '700' }}
							onClick={onSubmit}
							disabled={loading}
						>
							SUBMIT
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
			<CardList
				getLocationData={getLocationData}
				data={listData}
				loading={loading}
				setGlobalFilters={setGlobalFilters}
			/>
		</div>
	);
}
export default LocationClusters;
