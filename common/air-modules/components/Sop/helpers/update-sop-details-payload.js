const updateSopPayload = async ({
	sopCardRef,
	blocks,
	originalData,
	sopID,
}) => {
	const ALL_PROMISES = [];

	Object.keys(sopCardRef.current || {}).forEach((key) => {
		const data = sopCardRef.current[key];
		if (data) {
			const { getFileValue } = data;

			ALL_PROMISES.push(getFileValue());
		}
	});

	const values = await Promise.all(ALL_PROMISES);

	const newBlocks = blocks;
	const getAllLiks = (data) => {
		const URLS = [];
		(data || []).forEach((file_row) => {
			if (file_row?.url) {
				URLS.push(file_row?.url);
			}
		});
		return URLS;
	};
	const UPDATE_STATS = [];

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

	const UPDATE_PAYLOAD = [];

	(newBlocks || []).forEach((row, index) => {
		const ELEMENT = {};
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
				ELEMENT.instruction = instruction.instruction;
				isadded = true;
			}
			if (instruction?.url_links?.length) {
				if (originalInstruction?.url_links?.length) {
					if (
						instruction.url_links.length
						!== originalInstruction.url_links.length
					) {
						ELEMENT.url_links = instruction?.url_links;
						isadded = true;
					}
				} else {
					ELEMENT.url_links = instruction?.url_links;
					isadded = true;
				}
			}
			if (instruction.status !== originalInstruction?.status) {
				ELEMENT.status = instruction?.status;
				isadded = true;
			}
			updateStatsObject.updatable = oldUpdatable;

			if (isadded) {
				if (ELEMENT) {
					ELEMENT.id = instruction?.id;
					UPDATE_PAYLOAD.push(ELEMENT);
				}
			}
			const object = newBlocks.find((obj) => obj.id === row.id);
			object.updatable = oldUpdatable;
		} else {
			let newUpdatable = false;

			if (instruction?.instruction) {
				ELEMENT.instruction = instruction.instruction;
				newUpdatable = true;
			}
			if (instruction?.url_links?.length) {
				ELEMENT.url_links = instruction?.url_links;
				newUpdatable = true;
			}
			if (instruction?.status === 'active') {
				ELEMENT.status = instruction?.status;
			}

			const object = newBlocks.find((obj) => obj.id === row.id);
			object.updatable = newUpdatable;
			updateStatsObject.updatable = newUpdatable;
			if (Object.keys(ELEMENT).length) {
				UPDATE_PAYLOAD.push(ELEMENT);
			}
		}

		UPDATE_STATS.push(updateStatsObject);
	});

	const finalPayload = {
		sop_instructions : UPDATE_PAYLOAD,
		procedure_id     : sopID,
	};

	let updatable = true;
	(UPDATE_STATS || []).forEach((stats) => {
		if (stats?.updatable === false) {
			updatable = stats?.updatable;
		}
	});

	return {
		finalPayload,
		updatable,
		updateStats: UPDATE_STATS,
		newBlocks,
	};
};
export default updateSopPayload;
