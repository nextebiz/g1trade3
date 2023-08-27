export async function getCategories2() {
  
    const fetch_cats = await fetch("http://localhost:3000/api/public/categories", {
      method: "POST",
    });

  
    const response_cats = await fetch_cats.json();
    console.log(response_cats)
    return response_cats;
  }
  