const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
      include: {
        // includes its associated Products
        model: Product,
    attributes: ["id", "product_name", "price", "stock", "category_id"]}
  })
  .then(CategoryData => {
    if(!CategoryData) {
      res.status(404).json({message: 'Category Data not found'});
      return;
    }
    res.json(CategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
  
  
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      // includes its associated Products
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(CategoryData => {
      if(!CategoryData) {
        res.status(404).json({message: 'No categories found at this ID'});
        return;
      }
      res.json(CategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
  
});

router.post('/', (req, res) => {
  // creates a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(CategoryData => res.json(CategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
