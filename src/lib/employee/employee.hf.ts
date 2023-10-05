import HyperFormula, { RawCellContent } from "hyperformula";

console.log(
	`%c Using HyperFormula ${HyperFormula.version}`,
	"color: blue; font-weight: bold"
);

export const initializeHF = (initSheetId: string, sheet3Id: string) => {
	const hf = HyperFormula.buildEmpty({
		licenseKey: "gpl-v3",
		maxRows: 150000,
	});

	// Add a new sheet and get its id.
	const sheetName = hf.addSheet(initSheetId);
	const sheetId = hf.getSheetId(sheetName);

	const sheet3Name = hf.addSheet(sheet3Id);
	const sheetId3 = hf.getSheetId(sheet3Name);

	return {
		hf,
		sheetName,
		sheetId,
		sheet3Name,
		sheetId3,
	};
};

export const initializeNamedExpressions = (
	hf: HyperFormula,
	sheetName: string
) => {
	const sheetId = hf.getSheetId(sheetName) as number;
	const { height } = hf.getSheetDimensions(sheetId);

	// Add named expressions for the "TOTAL" row.
	hf.addNamedExpression(
		"Year_1",
		`=SUM(${sheetName}!$B$1:${sheetName}!$B$${height})`
	);
	hf.addNamedExpression(
		"Year_2",
		`=SUM(${sheetName}!$C$1:${sheetName}!$C$${height})`
	);
};

export const initHFValues = (
	hf: HyperFormula,
	sheetId: number,
	data: RawCellContent | RawCellContent[][]
) => {
	console.log("initializing for sheet ", sheetId);
	const start = Date.now();
	hf.setCellContents(
		{
			row: 0,
			col: 0,
			sheet: sheetId,
		},
		data
	);
	const end = Date.now();

	console.log("done setCellContents, took time: ", end - start);
};

export const setA1Value = (hf: HyperFormula, value: number) => {
	console.log("setting A1 value ");
	const start = Date.now();
	hf.setCellContents(
		{
			row: 0,
			col: 0,
			sheet: 0,
		},
		[[value]]
	);
	const end = Date.now();
	console.log("done setA1Value, took time: ", end - start);
};
