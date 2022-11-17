import { ArticlesController } from './articles/controller.js';

export const Routes = (app) => {
    // Top ranking articles for a week or month
    app.route('/articles/top/weekly/:start').get(ArticlesController.getTopWeeklyArticles);
    app.route('/articles/top/monthly/:start').get(ArticlesController.getTopMonthlyArticles);
    // View count per article for week or month
    app.route('/articles/:name/weekly/:start').get(ArticlesController.getArticleViewCountForWeek);
    app.route('/articles/:name/monthly/:start').get(ArticlesController.getArticleViewCountForMonth);
    // Article top view count day for a month
    app.route('/articles/:name/top/monthly/:start').get(ArticlesController.getArticleTopViewCountForMonth);
};