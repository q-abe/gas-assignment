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

