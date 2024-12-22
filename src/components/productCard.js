import Link from 'next/link';

export default function ProductCard({ product }) {
    return (
        <div
            style={{
                border: '1px solid #ccc',
                padding: '10px',
                margin: '10px',
                width: '200px',
            }}
        >
            <img
                src={product.thumbnail}
                alt={product.title}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <Link href={`/product/${product.id}`} legacyBehavior>
                <a>View Details</a>
            </Link>
        </div>
    );
}


