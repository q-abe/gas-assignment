type product = Record<"productId" | "name" | "brandName", string>;
type category = Record<"categoryCode" | "categoryName", string>;
type prodCategory = Record<"productId" | "categoryCode", string>;

type stock = {
    skuCode: string;
    productId: string;
    color: string;
    size: string;
    stock: number;
};

function myFunction() {
    // スプレッドシートのファイル指定
    const sheet: GoogleAppsScript.Spreadsheet.Spreadsheet = SpreadsheetApp.openById("1yr5W67RsjoES2hu_ACoLBJfw-DwAqjyidGb8h0x9Ufg");

    // シートの値を取得する関数
    const getSheet = (sheetName: string) => {
        return sheet.getSheetByName(sheetName).getDataRange().getValues();
    }
}