import { Button, FullscreenModal } from '@cogoport/components';
import { forwardRef, useRef, useState } from 'react';

function HBLCreate({
	onSave = () => {},
	hblData,
	completed = false,
}) {
	const [show, setShow] = useState(false);

	const ref = useRef();

	const handleSave = () => {
		ref?.current?.submit().then(onSave);
		setShow(false);
	};
	return (
		<div>
			{!completed ? (
				<div>
					<div>Click the following button to create a new draft HBL</div>

					<Button
						ghost={!!hblData}
						onClick={() => setShow(true)}
						size="sm"
						id="bm_pt_draf_hbl_create_btn"
					>
						{hblData ? 'Edit the draft HBL' : 'Create a new draft HBL'}
					</Button>
				</div>
			) : (
				<div>
					<div>Draft HBL is already uploaded, you can preview it here</div>

					<Button
						ghost={!!hblData}
						onClick={() => {
							setShow(true);
						}}
						id="bm_pt_view_hbl_btn"
						size="sm"
					>
						View HBL
					</Button>
				</div>
			)}

			<FullscreenModal
				heading="Create House BL"
				headerActions={
					!completed ? (
						<Button
							style={{ marginLeft: 8 }}
							onClick={handleSave}
							size="sm"
							id="bm_pt_draf_hbl_save_btn"
						>
							Save
						</Button>
					) : null
				}
				show={show}
				setShow={setShow}
			>
				<div>This is trade doc</div>
			</FullscreenModal>
		</div>
	);
}

export default forwardRef(HBLCreate);
