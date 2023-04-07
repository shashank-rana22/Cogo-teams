import { TabPanel, Tabs, Button, Modal } from '@cogoport/components';
import { InputController, SelectController } from '@cogoport/forms';

import SearchInput from '../../../../../commons/SearchInput';

import styles from './styles.module.css';
import useHeader from './useHeader';

function Header({
	fetchFaqKeyword = () => {},
	activeKeyword,
	setActiveKeyword,
	searchKeyWord,
	setSearchKeyWord,
}) {
	const {
		show, setShow, control, errors, handleSubmit, onSubmit, loading,
	} = useHeader({ fetchFaqKeyword });

	return (
		<div className={styles.header_container}>
			<div className={styles.flex_items}>
				<div className={styles.tabs_container}>
					<Tabs
						themeType="tertiary"
						activeTab={activeKeyword}
						onChange={setActiveKeyword}
					>
						<TabPanel name="active" title="Active" />

						<TabPanel name="inactive" title="Inactive" />
					</Tabs>
				</div>

				<div className={styles.search}>
					<SearchInput
						value={searchKeyWord}
						onChange={setSearchKeyWord}
						size="md"
						placeholder="Search a key word"
					/>
				</div>
			</div>

			<div>
				<Button onClick={() => setShow(true)}>Add New Keyword</Button>
			</div>

			<Modal
				show={show}
				size="md"
				placement="center"
				closeOnOuterClick={false}
				onClose={() => setShow(false)}
			>
				<Modal.Header title="Add Keyword" />

				<Modal.Body className={styles.preview_modal_body}>
					<div>
						<div>
							<div className={styles.label}>Name</div>
							<InputController
								control={control}
								name="name"
								type="text"
								placeholder="Enter name"
							/>
						</div>
						<div>
							<div className={styles.label}>Display Name</div>
							<InputController
								control={control}
								name="display_name"
								type="text"
								placeholder="Enter display name"
								rules={{ required: 'Display name is required' }}
							/>
							{errors?.display_name
								? <div className={styles.errors}>Display name is required</div> : null}
						</div>
						<div>
							<div className={styles.label}>Keyword Type</div>
							<SelectController
								control={control}
								name="keyword_type"
								placeholder="Select keyword type"
								options={[
									{ label: 'Custom Vocabulary', value: 'custom_vocab' },
									{ label: 'Standard Terms', value: 'standard_terms' }]}
								rules={{ required: 'Keyword type is required' }}
							/>
							{errors?.keyword_type
								? <div className={styles.errors}>Keyword type is required</div> : null}
						</div>
						<div>
							<div className={styles.label}>Description</div>
							<InputController
								control={control}
								name="description"
								type="text"
								placeholder="Enter description"
							/>
						</div>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button
						themeType="secondary"
						onClick={() => setShow(false)}
						disabled={loading}
					>
						Cancel
					</Button>
					<Button
						style={{ marginLeft: 8 }}
						onClick={handleSubmit(onSubmit)}
						loading={loading}
					>
						Submit
					</Button>
				</Modal.Footer>

			</Modal>
		</div>
	);
}

export default Header;
