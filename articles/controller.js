import { Retry } from '../retry.js';
import { ArticlesService } from './service.js';

const WIKIMEDIA_PAGEVIEWS_URL = 'https://wikimedia.org/api/rest_v1/metrics/pageviews';

export const ArticlesController = {
    getTopWeeklyArticles: async (req, res) => {
        const { start } = req.params;
        const urls = [];
        let timestamp = Number(start);
        let days = 7;
        while (days) {
            let url = `${WIKIMEDIA_PAGEVIEWS_URL}/top/en.wikipedia/all-access`;
            let { year, month, day } = ArticlesService.convertTimestampToDate(timestamp);
            // add one to month because it is zero-based
            month += 1;
            // ensure month and day are two digits
            month = month.toString().length < 2 ? '0' + month.toString() : month;
            day = day.toString().length < 2 ? '0' + day.toString() : day;
            url += `/${year}/${month}/${day}`;
            urls.push(url)
            timestamp += (1000 * 60 * 60 * 24)
            days -= 1;
        }

        const articleSums = {};
        try {
            for await (const url of urls) {
                const { data } = await Retry.getURL(url);
                const articles = data?.items[0]?.articles;
                for (const a of articles) {
                    const { article, views } = a;
                    if (!(article in articleSums)) {
                        articleSums[article] = {
                            article,
                            views
                        };
                    } else {
                        articleSums[article]['views'] += views;
                    }
                }
            }
            const sortedByViews = Object.entries(articleSums).sort(ArticlesService.sortArticles);
            const sortedWithRank = ArticlesService.addRank(sortedByViews);
            return res.status(200).send(sortedWithRank);
        } catch (e) {
            return res.status(500).send(`Api error: ${e}`);
        }
    },
    getTopMonthlyArticles: async (req, res) => {
        const { start } = req.params;
        let timestamp = Number(start);
        let { year, month } = ArticlesService.convertTimestampToDate(timestamp);
        month += 1;
        const url = `${WIKIMEDIA_PAGEVIEWS_URL}/top/en.wikipedia/all-access/${year}/${month}/all-days`;
 
        try {
            const { data } = await Retry.getURL(url);
            const articles = data?.items[0]?.articles;
            return res.status(200).send(articles);
        } catch (e) {
            return res.status(500).send(`Api error: ${e}`);
        }

    },
    getArticleViewCountForMonth: async (req, res) => {
        const { start, name } = req.params;
        const [formattedStart, formattedEnd] = ArticlesService.formatDateSpan(Number(start),'monthly');
        const url = `${WIKIMEDIA_PAGEVIEWS_URL}/per-article/en.wikipedia/all-access/all-agents/${encodeURI(name)}/monthly/${formattedStart}/${formattedEnd}`;
        try {
            const { data } = await Retry.getURL(url);
            const article = {
                article: name,
                views: data?.items[0]?.views,
                startDate: formattedStart,
                endDate: formattedEnd
            };
            return res.status(200).send(article);
        } catch (e) {
            return res.status(500).send(`Api error: ${e}`);
        }
    },
    getArticleViewCountForWeek: async (req, res) => {
        const { start, name } = req.params;
        const [formattedStart, formattedEnd] = ArticlesService.formatDateSpan(Number(start), 'weekly');
        const url = `${WIKIMEDIA_PAGEVIEWS_URL}/per-article/en.wikipedia/all-access/all-agents/${encodeURI(name)}/daily/${formattedStart}/${formattedEnd}`;
        try {
            const { data } = await Retry.getURL(url);
            const dailyResponse = data?.items;
            let views = 0;
            for (const day of dailyResponse) {
                views += day.views;
            }
            const article = {
                article: name,
                views,
                startDate: formattedStart,
                endDate: formattedEnd
            };
            return res.status(200).send(article);
        } catch (e) {
            return res.status(500).send(`Api error: ${e}`);
        }
    },
    getArticleTopViewCountForMonth: async (req, res) => {
        const { start, name } = req.params;
        const [formattedStart, formattedEnd] = ArticlesService.formatDateSpan(Number(start), 'monthly');
        const url = `${WIKIMEDIA_PAGEVIEWS_URL}/per-article/en.wikipedia/all-access/all-agents/${encodeURI(name)}/daily/${formattedStart}/${formattedEnd}`;
        try {
            const { data } = await Retry.getURL(url);
            const dailyResponse = data?.items;
            let maxViews = 0;
            let maxDate = '';
            for (const day of dailyResponse) {
                if (day.views > maxViews) {
                    maxViews = day.views;
                    maxDate = day.timestamp;
                }
            }
            const article = {
                article: name,
                maxViews,
                maxDate,
                startDate: formattedStart,
                endDate: formattedEnd,

            };
            return res.status(200).send(article);
        } catch (e) {
            return res.status(500).send(`Api error: ${e}`);
        }
    }
};