const Article = require('../models/article');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.json(articles))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).json(article))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (!article) {
        const error = new Error('Artículo no encontrado');
        error.statusCode = 404;
        return next(error);
      }
      if (article.owner.toString() !== req.user._id.toString()) {
        const error = new Error('No tienes permiso para eliminar este artículo');
        error.statusCode = 403;
        return next(error);
      }
      return Article.findByIdAndDelete(req.params.articleId)
        .then((deletedArticle) => res.json(deletedArticle));
    })
    .catch(next);
};

module.exports = { getArticles, createArticle, deleteArticle };