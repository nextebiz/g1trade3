export async function getSingleProduct(id: string) {
  const form_data = new FormData();
  form_data.set("product_id", id);
  console.log(id)

  const fetch_product = await fetch("/api/seller/products/find_product", {
    method: "POST",
    body: form_data,
  });


  const fetch_response = await fetch_product.json();

  return fetch_response;
}
