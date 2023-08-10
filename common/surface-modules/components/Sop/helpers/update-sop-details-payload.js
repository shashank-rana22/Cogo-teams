const updateSopPayload = async ({
	sopCardRef,
	blocks,
	originalData,
	sopID,
}) => {
	const allPromises = [];

	Object.keys(sopCardRef.current || {}).forEach((key) => {
		const data = sopCardRef.current[key];
		if (data) {
			const { getFileValue } = data;

			allPromises.push(getFileValue());
		}
	});

	const values = await Promise.all(allPromises);

	const newBlocks = blocks;
	const getAllLiks = (data) => {
		const urls = [];
		(data || []).forEach((file_row) => {
			if (file_row?.url) {
				urls.push(file_row?.url);
			}
		});
		return urls;
	};
	const updateStats = [];

	values.forEach((elememt) => {
		const object = newBlocks.find((obj) => obj.id === elememt.fileValue.id);
		const urls = getAllLiks(elememt?.fileValue?.file?.file);
		if (object?.mainData?.url_links?.length) {
			if (urls) {
				object.mainData.url_links = [...object.mainData.url_links, ...urls];
			}
		} else {
			object.mainData.url_links = urls || null;
		}
	});

	const update_payload = [];

	(newBlocks || []).forEach((row, index) => {
		const elememt = {};
		const instruction = row.mainData;
		const originalInstruction = originalData[index]?.mainData;

		const updateStatsObject = { id: row?.id };

		let isadded = false;
		if (originalData?.length > index) {
			let oldUpdatable = true;
			if (
				!originalInstruction?.instruction
				&& !(instruction?.instruction || instruction?.url_links?.length)
			) {
				oldUpdatable = false;
			}
			if (
				!originalInstruction?.url_links?.length
				&& !(instruction?.instruction || instruction?.url_links?.length)
			) {
				oldUpdatable = false;
			}

			if (instruction?.instruction !== originalInstruction?.instruction) {
				elememt.instruction = instruction.instruction;
				isadded = true;
			}
			if (instruction?.url_links?.length) {
				if (originalInstruction?.url_links?.length) {
					if (
						instruction.url_links.length
						!== originalInstruction.url_links.length
					) {
						elememt.url_links = instruction?.url_links;
						isadded = true;
					}
				} else {
					elememt.url_links = instruction?.url_links;
					isadded = true;
				}
			}
			if (instruction.status !== originalInstruction?.status) {
				elememt.status = instruction?.status;
				isadded = true;
			}
			updateStatsObject.updatable = oldUpdatable;

			if (isadded) {
				if (elememt) {
					elememt.id = instruction?.id;
					update_payload.push(elememt);
				}
			}
			const object = newBlocks.find((obj) => obj.id === row.id);
			object.updatable = oldUpdatable;
		} else {
			let newUpdatable = false;

			if (instruction?.instruction) {
				elememt.instruction = instruction.instruction;
				newUpdatable = true;
			}
			if (instruction?.url_links?.length) {
				elememt.url_links = instruction?.url_links;
				newUpdatable = true;
			}
			if (instruction?.status === 'active') {
				elememt.status = instruction?.status;
			}

			const object = newBlocks.find((obj) => obj.id === row.id);
			object.updatable = newUpdatable;
			updateStatsObject.updatable = newUpdatable;
			if (Object.keys(elememt).length) {
				update_payload.push(elememt);
			}
		}

		updateStats.push(updateStatsObject);
	});

	const finalPayload = {
		sop_instructions : update_payload,
		procedure_id     : sopID,
	};

	let updatable = true;
	(updateStats || []).forEach((stats) => {
		if (stats?.updatable === false) {
			updatable = stats?.updatable;
		}
	});

	return {
		finalPayload,
		updatable,
		updateStats,
		newBlocks,
	};
};
export default updateSopPayload;
