export async function getProvinceById(id: string) {
    const form_data = new FormData();
    form_data.set("province_id", id);
  
    const fetch_product = await fetch("/api/public/provinces/province", {
      method: "POST",
      body: form_data,
    });
  
    const fetch_response = await fetch_product.json();
    return fetch_response;
  }
  