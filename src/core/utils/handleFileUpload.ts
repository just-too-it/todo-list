export const handleFileUpload = (event, setValue, fieldName) => {
  const files = event.target.files;
  const arrayFiles = Array.from(files);
  setValue(fieldName, arrayFiles);
};
