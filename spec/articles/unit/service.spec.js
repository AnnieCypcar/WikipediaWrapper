import { ArticlesService } from '../../../articles/service.js';

describe('ArticlesService', () => {
    const articleSums = {
        Main_Page: {
            article: 'Main_Page',
            views: 18704051,
        },
        'Special:Search': {
            article: 'Special:Search',
            views: 289767,
        },
        Annie_Besant: {
            article: 'Annie_Besant',
            views: 292707,
        }
    };
    describe('sortArticles', () => {
        it('sorts articles', () => {
            const sorted = Object.entries(articleSums).sort(ArticlesService.sortArticles);
            expect(sorted).toEqual([
                [
                  'Main_Page',
                  {
                    article: 'Main_Page',
                    views: 18704051,
                  },
                ],
                [
                  'Annie_Besant',
                  {
                    article: 'Annie_Besant',
                    views: 292707,
                  },
                ],
                [
                  'Special:Search',
                  {
                    article: 'Special:Search',
                    views: 289767,
                  },
                ],
              ]);
        });
    });
    describe('addRank', () => {
        it('adds the rank to articles', () => {
            const sorted = Object.entries(articleSums).sort(ArticlesService.sortArticles);
            const sortedWithRank = ArticlesService.addRank(sorted);
            expect(sortedWithRank).toEqual([
                {
                  article: 'Main_Page',
                  views: 18704051,
                  rank: 1,
                },
                {
                  article: 'Annie_Besant',
                  views: 292707,
                  rank: 2,
                },
                {
                  article: 'Special:Search',
                  views: 289767,
                  rank: 3,
                },
              ])
        });
    });
    describe('convertTimestampToDate', () => {
        it('converts a timestamp to year, month and day', () => {
            const { year, month, day } = ArticlesService.convertTimestampToDate(1443675600000);
            expect(year).toEqual(2015);
            expect(month).toEqual(9);
            expect(day).toEqual(1);
        });
    });
    describe('formatDate', () => {
        it('formats the date as YYYYMMDD', () => {
            const { year, month, day } = ArticlesService.convertTimestampToDate(1443675600000);
            const formatted = ArticlesService.formatDate(year, month+1, day);
            expect(formatted).toEqual('20151001');
        });
    });
    describe('formatDateSpan', () => {
        it('formats the start and end date as YYYYMMDD for monthly time span', () => {
            const [formattedStart, formattedEnd] = ArticlesService.formatDateSpan(1443675600000, 'monthly');
            expect(formattedStart).toEqual('20151001');
            expect(formattedEnd).toEqual('20151031');
        });
        it('formats the start and end date as YYYYMMDD for weekly time span', () => {
            ArticlesService.formatDateSpan();
            const [formattedStart, formattedEnd] = ArticlesService.formatDateSpan(1443675600000, 'weekly');
            expect(formattedStart).toEqual('20151001');
            expect(formattedEnd).toEqual('20151007');
        });
    });
});
