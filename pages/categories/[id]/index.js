import { useRouter } from 'next/router';
import { getCategoryById, getHadithsByCategory } from '../../../lib/fetch';

export default function CategoryPage({ category, hadiths }) {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Category Not Found</h1>
        <p>The requested category could not be found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{category.name_en || category.title}</h1>
      
      {hadiths && hadiths.length > 0 ? (
        <div className="grid gap-4">
          {hadiths.map(hadith => (
            <div key={hadith.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Hadith {hadith.hadith_number}</h3>
              <p className="text-gray-700">{hadith.hadeeth}</p>
              {hadith.grade && (
                <span className="text-sm text-blue-600">Grade: {hadith.grade}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No hadiths found in this category.</p>
      )}
    </div>
  );
}

export async function getStaticProps(context) {
  const { id } = context.params;

  try {
    const category = await getCategoryById(id);
    const hadiths = await getHadithsByCategory(id);
    
    return {
      props: {
        category: category || null,
        hadiths: hadiths || []
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching category:', error);
    return {
      props: {
        category: null,
        hadiths: []
      },
      revalidate: 3600
    };
  }
}

export async function getStaticPaths() {
  // Return empty paths for now to avoid build errors
  return {
    paths: [],
    fallback: true
  };
}