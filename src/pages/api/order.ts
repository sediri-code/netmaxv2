import { createOrder } from "../../lib/supa";
import type { APIRoute} from "astro";

export const post: APIRoute = async ({request, redirect, url}) => {
  console.log("req", request);
  const data = await request.formData();
  console.log("data", data);
  console.log("url", url)
  const order = {
    name: data.get("name"),
    phone: data.get("phone"),
    account_link: data.get("account_link"),
    quantity: data.get("quantity"),
    price: data.get("price")?.toString().split(" ")[0],
    status:"unpaid",
    service: request.headers.get("referer")?.match('instagram')? 4113 : null
  }
  try {
    const data = await createOrder(order);
    const link = request.headers.get("referer");
    console.log("link", link);
    //redirect back to the page
    return redirect(link, 302);
  }
  catch (error) {
    console.log("error", error);
    return {
      status: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
