import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '@/store';
import { fetchProductDetails } from '@/store/productdetailslice';
import Head from 'next/head';

function ProductDetails() {
  const { selectedProduct: product, status, error } = useSelector((state) => state.productDetails);  // Updated to access 'productDetails'
  console.log(product, "Product details");
  
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div>
    <Head>
        <title>Product List - Decosperts</title> {/* Title for SEO */}
        <meta name="description" content="Explore our wide range of products including beauty, fashion, electronics, and more at Decosperts." /> {/* Meta description */}
        <meta name="robots" content="index, follow" /> {/* Robots meta tag */}
        <meta property="og:title" content="Product List - Decosperts" /> {/* Open Graph title */}
        <meta property="og:description" content="Explore our wide range of products including beauty, fashion, electronics, and more at Decosperts." /> {/* Open Graph description */}
        <meta property="og:type" content="website" /> {/* Open Graph type */}
        <meta property="og:url" content="hsfsdfs" /> {/* Open Graph URL */}
        <meta property="og:image" content="sdfsd" /> {/* Open Graph image */}
        <meta name="twitter:card" content="summary_large_image" /> {/* Twitter card */}
        <meta name="twitter:title" content="Product List - Decosperts" />
        <meta name="twitter:description" content="Explore our wide range of products including beauty, fashion, electronics, and more at Decosperts." />
        <meta name="twitter:image" content="sdfdsf" />
      </Head>
      <h1>{product.title}</h1>
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ width: '300px', height: '300px', objectFit: 'cover' }}
      />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { id } = context.params;

  // Dispatch action to fetch product details
  await store.dispatch(fetchProductDetails(id));

  // Log the Redux state to verify the selectedProduct
  console.log(store.getState().productDetails.selectedProduct);  // Log updated state

  return { props: {} }; // Redux state will be automatically hydrated
});

export default ProductDetails;
