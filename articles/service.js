export const ArticlesService = {
    addRank: (articles) => {
        return articles.map((a, i) => {
            const article = a[1];
            // add one to account for zero-based index
            article.rank = i + 1;
            return article;
        })
    },
    convertTimestampToDate: (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        return { year, month, day };
    },
    formatDate: (year, month, date) => {
        // prepend zeros for month and date
        return String(10000 * year + 100 * month + date);
    },
    formatDateSpan: (timestamp, span) => {
        let { year, month } = ArticlesService.convertTimestampToDate(timestamp);
        // add one to account for zero-based month from the timestamp
        month += 1;
        let end = 0;
        if (span === 'weekly') {
            // add six days to the timestamp because the days are inclusive
            timestamp += (1000 * 60 * 60 * 24 * 6);
            const lastDay = new Date(timestamp);
            // account for week that crosses month or year end
            end = lastDay.getDate();
            // getMonth is also zero-based
            month = lastDay.getMonth() + 1;
            year = lastDay.getFullYear();
        } else if (span === 'monthly') {
            end = new Date(year, month, 0, 23, 59, 59).getDate();
        }

        return [
            ArticlesService.formatDate(year, month, 1), 
            ArticlesService.formatDate(year, month, end)
        ];
    },
    sortArticles: (a, b) => {
        const [keyA, valA] = a;
        const [keyB, valB] = b;
        return valB.views - valA.views;
    }
}