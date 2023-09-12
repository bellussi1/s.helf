const categories = [
  'Categoria 1',
  'Categoria 2',
  'Categoria 3',
  'Categoria 4',
  'Categoria 5',
]
const products = []
for (let i = 1; i <= 25; i++) {
  const product = {
    id: i,
    name: `Produto ${i}`,
    price: Math.floor(Math.random() * 100) + 1,
    category: categories[Math.floor(Math.random() * categories.length)],
    stock: Math.floor(Math.random() * 200) + 1,
    maxStock: Math.floor(Math.random() * 200) + 1,
    minStock: Math.floor(Math.random() * 200) + 1,
  }
  products.push(product)
}

const sales = []
for (let year of [2019, 2020, 2021, 2022, 2023]) {
  for (let month = 1; month <= 12; month++) {
    for (let sale = 1; sale <= 2; sale++) {
      const saleItem = {
        id: sales.length + 1,
        productId: Math.floor(Math.random() * products.length) + 1,
        quantity: Math.floor(Math.random() * 10) + 1,
        date: `${year}-${month.toString().padStart(2, '0')}-${
          Math.floor(Math.random() * 28) + 1
        }`,
      }
      sales.push(saleItem)
    }
  }
}

export default {
  products,
  sales,
}
