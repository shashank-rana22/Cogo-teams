function saveByteArray(data, byte) {
	const blob = new Blob([byte], { type: data.contentType });
	const link = document.createElement('a');
	link.href = window.URL.createObjectURL(blob);
	const fileName = data?.name;
	link.download = fileName;
	link.click();
}

export default saveByteArray;
