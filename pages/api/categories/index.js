import categoriesData from '../../../data/categories.json';

export default function handler(req, res) {
  const { page = 1, perPage = 20 } = req.query;

  try {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const pagedCategories = categoriesData.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: pagedCategories,
      meta: {
        page: parseInt(page),
        perPage: parseInt(perPage),
        total: categoriesData.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}