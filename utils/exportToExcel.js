import * as XLSX from "xlsx";

export const exportResponsesToExcel = (responses, formTitle) => {
  if (!responses.length) return;

  // Convert DB rows into Excel rows
  const excelData = responses.map((response) => {
    const json = JSON.parse(response.jsonResponse);

    return {
      ...json,
      "Submitted At": new Date(response.createdAt).toLocaleString(),
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Responses"
  );

  XLSX.writeFile(
    workbook,
    `${formTitle}-Responses.xlsx`
  );
};