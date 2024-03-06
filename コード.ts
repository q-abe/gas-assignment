type Product = Record<"productId" | "name" | "brandName", string>;
type Category = Record<"categoryCode" | "categoryName", string>;
type ProdCategory = Record<"productId" | "categoryCode", string>;

type Stock = {
    skuCode: string;
    productId: string;
    color: string;
    size: string;
    stock: number;
};

type Value = string | number;
type Dictionary = {
    [key: string]: Value;
};

function myFunction() {
    // スプレッドシートのファイル指定
    const sheet: GoogleAppsScript.Spreadsheet.Spreadsheet = SpreadsheetApp.openById("1yr5W67RsjoES2hu_ACoLBJfw-DwAqjyidGb8h0x9Ufg");

    // シートの値を取得する関数
    const getSheet = (sheetName: string):[][] => {
        return sheet.getSheetByName(sheetName).getDataRange().getValues();
    }

    // シートのタブ名を取得する関数
    const getTabNames = () => {
        const tabNames = [];
        const spreadSheet = sheet.getSheets()
        for (let i = 0; i < spreadSheet.length; i++) {
            const tabName = spreadSheet[i].getName();
            tabNames.push(tabName)
        }
        console.log("タブ名一覧", tabNames)
    }

    //共通関数: ヘッダーと分離する

    const separateData = (array: Value[][]) => {
        const [ headers, ...records ] = array;
        const isAllString = headers.every((header): header is string => {
            return typeof header === 'string';
        })
        if (isAllString) {
            return { headers, records };
        }
        throw new Error(`Some of [${headers}] are not strings`);
    };

    //共通関数: ヘッダーをプロパティ名としてオブジェクトに変換する
    const convertObj = <T extends Value>(
        headers: string[],
        records: T[][]
    ): Dictionary[] => {
        return records.map((record) => {
            const obj: Dictionary = {};
            headers.forEach((header, index) => {
                obj[header] = record[index];
            });
            return obj;
        });
    };

    //シートの情報を取得
    const prodData: Product[][] = getSheet("商品");
    const stoData: Stock[][] = getSheet("在庫");
    const cateNameData: Category[][] = getSheet("カテゴリー");
    const prodCatData: ProdCategory[][] = getSheet("商品_カテゴリー");

    const prodDataSeparated = separateData(prodData);
    const stoDataSeparated = separateData(stoData);
    const cateDataSeparated = separateData(cateNameData);
    const prodCatDataSeparated = separateData(prodCatData);

    //オブジェクト変換
    const prodObjs = convertObj(
        prodDataSeparated.headers,
        prodDataSeparated.records
    );
    const stoObjs = convertObj(
        stoDataSeparated.headers,
        stoDataSeparated.records
    );
    const cateNameObjs = convertObj(
        cateDataSeparated.headers,
        cateDataSeparated.records
    );
    const prodCateCodeObjs = convertObj(
        prodCatDataSeparated.headers,
        prodCatDataSeparated.records
    );

    //商品と在庫を結合
    const prodAddSto = () => {
        return stoObjs.map((stoObj) => {
            const prodObj = prodObjs.find((prodObj) =>
                prodObj.productId === stoObj.productId);
            return {
                productId: prodObj.productId,
                name: prodObj.name,
                brandName: prodObj.brandName,
                skuCode: stoObj.skuCode,
                color: stoObj.color,
                size: stoObj.size,
                stock: stoObj.stock
            }
        })
    }
}
