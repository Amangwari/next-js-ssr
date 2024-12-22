import { useSelector } from 'react-redux';
import { wrapper } from '../store';
import { fetchProducts } from '@/store/productslice';
import ProductCard from '@/components/productCard';
import Head from 'next/head';


function HomePage() {
  const { items: products, status, error } = useSelector((state) => state.products);

  if (status === 'loading') {
    return <p>Loading products...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
    <Head>
        <title>Product List - Decosperts</title> {/* Title for SEO */}
        <meta name="description" content="Explore our wide range of products including beauty, fashion, electronics, and more at Decosperts." /> {/* Meta description */}
        <meta name="robots" content="index, follow" /> {/* Robots meta tag */}
        <meta property="og:title" content="Product List - Decosperts" /> {/* Open Graph title */}
        <meta property="og:description" content="Explore our wide range of products including beauty, fashion, electronics, and more at Decosperts." /> {/* Open Graph description */}
        <meta property="og:type" content="website" /> {/* Open Graph type */}
        <meta property="og:url" content="hts" /> {/* Open Graph URL */}
        <meta property="og:image" content="htt.jpg" /> {/* Open Graph image */}
        <meta name="twitter:card" content="summary_large_image" /> {/* Twitter card */}
        <meta name="twitter:title" content="Product List - Decosperts" />
        <meta name="twitter:description" content="Explore our wide range of products including beauty, fashion, electronics, and more at Decosperts." />
        <meta name="twitter:image" content="htjpg" />
      </Head>
      <h1>Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  try {
    // Fetch products on the server side and store them in Redux
    await store.dispatch(fetchProducts());

    // Return empty props as we don't need to send data from SSR to the page
    return { props: {} };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { props: {} }; // Return empty props in case of error
  }
});

export default HomePage;
