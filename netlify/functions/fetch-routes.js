const { builder } = require("@netlify/functions");

const blogDynamicPage = require("../../layouts/blog-view");

const handler = async (event, context) => {
  console.log(context);
  console.log(event);
  // function to generate all blog posts
  const path = await event.path.split("blog/")[1];
  console.log(path);

  asyncData = async ({ $sanity }) => {
    const query = groq`
      *[_type == "product"]{
        title,
        slug,
        _id,
        "price": defaultProductVariant.price,
        "imageUrl": defaultProductVariant.images[0].asset->url,
        "blurb": blurb.en
      }`;
    const products = await $sanity.fetch(query);
    return {
      statusCode: 200,
      body: blogDynamicPage(products)
    };
  };

  return {
    statusCode: 200,
    body: blogDynamicPage(products)
  };
};

exports.handler = builder(handler);
